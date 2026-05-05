<?php

namespace App\Services;

use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;

class GeminiService
{
    /**
     * @param string $prompt
     * @param array $history
     * @return array
     */
    public function generateText(string $prompt, array $history = []): array
    {
        $apiKey = (string) config('services.gemini.api_key');
        $model = (string) config('services.gemini.model', 'gemini-2.5-flash'); 
        $baseUrl = rtrim((string) config('services.gemini.base_url', 'https://generativelanguage.googleapis.com/v1beta'), '/');

        if ($apiKey === '') {
            return [
                'ok' => false,
                'error' => 'Missing GEMINI_API_KEY.',
                'text' => null,
                'raw' => null,
            ];
        }

        //System Instruction
        $systemInstruction = "Bạn là trợ lý ảo Heli của hệ thống ServiceHub. "
            . "Nhiệm vụ của bạn là hỗ trợ người dùng tìm kiếm dịch vụ tiện ích. "
            . "QUY TẮC PHẢN HỒI: "
            . "1. Nếu người dùng muốn tìm dịch vụ (ví dụ: cắt tóc, sửa xe, dọn dẹp, nấu ăn...), "
            . "bạn PHẢI trả về JSON duy nhất: {\"search\": \"từ khóa dịch vụ\"}. "
            . "2. Nếu người dùng chỉ chào hỏi hoặc hỏi đáp thông thường, hãy trả lời bằng văn bản tự nhiên, thân thiện. "
            . "3. Luôn ưu tiên trả về JSON nếu có bất kỳ dấu hiệu nào của việc tìm kiếm dịch vụ.";

        $contents = $this->normalizeHistory($history);

        array_unshift($contents, [
            'role' => 'user',
            'parts' => [
                ['text' => "SYSTEM INSTRUCTION: " . $systemInstruction]
            ],
        ]);

        $contents[] = [
            'role' => 'user',
            'parts' => [
                ['text' => $prompt],
            ],
        ];

        $url = "{$baseUrl}/models/{$model}:generateContent";

        try {
            $data = $this->postGenerateContent($url, $apiKey, $contents);

            $text = Arr::get($data, 'candidates.0.content.parts.0.text');

            return [
                'ok' => true,
                'error' => null,
                'text' => is_string($text) ? trim($text) : null,
                'raw' => $data,
            ];
        } catch (RequestException $e) {
            $data = $e->response?->json();
            $message = $data['error']['message'] ?? $e->getMessage();

            return [
                'ok' => false,
                'error' => $message,
                'text' => null,
                'raw' => $data,
            ];
        }
    }

    private function postGenerateContent(string $url, string $apiKey, array $contents): array
    {
        $response = Http::timeout(30)
            ->retry(2, 500)
            ->post($url . '?key=' . $apiKey, [
                'contents' => $contents,
                'generationConfig' => [
                    'temperature' => 0.7,
                    'topK' => 40,
                    'topP' => 0.95,
                    'maxOutputTokens' => 2048,
                ]
            ]);

        return $response->throw()->json();
    }

    private function normalizeHistory(array $history): array
    {
        $normalized = [];

        foreach ($history as $item) {
            if (!is_array($item)) continue;

            $role = $item['role'] ?? 'user';
            $role = in_array($role, ['user', 'model']) ? $role : 'user';

            $text = $item['text'] ?? ($item['parts'][0]['text'] ?? null);

            if (is_string($text) && trim($text) !== '') {
                $normalized[] = [
                    'role' => $role,
                    'parts' => [['text' => $text]],
                ];
            }
        }

        return $normalized;
    }
}