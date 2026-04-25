<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class DatLichRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id_khach_hang' => 'required|integer|exists:khach_hangs,id',
            'id_thuong_hieu' => 'required|integer|exists:thuong_hieus,id',
            'ten_nguoi_dat' => 'required|string|max:255',
            'so_dien_thoai_nguoi_dat' => 'required|string|max:20',
            'ghi_chu' => 'nullable|string|max:500',


            'id_dich_vu'        => 'required|integer|exists:dich_vus,id',
            'dia_chi_thuc_hien' => 'required|string|max:255',
            'gio_bat_dau'       => 'required|date_format:H:i',
            'ngay_dat_lich'     => 'required|date|after_or_equal:today',
            'so_luong'          => 'required|integer|min:1|max:100',
            'don_gia'           => 'required|numeric|min:0',
        ];
    }
    public function messages()
    {
        return [
            'id_khach_hang.*' => 'Không tìm thấy khách hàng hoặc chưa đăng nhập',
            'id_thuong_hieu.*' => 'Thương hiệu không tồn tại!',
            'ten_nguoi_dat.*' => 'Tên người đặt không được để trống và không quá 255 ký tự!',
            'so_dien_thoai_nguoi_dat.*' => 'Số điện thoại người đặt không được để trống và không quá 20 ký tự!',
            'ghi_chu.*' => 'Ghi chú không được quá 500 ký tự!',


            'id_dich_vu.*'          => 'Dịch vụ không tồn tại!',
            'dia_chi_thuc_hien.*'   => 'Địa chỉ thực hiện không được để trống và không quá 255 ký tự!',
            'gio_bat_dau.*'         => 'Giờ bắt đầu không hợp lệ!',
            'ngay_dat_lich.*'       => 'Ngày đặt lịch không hợp lệ!',
            'so_luong.*'            => 'Số lượng phải là số nguyên từ 1 đến 100!',
            'don_gia.*'             => 'Đơn giá phải là số dương!',
        ];
    }
    protected function failedValidation($validator)
    {
        throw new \Illuminate\Http\Exceptions\HttpResponseException(
            response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422)
        );
    }
}
