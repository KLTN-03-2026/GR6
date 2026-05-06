<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentRequest;
use App\Models\ChiTietDatLich;
use App\Models\ThanhToan;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ThanhToanController extends Controller
{
    /**
     * Xử lý kết quả trả về từ VNPay (Return URL)
     */
    public function handleVnpayReturn(Request $request)
    {
        try {
            // 1. Cấu hình Secret Key (Đảm bảo khớp hoàn toàn với bên createPayment)
            $vnp_HashSecret = 'XPWENN9TUUHLQNPNLQ729ARKOEUNR4H3';

            $inputData = $request->all();

            // 2. Lấy chữ ký từ VNPay gửi sang và loại bỏ khỏi mảng dữ liệu băm
            $vnp_SecureHash = $inputData['vnp_SecureHash'] ?? null;
            unset($inputData['vnp_SecureHash']);
            unset($inputData['vnp_SecureHashType']);

            // 3. Sắp xếp dữ liệu tham số theo Alphabet (Bắt buộc)
            ksort($inputData);

            // 4. Tạo chuỗi dữ liệu băm (Dùng urlencode để đồng nhất)
            $i = 0;
            $hashData = "";
            foreach ($inputData as $key => $value) {
                if ($i == 1) {
                    $hashData .= '&' . urlencode($key) . "=" . urlencode($value);
                } else {
                    $hashData .= urlencode($key) . "=" . urlencode($value);
                    $i = 1;
                }
            }

            // 5. Tính toán chữ ký dựa trên dữ liệu nhận được
            $secureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);

            // 6. Kiểm tra chữ ký có khớp hay không
            if ($secureHash !== $vnp_SecureHash) {
                return response()->json([
                    'status' => false,
                    'message' => 'Chữ ký không hợp lệ (Invalid signature)'
                ], 400);
            }

            // 7. Xử lý logic nghiệp vụ khi chữ ký hợp lệ
            $txnRef = $request->vnp_TxnRef;

            $thanhToan = ChiTietDatLich::where('ma_hoa_don', $txnRef)
                ->first();

            if (!$thanhToan) {
                return response()->json([
                    'status' => false,
                    'message' => 'Không tìm thấy đơn thanh toán'
                ], 404);
            }

            $responseCode = $request->vnp_ResponseCode;

            if ($responseCode == "00") {
                // Thanh toán thành công tại VNPay
                $thanhToan->update([
                    'trang_thai' => 1,
                ]);
                
                // Điều hướng về trang danh sách lịch hẹn trên React
                return redirect('http://localhost:3000/lich-hen');
            }

            return response()->json([
                'status' => false,
                'message' => 'Thanh toán thất bại',
                'code' => $responseCode
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Lỗi hệ thống: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Tạo URL thanh toán VNPay
     */
    public function createPayment(PaymentRequest $request)
{
    try {
        // 1. Kiểm tra chi tiết đặt lịch
        $chiTietDatLich = ChiTietDatLich::find($request->id_chi_tiet_dat_lich);
        if (!$chiTietDatLich) {
            return response()->json(['status' => false, 'message' => 'Không tìm thấy chi tiết đặt lịch!'], 400);
        }

        // 2. Kiểm tra thông tin thanh toán
        $thanhToan = ThanhToan::where('id_chi_tiet_dat_lich', $request->id_chi_tiet_dat_lich)->first();
        
        if (!$thanhToan) {
            return response()->json(['status' => false, 'message' => 'Không tìm thấy thông tin thanh toán!'], 400);
        }

        // 3. Kiểm tra nếu đã thanh toán rồi (tránh thanh toán đè)
        if ($thanhToan->trang_thai == 1) {
            return response()->json(['status' => false, 'message' => 'Đơn hàng này đã được thanh toán hoàn tất!'], 400);
        }

        // 4. Cập nhật số tiền khách muốn thanh toán đợt này vào cột tạm thời hoặc xử lý logic cọc
        // Lưu ý: React gửi lên là 'so_tien', nên ta dùng $request->so_tien
        $thanhToan->update([
            'tong_tien_da_nhan' => $request->so_tien 
        ]);

            // 2. Cấu hình VNPay
            $vnp_Url         = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
            $vnp_Returnurl   = "http://127.0.0.1:8000/api/vnpay-payment/return"; 
            $vnp_TmnCode     = '6HYFPQQ6';
            $vnp_HashSecret  = 'XPWENN9TUUHLQNPNLQ729ARKOEUNR4H3';

            $vnp_TxnRef      = $chiTietDatLich->ma_hoa_don; 
            $vnp_Amount      = $thanhToan->tong_tien_da_nhan * 100;
            $vnp_OrderInfo   = 'Thanh toan hoa don ' . $chiTietDatLich->ma_hoa_don;
            $vnp_IpAddr      = $request->ip();

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
            ];

            // 3. Sắp xếp và tạo chuỗi hash
            ksort($inputData);
            $query = "";
            $i = 0;
            $hashdata = "";
            foreach ($inputData as $key => $value) {
                if ($i == 1) {
                    $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
                } else {
                    $hashdata .= urlencode($key) . "=" . urlencode($value);
                    $i = 1;
                }
                $query .= urlencode($key) . "=" . urlencode($value) . '&';
            }

            // 4. Tạo URL hoàn chỉnh
            $vnp_Url = $vnp_Url . "?" . $query;
            if (isset($vnp_HashSecret)) {
                $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);
                $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
            }

            return response()->json([
                'status' => true,
                'payment_url' => $vnp_Url
            ]);

        } catch (\Exception $e) {
            return response()->json(['status' => false, 'message' => 'Lỗi: ' . $e->getMessage()], 500);
        }
    }
}