<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ThemMoiNCCRequest extends FormRequest
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
            'ten_nha_cung_cap' => 'required| min: 4| max: 100| regex:/^[\pL\s]+$/u',
            'so_dien_thoai'  => 'required|regex:/^0[3-9][0-9]{8}$/| unique:khach_hangs,so_dien_thoai|unique:nha_cung_caps,so_dien_thoai',
            'email'            => 'required| email| unique:khach_hangs,email|unique:nha_cung_caps,email',
            'password'         => 'required| min: 8|max:50',
        ];
    }
    public function messages()
    {
        return [
            'ten_nha_cung_cap.*' => 'tên trên 4 kí tự và không chứa kí tự đặc biệt',
            'so_dien_thoai.*'  => 'Số điện thoại không đúng hoặc đã được sử dụng',
            'email.*'          => 'Email đã được sử dụng hoặc không đúng định dạng',
            'password.*'       => 'Mật khẩu phải từ 8 đến 50 kí tự',
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
