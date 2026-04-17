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
            'ma_hoa_don'            => 'required|string',
            'id_chi_tiet_dat_lich'  => 'required|integer|exists:chi_tiet_dat_lich,id',
            'total_vnpay'           => 'required|numeric|min:1000',
            
        ];
    }
    public function messages()
    {
        return [
            'ma_hoa_don.*' => 'Mã hóa đơn không tồn tại!',
            'total_vnpay.*' => 'Tổng tiền không đúng định dạng',
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
