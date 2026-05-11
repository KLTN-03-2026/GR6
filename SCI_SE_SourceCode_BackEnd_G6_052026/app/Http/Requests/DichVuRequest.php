<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

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
                'regex:/^[\pL\s]+$/u',
            ],

            'mo_ta_ngan' => 'required|string|max:100',
            'mo_ta_dai'  => 'required|string|max:500',
            'don_gia' => 'required|numeric|min:0',
            'thoi_gian_du_kien' => 'required|integer|min:0|max:1440', // giới hạn tối đa 24 giờ (1440 phút)

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
        'ten_dich_vu.min' => 'Tên dịch vụ phải tối thiểu 4 ký tự',
        'ten_dich_vu.max' => 'Tên dịch vụ tối đa 255 ký tự',
        'ten_dich_vu.unique' => 'Tên dịch vụ đã tồn tại',

        'mo_ta_ngan.required' => 'Mô tả ngắn không được để trống',
        'mo_ta_ngan.max' => 'Mô tả ngắn tối đa 100 ký tự',

        'mo_ta_dai.required' => 'Mô tả dài không được để trống',
        'mo_ta_dai.max' => 'Mô tả dài tối đa 500 ký tự',

        'don_gia.required' => 'Đơn giá không được để trống',
        'don_gia.numeric' => 'Đơn giá phải là số',

        'thoi_gian_du_kien.required' => 'Thời gian dự kiến không được để trống',
        'thoi_gian_du_kien.integer' => 'Thời gian dự kiến phải là số nguyên',

        'thoi_gian_dem.integer' => 'Thời gian đệm phải là số nguyên',

        'kieu_phuc_vu.required' => 'Kiểu phục vụ không được để trống',
        'kieu_phuc_vu.in' => 'Kiểu phục vụ không hợp lệ',

        'id_thuong_hieu.required' => 'Vui lòng chọn thương hiệu',
        'id_thuong_hieu.exists' => 'Thương hiệu không tồn tại',

        'id_danh_muc_dich_vu.required' => 'Vui lòng chọn danh mục dịch vụ',
        'id_danh_muc_dich_vu.exists' => 'Danh mục dịch vụ không tồn tại',

        'so_luong_lich_toi_da.required' => 'Số lượng lịch tối đa không được để trống',
        'so_luong_lich_toi_da.integer' => 'Số lượng lịch tối đa phải là số nguyên',
        'so_luong_lich_toi_da.min' => 'Số lượng lịch tối đa phải lớn hơn 0',

        'hinh_anh.array' => 'Hình ảnh không hợp lệ',

        'hinh_anh.*.image' => 'File tải lên phải là hình ảnh',
        'hinh_anh.*.mimes' => 'Hình ảnh phải có định dạng jpg, jpeg, png hoặc webp',
        'hinh_anh.*.max' => 'Mỗi hình ảnh tối đa 2MB',
        'don_gia.min' => 'Giá niêm yết phải lớn hơn hoặc bằng 0',
        'thoi_gian_du_kien.min' => 'Thời gian phải lớn hơn hoặc bằng 0',
        'thoi_gian_du_kien.max' => 'Thời gian không được vượt quá 24 giờ',
        'ten_dich_vu.regex' => 'Tên dịch vụ chỉ được chứa chữ cái và khoảng trắng',
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
     protected function failedValidation(Validator $validator)
{
    throw new HttpResponseException(
        response()->json([
            'status'  => false,
            'message' => $validator->errors()->first()
        ], 422)
    );
}
}
