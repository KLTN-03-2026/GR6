<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\HoiThoai;
use App\Models\TinNhan;
use Illuminate\Http\Request;

class HoiThoaiController extends Controller
{
    public function khachHangGetAllConversations(){
        $id_khach_hang = $this->isUserKhachHang()->id;
        $conversations = HoiThoai::where('id_khach_hang', $id_khach_hang)->get();
        return response()->json($conversations);
    }
    public function thuongHieuGetAllConversations(){
        $NhaCungCap = $this->isUserNhaCungCap()->id;//nhà cung cấp đang đăng nhập
        $id_thuong_hieu = HoiThoai::where('id_thuong_hieu', $NhaCungCap)->pluck('id_thuong_hieu'); //thương hiệu của nhà cung cấp
        $conversations = HoiThoai::where('id_thuong_hieu', $id_thuong_hieu)->get();
        return response()->json($conversations);
    }
    public function getAllMessages($id)
    {
        $messages = TinNhan::where('id_hoi_thoai', $id)
        ->orderBy('created_at', 'asc')
        ->select(
            'id',
            'id_hoi_thoai',
            'id_nguoi_gui',
            'noi_dung',
            'created_at'
        )
        ->get();
        return response()->json($messages);
    }   
    // tạo hoặc lấy hội thoại
    public function getOrCreate(Request $request)
    {
        $chat = HoiThoai::firstOrCreate([
            'id_khach_hang' => $request->id_khach_hang,
            'id_thuong_hieu' => $request->id_thuong_hieu
        ]);

        return response()->json($chat);
    }

    public function sendMessage(Request $request)
    {
        $request->validate([
            'id_hoi_thoai' => 'required|integer|exists:hoi_thoais,id',
            'id_nguoi_gui' => 'required|integer',
            'noi_dung' => 'required|string'
        ]);

        $chat = HoiThoai::findOrFail($request->id_hoi_thoai);

        // check người gửi có thuộc hội thoại
        if (
            $request->id_nguoi_gui != $chat->id_khach_hang &&
            $request->id_nguoi_gui != $chat->id_thuong_hieu
        ) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $message = TinNhan::create([
            'id_hoi_thoai' => $chat->id,
            'id_nguoi_gui' => $request->id_nguoi_gui,
            'noi_dung' => $request->noi_dung,
        ]);

        broadcast(new MessageSent($message))->toOthers();

        return response()->json($message);
    }
}
