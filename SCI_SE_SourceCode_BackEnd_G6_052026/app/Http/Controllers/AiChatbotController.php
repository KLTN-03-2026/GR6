<?php

namespace App\Http\Controllers;

use App\Services\GeminiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AiChatbotController extends Controller
{
    public function __construct(
        private readonly GeminiService $gemini,
        private readonly AiAssistantController $assistant
    ) {}

    public function chat(Request $request): JsonResponse
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'message' => ['required', 'string', 'max:8000'],
            'history' => ['sometimes', 'array'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'ok' => false,
                'error' => 'Dữ liệu không hợp lệ.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $validated = $validator->validated();
        $userMessage = $validated['message'];
        $history = $validated['history'] ?? [];

        $keywordLower = mb_strtolower($userMessage, 'UTF-8');
        $locationKeywords = ['gần tôi', 'gần đây', 'xung quanh đây', 'gần nhất', 'vị trí của tôi'];
        foreach ($locationKeywords as $loc) {
            if (str_contains($keywordLower, $loc)) {
                return response()->json([
                    'ok' => true,
                    'message' => 'location_not_supported',
                    'type' => 'text',
                    'text' => "Xin lỗi bạn, Heli hiện chưa hỗ trợ tìm kiếm qua GPS. Bạn vui lòng nhập tên dịch vụ cụ thể nhé!"
                ]);
            }
        }

        //KHO FAQ 
        $knowledgeBase = "
            DỮ LIỆU HỆ THỐNG SERVICEHUB:
            - Chỗ trống: Lịch hiển thị thời gian thực, khung giờ chọn được là còn trống.
            - Đánh giá: Khách có thể xem review/bình luận tại trang mỗi 'shop ảo'.
            - Giá cả: Thường là giá gốc. Phụ phí (VAT, phí phục vụ, tip) ghi trong chi tiết dịch vụ.
            - Đặt nhiều người: Có thể chọn nhiều dịch vụ vào giỏ hàng. Chỉnh 'Số lượng khách' khi book nhóm.
            - Đặt cọc: Giúp giữ chỗ và chuẩn bị nhân sự. Tiền cọc trừ trực tiếp vào hóa đơn cuối.
            - Xác nhận: Hệ thống gửi sau 1-3 phút. Nếu không thấy, kiểm tra 'Lịch sử đặt chỗ' hoặc gọi Hotline shop.
            - Đổi lịch: Vào Lịch sử đặt lịch -> Chi tiết -> Đổi lịch. Cần thực hiện trước ít nhất 2 tiếng.
            - Hoàn cọc: Hủy trước 24h hoàn 100%. Hủy sát giờ tùy chính sách shop (thường mất cọc).
            - Khiếu nại: Đánh giá trên web hoặc liên hệ CSKH ServiceHub để được bảo vệ quyền lợi.
            - Bảo mật: Số điện thoại chỉ cung cấp cho chủ shop bạn đã đặt để liên hệ đón tiếp.
            - Mật khẩu: Dùng nút 'Quên mật khẩu' để nhận OTP qua SĐT/Email.
        ";

        //PROMPT 
        $systemInstruction = "Bạn là Heli, trợ lý ảo thông minh của ServiceHub. \n"
            . "Dựa vào tri thức sau: \n" . $knowledgeBase . "\n"
            . "Hãy trả lời người dùng theo quy tắc: \n"
            . "- Xưng hô là Heli, thân thiện, ngắn gọn. \n"
            . "- Nếu người dùng muốn tìm dịch vụ (ví dụ: cắt tóc, massage...), hãy trả về định dạng JSON: {\"search\": \"tên dịch vụ\"}. \n"
            . "- Nếu là câu hỏi FAQ, hãy trả lời trực tiếp bằng văn bản dựa trên tri thức. \n"
            . "- Nếu câu hỏi không có trong tri thức và không phải tìm dịch vụ, hãy bảo khách gọi Hotline 1900xxxx.";

        $fullPrompt = $systemInstruction . "\n\nTin nhắn người dùng: " . $userMessage;

        $result = $this->gemini->generateText($fullPrompt, $history);

        if ($result['ok'] && $result['text']) {
            $aiText = $result['text'];
            
            $cleanJson = preg_replace('/^```json\s*|```$/m', '', $aiText);
            $cleanJson = trim($cleanJson);
            $decoded = json_decode($cleanJson, true);

            if (is_array($decoded) && isset($decoded['search'])) {
                $keyword = $decoded['search'];

                $searchRequest = new Request(['keyword' => $keyword]);
                $serviceResponse = $this->assistant->generate($searchRequest);
                
                $resData = $serviceResponse->getData();
                
                if (isset($resData->message) && $resData->message === 'Không tìm thấy dịch vụ phù hợp') {
                    return response()->json([
                        'ok' => true,
                        'type' => 'text',
                        'text' => "Heli đã thử tìm kiếm dịch vụ '$keyword' nhưng hiện tại không có kết quả phù hợp. Bạn thử mô tả khác xem sao nhé!",
                        'data' => []
                    ]);
                }

                return response()->json([
                    'ok' => true,
                    'type' => 'search_result',
                    'text' => "Heli đã tìm thấy một số dịch vụ " . $keyword . " cho bạn:",
                    'data' => $resData->data, 
                ]);
            }

            return response()->json([
                'ok' => true,
                'type' => 'text',
                'text' => $aiText,
            ]);
        }

        return response()->json([
            'ok' => false,
            'error' => $result['error'] ?? 'Heli đang bận một chút, bạn thử lại sau nhé!',
            'text' => null
        ], 200);
    }
}