<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DichVuRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('id');

        return [
            'ten_dich_vu' => [
                'required',
                'string',
                'min:4',
                'max:255',
                Rule::unique('dich_vus', 'ten_dich_vu')->ignore($id),
            ],

            'mo_ta_ngan' => 'required|string|max:500',
            'mo_ta_dai'  => 'required|string',
            'don_gia' => 'required|numeric',
            'thoi_gian_du_kien' => 'required|integer',

            // buffer optional
            'thoi_gian_dem' => 'nullable|integer',

            'kieu_phuc_vu' => ['required', Rule::in([1, 2, 3])],

            'id_thuong_hieu' => 'required|exists:thuong_hieus,id',

            'id_danh_muc_dich_vu' => 'required|exists:danh_muc_dich_vus,id',

            // vẫn giữ >=1 để tránh lỗi logic
            'so_luong_lich_toi_da' => 'required|integer|min:1',

            'hinh_anh' => 'nullable|array',
            'hinh_anh.*' => 'image|mimes:jpg,jpeg,png,webp|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'ten_dich_vu.required' => 'Tên dịch vụ không được để trống',
            'ten_dich_vu.min'      => 'Tên dịch vụ phải ít nhất 4 ký tự',
            'ten_dich_vu.unique'   => 'Tên dịch vụ đã tồn tại',

            'mo_ta_ngan.required' => 'Mô tả ngắn không được để trống',
            'mo_ta_dai.required'  => 'Mô tả chi tiết không được để trống',

            'don_gia.required' => 'Đơn giá không được để trống',
            'don_gia.numeric'  => 'Đơn giá phải là số',

            'thoi_gian_du_kien.required' => 'Thời gian thực hiện không được để trống',
            'thoi_gian_du_kien.integer'  => 'Thời gian phải là số nguyên',

            'kieu_phuc_vu.in' => 'Kiểu phục vụ không hợp lệ',

            'id_thuong_hieu.exists' => 'Thương hiệu không tồn tại',
            'id_danh_muc_dich_vu.exists' => 'Danh mục không tồn tại',

            'so_luong_lich_toi_da.min' => 'Số lượng lịch phải >= 1',

            'hinh_anh.*.image' => 'File phải là hình ảnh',
            'hinh_anh.*.mimes' => 'Ảnh phải là jpg, jpeg, png hoặc webp',
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'ten_dich_vu' => trim($this->ten_dich_vu),
            'mo_ta_ngan'  => trim($this->mo_ta_ngan),
            'mo_ta_dai'   => trim($this->mo_ta_dai),
        ]);
    }
}
