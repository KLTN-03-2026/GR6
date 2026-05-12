<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateKhachHangRequest extends FormRequest
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
            'ten_khach_hang' => 'required| min: 4| max: 100|regex:/^[\pL\s]+$/u',
            'so_dien_thoai'  => 'required|regex:/^0[3-9][0-9]{8}$/',
            'email'          => 'required| email',
            'password'       => 'nullable|min: 8|max:50',
            'avatar'         => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }
    public function messages()
    {
        return [
            'ten_khach_hang.*' => 'tên trên 4 kí tự và không chứa kí tự đặc biệt',
            'so_dien_thoai.*'  => 'Số điện thoại không đúng hoặc đã được sử dụng',
            'email.*'          => 'Email đã được sử dụng hoặc không đúng định dạng',
            'password.*'       => 'Mật khẩu phải từ 8 đến 50 kí tự',
            'avatar.*'         => 'Ảnh đại diện phải là file ảnh (jpeg, png, jpg, gif) và không vượt quá 2MB',
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
