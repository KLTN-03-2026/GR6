<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ThuongHieuRequest extends FormRequest
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
   public function rules()
    {
        return [
            'ten_thuong_hieu'     => 'required|string|max:255',
            'so_dien_thoai'       => 'required|numeric|digits_between:10,11',
            'id_danh_muc_dich_vu' => 'required|exists:danh_muc_dich_vus,id',
            'ma_so_thue'          => 'nullable|string|max:50',
            'ma_bin_ngan_hang'    => 'nullable|string|max:20',
            'tai_khoan_ngan_hang' => 'nullable|numeric',
            'dia_chi'             => 'required|string|max:500',
            'logo'                => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'anh_bia'             => 'nullable|image|mimes:jpeg,png,jpg,gif|max:4096',
        ];
    }

    public function messages()
    {
        return [
            'ten_thuong_hieu.required'     => 'Tên thương hiệu không được để trống.',
            'so_dien_thoai.required'       => 'Số điện thoại không được để trống.',
            'so_dien_thoai.numeric'        => 'Số điện thoại phải là định dạng số.',
            'id_danh_muc_dich_vu.exists'   => 'Danh mục dịch vụ không tồn tại.',
            'dia_chi.required'             => 'Địa chỉ không được để trống.',
            'logo.image'                   => 'Logo phải là định dạng hình ảnh.',
            'logo.*'                       => 'Logo bắt buộc và dung lượng tối đa 2MB.',
            'anh_bia.*'                    => 'Ảnh bìa bắt buộc và dung lượng tối đa 4MB.',
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
