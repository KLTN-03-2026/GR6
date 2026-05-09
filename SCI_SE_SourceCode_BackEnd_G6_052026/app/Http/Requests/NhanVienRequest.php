<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class NhanVienRequest extends FormRequest
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
            'ten_nhan_vien' => 'required|string|max:255|min:6| regex:/^[a-zA-Z\s]+$/',
            'mo_ta_ngan'    => 'required|string|max:255',
            'hinh_anh'      => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }
    public function messages()
    {
        return [
            'ten_nhan_vien.*' => 'Tên nhân viên ít nhất là 6 ký tự và không được để trống!',
            'mo_ta_ngan.*'    => 'Mô tả ngắn không được để trống.',
            'hinh_anh.*'      => 'Kích thước hình ảnh không được vượt quá 2MB.',
        ];
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
