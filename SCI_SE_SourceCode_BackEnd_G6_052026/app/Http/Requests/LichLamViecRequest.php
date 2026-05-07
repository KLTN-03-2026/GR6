<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class LichLamViecRequest extends FormRequest
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
            'id_thuong_hieu' => 'required|exists:thuong_hieus,id',
            'gio_mo_cua' => 'required|date_format:H:i:s',
            'gio_dong_cua' => 'required|date_format:H:i:s|after:gio_mo_cua',
        ];
    }
    public function messages(): array
    {
        return [
            'id_thuong_hieu.*' => 'Vui lòng chọn thương hiệu.',
            'gio_mo_cua.*' => 'Vui lòng nhập giờ mở cửa.',
            'gio_dong_cua.*' => 'Vui lòng nhập giờ đóng cửa, giờ đóng cửa phải sau giờ mở cửa.',
        ];
    }
}
