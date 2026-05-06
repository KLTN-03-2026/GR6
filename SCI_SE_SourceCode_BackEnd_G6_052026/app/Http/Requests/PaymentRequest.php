<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class PaymentRequest extends FormRequest
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
            'id_chi_tiet_dat_lich'  => 'required|integer|exists:chi_tiet_dat_lichs,id',
        ];
    }
    public function messages()
    {
        return [
            'id_chi_tiet_dat_lich.*'    => 'Chi tiết đặt lịch không tồn tại hoặc không hợp lệ',
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
