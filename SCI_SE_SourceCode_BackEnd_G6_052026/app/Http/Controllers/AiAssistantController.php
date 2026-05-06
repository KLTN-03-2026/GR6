<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Services\GeminiService;

class AiAssistantController extends Controller
{
    public function __construct(private readonly GeminiService $gemini)
    {
    }

    public function generate(Request $request): JsonResponse
    {
        $payload = $request->all();
        $input = $payload['keyword'] ?? $payload['noi_dung'] ?? $payload['q'] ?? '';

        $keyword = trim($input);
        if ($keyword !== '' && !preg_match('/[\p{L}\p{N}]/u', $keyword)) {
            return response()->json([
                'ok' => true,
                'data' => [],
                'detected_keyword' => $keyword,
                'message' => 'Từ khóa không hợp lệ'
            ]);
        }
        if (mb_strlen($keyword) > 10) {
            $prompt = "Bạn là máy lọc từ khóa dịch vụ. Từ câu: '$input', hãy chỉ trả về duy nhất tên dịch vụ cốt lõi nhất bằng tiếng Việt. "
                . "Ví dụ: 'gợi ý cho mình cắt tóc nam' -> 'cắt tóc nam'. "
                . "Chỉ trả về văn bản, không giải thích, không để trong ngoặc.";

            $aiResult = $this->gemini->generateText($prompt);

            if ($aiResult['ok'] && $aiResult['text']) {
                $keyword = mb_strtolower(trim(str_replace(['.', '"', 'ai:', 'AI:'], '', $aiResult['text'])), 'UTF-8');
            }
        }

        $firstImages = DB::table('hinh_anh_dich_vus')
            ->selectRaw('MIN(id) as id, id_dich_vu')
            ->groupBy('id_dich_vu');

        $query = DB::table('dich_vus')
            ->join('thuong_hieus', 'thuong_hieus.id', '=', 'dich_vus.id_thuong_hieu')
            ->leftJoinSub($firstImages, 'first_images', function ($join) {
                $join->on('first_images.id_dich_vu', '=', 'dich_vus.id');
            })
            ->leftJoin('hinh_anh_dich_vus', 'hinh_anh_dich_vus.id', '=', 'first_images.id')
            ->where('thuong_hieus.is_active', 1)
            ->where('dich_vus.trang_thai', 1);

        $likeFull = '%' . addcslashes($keyword, '%_\\') . '%';

        if ($keyword !== '') {
            $hasFullMatch = DB::table('dich_vus')
                ->where('trang_thai', 1)
                ->where('ten_dich_vu', 'LIKE', $likeFull)
                ->exists();

            if ($hasFullMatch) {
                $query->where('dich_vus.ten_dich_vu', 'LIKE', $likeFull);
            } else {
                $words = explode(' ', $keyword);
                $appliedCondition = false;

                $query->where(function ($q) use ($words, &$appliedCondition) {
                    foreach ($words as $word) {
                        if (mb_strlen($word) > 2) {
                            $q->orWhere('dich_vus.ten_dich_vu', 'LIKE', "%$word%");
                            $appliedCondition = true;
                        }
                    }
                });

                if (!$appliedCondition || $query->count() === 0) {
                    return response()->json([
                        'ok' => true,
                        'data' => [],
                        'message' => 'Không tìm thấy dịch vụ phù hợp'
                    ]);
                }
            }
        }

        $rows = $query
            ->orderByRaw("CASE 
                WHEN dich_vus.ten_dich_vu LIKE ? THEN 1 
                WHEN dich_vus.ten_dich_vu LIKE ? THEN 2
                ELSE 3 
            END ASC", [$keyword, $likeFull])
            ->orderByDesc('thuong_hieus.diem_hai_long')
            ->limit(4)
            ->get([
                'dich_vus.id as id',
                'dich_vus.ten_dich_vu',
                'dich_vus.don_gia',
                'dich_vus.thoi_gian_du_kien',
                'dich_vus.kieu_phuc_vu',
                'dich_vus.mo_ta_ngan',
                'thuong_hieus.id as thuong_hieu_id',
                'thuong_hieus.ten_thuong_hieu',
                'thuong_hieus.dia_chi',
                'thuong_hieus.logo',
                'thuong_hieus.diem_hai_long',
                'hinh_anh_dich_vus.hinh_anh as hinh_anh',
            ]);

        $cards = $rows->map(function ($row) {
            $image = $row->hinh_anh;
            $imageUrl = null;
            if (is_string($image) && $image !== '') {
                $imageUrl = filter_var($image, FILTER_VALIDATE_URL) ? $image : asset('storage/' . $image);
            }

            $logo = $row->logo;
            $logoUrl = null;
            if (is_string($logo) && $logo !== '') {
                $logoUrl = filter_var($logo, FILTER_VALIDATE_URL) ? $logo : asset('storage/' . $logo);
            }

            return [
                'id' => $row->id,
                'ten_dich_vu' => $row->ten_dich_vu,
                'don_gia' => $row->don_gia,
                'thoi_gian_du_kien' => $row->thoi_gian_du_kien,
                'kieu_phuc_vu' => $row->kieu_phuc_vu,
                'mo_ta_ngan' => $row->mo_ta_ngan,
                'hinh_anh' => $imageUrl,
                'thuong_hieu' => [
                    'id' => $row->thuong_hieu_id,
                    'ten_thuong_hieu' => $row->ten_thuong_hieu,
                    'dia_chi' => $row->dia_chi,
                    'logo' => $logoUrl,
                    'diem_hai_long' => $row->diem_hai_long,
                ],
            ];
        })->values();

        return response()->json([
            'ok' => true,
            'data' => $cards,
            'detected_keyword' => $keyword
        ]);
    }
}