<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class DanhMucDichVuRequest extends FormRequest
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
            'ten_dich_vu' => 'required| min: 4| max: 100|unique:danh_muc_dich_vus,ten_dich_vu',
            'id_father' => 'required|exists:danh_muc_dich_vus,id',
            'hinh_anh' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',

        ];
    }
    public function messages()
    {
        return [
            'ten_dich_vu' => 'Đã có dịch vụ này hoặc tên dịch vụ không hợp lệ',
            'id_father' => 'Danh mục cha không tồn tại',
            'hinh_anh' => 'URL hình ảnh không hợp lệ',
        ];
    }
}
