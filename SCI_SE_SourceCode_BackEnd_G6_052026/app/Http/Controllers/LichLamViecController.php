<?php

namespace App\Http\Controllers;

use App\Models\LichLamViec;
use Illuminate\Http\Request;

class LichLamViecController extends Controller
{
   public function getWorkingHours($id_thuong_hieu )
   {
        $workingHours = LichLamViec::where('id_thuong_hieu', $id_thuong_hieu)->get();
        return response()->json([
            'status' => true,
            'data' => $workingHours
        ]);
    }
}
