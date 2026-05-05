<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentRequest;
use App\Models\ChiTietDatLich;
use App\Models\ThanhToan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ThanhToanController extends Controller
{
    public function createPayment(PaymentRequest $request)
{
    try {

        $chiTietDatLich = ChiTietDatLich::find($request->id_chi_tiet_dat_lich);
        if (!$chiTietDatLich) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy chi tiết đặt lịch!'
            ], 400);
        }

        $thanhToan = ThanhToan::where('id_chi_tiet_dat_lich', $request->id_chi_tiet_dat_lich)->first();
        if (!$thanhToan) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thanh toán!'
            ], 400);
        }

        if ($thanhToan->trang_thai == 1) {
            return response()->json([
                'status' => false,
                'message' => 'Đơn đã được thanh toán!'
            ], 400);
        }

        // BỎ đoạn update trạng thái ở đây

        $vnp_Url        = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_Returnurl  = "http://localhost:3000/payment-result";

        $vnp_TmnCode    = config('vnpay.tmn_code');
        $vnp_HashSecret = config('vnpay.hash_secret');

        $vnp_TxnRef     = $thanhToan->id;
        $vnp_OrderInfo  = 'Thanh toán hóa đơn ' . $chiTietDatLich->ma_hoa_don;
        $vnp_Amount     = $thanhToan->tong_tien_thanh_toan * 100;
        $vnp_IpAddr     = request()->ip();

        $expire = date('YmdHis', strtotime('+15 minutes'));

        $inputData = [
            "vnp_Version"    => "2.1.0",
            "vnp_TmnCode"    => $vnp_TmnCode,
            "vnp_Amount"     => $vnp_Amount,
            "vnp_Command"    => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode"   => "VND",
            "vnp_IpAddr"     => $vnp_IpAddr,
            "vnp_Locale"     => "vn",
            "vnp_OrderInfo"  => $vnp_OrderInfo,
            "vnp_OrderType"  => "billpayment",
            "vnp_ReturnUrl"  => $vnp_Returnurl,
            "vnp_TxnRef"     => $vnp_TxnRef,
            "vnp_ExpireDate" => $expire,
        ];

        ksort($inputData);

        $query = http_build_query($inputData);
        $vnpSecureHash = hash_hmac('sha512', urldecode($query), $vnp_HashSecret);

        $paymentUrl = $vnp_Url . "?" . $query . '&vnp_SecureHash=' . $vnpSecureHash;

        return response()->json([
            'status' => true,
            'payment_url' => $paymentUrl
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'status' => false,
            'message' => $e->getMessage()
        ], 500);
    }
}
}
