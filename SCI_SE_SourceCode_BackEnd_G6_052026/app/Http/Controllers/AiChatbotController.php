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

        $result = $this->gemini->generateText($userMessage, $history);

        if ($result['ok'] && $result['text']) {
            $aiText = $result['text'];
            
            $cleanJson = preg_replace('/^```json\s*|
```$/m', '', $aiText);
            $cleanJson = trim($cleanJson);
            $decoded = json_decode($cleanJson, true);

            if (is_array($decoded) && isset($decoded['search'])) {
                $keyword = $decoded['search'];

                $searchRequest = new Request(['keyword' => $keyword]);
                $serviceResponse = $this->assistant->generate($searchRequest);
                
                $services = $serviceResponse->getData()->data;

                return response()->json([
                    'ok' => true,
                    'type' => 'search_result',
                    'text' => "Heli đã tìm thấy một số dịch vụ " . $keyword . " cho bạn:",
                    'data' => $services, 
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
            'error' => $result['error'] ?? 'AI không thể phản hồi vào lúc này.',
            'text' => null
        ], 200);
    }
}