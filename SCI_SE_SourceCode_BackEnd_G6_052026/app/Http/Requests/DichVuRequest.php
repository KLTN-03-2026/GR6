<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class DichVuRequest extends FormRequest
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
            'ten_dich_vu'           => 'required|string|max:255|min:4|unique:dich_vus,ten_dich_vu',
            'mo_ta_ngan'            => 'required|string|max:500',
            'mo_ta_dai'             => 'required|string',
            'don_gia'               => 'required|numeric|min:0',
            'thoi_gian_du_kien'     => 'required|integer|min:15',
            'kieu_phuc_vu'          => 'required|integer|in:1,2,3',
            'id_thuong_hieu'        => 'required|exists:thuong_hieus,id',
            'id_danh_muc_dich_vu'   => 'required|exists:danh_muc_dich_vus,id',
            'so_luong_lich_toi_da'  => 'required|integer|min:1',
            'hinh_anh.*'            => 'image|mimes:jpg,jpeg,png|max:2048'
        ];
    }
    public function messages(): array
    {
        return [
            'ten_dich_vu.*'           => 'Tên dịch vụ ít nhất là 4 ký tự và không được để trống',
            'mo_ta_ngan.*'            => 'Mô tả ngắn không được để trống và không quá 500 ký tự',
            'mo_ta_dai.*'             => 'Mô tả dài không được để trống',
            'don_gia.*'               => 'Đơn giá không được để trống',
            'thoi_gian_du_kien.*'     => 'Thời gian dự kiến phải là số',
            'kieu_phuc_vu.*'          => 'Kiểu phục vụ không hợp lệ',
            'id_thuong_hieu.*'        => 'Thương hiệu không hợp lệ',
            'id_danh_muc_dich_vu.*'   => 'Danh mục dịch vụ không tồn tại',
            'so_luong_lich_toi_da.*'  => 'Số lượng lịch tối thiểu ít nhất là 1',
            'hinh_anh.*.*'            => 'Ít nhất là 5 ảnh và mỗi ảnh phải có định dạng jpg, jpeg hoặc png, kích thước tối đa 2MB', 
        ];
    }
}
