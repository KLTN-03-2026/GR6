<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentRequest;
use App\Models\ChiTietDatLich;
use App\Models\ThanhToan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ThanhToanController extends Controller
{
    public function createPayment(Request $request)
    {
        DB::beginTransaction();

        try {
            /*
            |--------------------------------------------------------------------------
            | 1. Lưu giao dịch trước khi chuyển sang VNPAY
            |--------------------------------------------------------------------------
            */
            $ChiTietDatLich = ChiTietDatLich::where('id', $request->id_chi_tiet_dat_lich)->first();
            $thanhToan = ThanhToan::create([
                'ma_hoa_don'                  => $request->ma_hoa_don,
                'id_chi_tiet_dat_lich'        => $request->id_chi_tiet_dat_lich, // nếu có
                'tong_tien_thanh_toan'        => $ChiTietDatLich->don_gia * $ChiTietDatLich->so_luong, // tính tổng tiền dựa trên chi tiết đặt lịch
                'tong_tien_da_nhan'           => $request->tong_tien_da_nhan, // số tiền khách hàng đã thanh toán (nếu có)
                'trang_thai'                  => 0, // 0 = Chờ thanh toán
            ]);

            /*
            |--------------------------------------------------------------------------
            | 2. Cấu hình VNPAY
            |--------------------------------------------------------------------------
            */
            $code_cart      = $request->ma_hoa_don;
            $vnp_Url        = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
            $vnp_Returnurl  = "http://127.0.0.1:8000/api/vnpay-return";
            $vnp_TmnCode    = "6HYFPQQ6";
            $vnp_HashSecret = "XPWENN9TUUHLQNPNLQ729ARKOEUNR4H3";

            $vnp_TxnRef     = $code_cart;
            $vnp_OrderInfo  = 'Thanh toán hóa đơn ' . $code_cart;
            $vnp_OrderType  = 'billpayment';
            $vnp_Amount     = $request->total_vnpay * 100;
            $vnp_Locale     = 'vn';
            $vnp_IpAddr     = request()->ip();

            $expire = date('YmdHis', strtotime('+15 minutes'));

            /*
            |--------------------------------------------------------------------------
            | 3. Data gửi sang VNPAY
            |--------------------------------------------------------------------------
            */
            $inputData = [
                "vnp_Version"    => "2.1.0",
                "vnp_TmnCode"    => $vnp_TmnCode,
                "vnp_Amount"     => $vnp_Amount,
                "vnp_Command"    => "pay",
                "vnp_CreateDate" => date('YmdHis'),
                "vnp_CurrCode"   => "VND",
                "vnp_IpAddr"     => $vnp_IpAddr,
                "vnp_Locale"     => $vnp_Locale,
                "vnp_OrderInfo"  => $vnp_OrderInfo,
                "vnp_OrderType"  => $vnp_OrderType,
                "vnp_ReturnUrl"  => $vnp_Returnurl,
                "vnp_TxnRef"     => $vnp_TxnRef,
                "vnp_ExpireDate" => $expire,
            ];

            /*
            |--------------------------------------------------------------------------
            | 4. Sort + Build Query
            |--------------------------------------------------------------------------
            */
            ksort($inputData);

            $query = "";
            $hashdata = "";

            foreach ($inputData as $key => $value) {
                $hashdata .= urlencode($key) . "=" . urlencode($value) . '&';
                $query .= urlencode($key) . "=" . urlencode($value) . '&';
            }

            $hashdata = rtrim($hashdata, '&');
            $query = rtrim($query, '&');

            /*
            |--------------------------------------------------------------------------
            | 5. Secure Hash
            |--------------------------------------------------------------------------
            */
            $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);

            $paymentUrl = $vnp_Url . "?" . $query . '&vnp_SecureHash=' . $vnpSecureHash;

            DB::commit();

            /*
            |--------------------------------------------------------------------------
            | 6. Redirect sang VNPAY
            |--------------------------------------------------------------------------
            */
            return response()->json([
                'status' => true,
                'message' => 'Tạo liên kết thanh toán thành công',
                'payment_url' => $paymentUrl
            ]);

        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}