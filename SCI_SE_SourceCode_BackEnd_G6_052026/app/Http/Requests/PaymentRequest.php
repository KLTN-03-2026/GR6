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
            'ma_hoa_don'            => 'required|string|max:50',
            'id_chi_tiet_dat_lich'  => 'required|integer|exists:chi_tiet_dat_lich,id',
            'total_vnpay'           => 'required|numeric|min:1000',
            'tong_tien_thanh_toan'  => 'required|numeric|min:0',
            'tong_tien_da_nhan'     => 'required|numeric|min:0',
        ];
    }
    public function messages()
    {
        return [
            'ma_hoa_don.*'              => 'Mã hóa đơn không hợp lệ',
            'id_chi_tiet_dat_lich.*'    => 'Chi tiết đặt lịch không tồn tại hoặc không hợp lệ',
            'total_vnpay.*'             => 'Số tiền VNPAY phải là số và tối thiểu 1000',
            'tong_tien_thanh_toan.*'    => 'Tổng tiền thanh toán phải là số',
            'tong_tien_da_nhan.*'       => 'Số tiền nhận phải là số',
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
