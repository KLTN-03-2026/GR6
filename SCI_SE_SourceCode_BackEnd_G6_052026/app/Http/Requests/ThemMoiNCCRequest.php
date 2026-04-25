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
            //cái này là nhà cung cấp
            'ten_nha_cung_cap'          => 'required| min: 4| max: 100| regex:/^[\pL\s]+$/u',
            'so_dien_thoai'             => 'required|regex:/^0[3-9][0-9]{8}$/| unique:khach_hangs,so_dien_thoai|unique:nha_cung_caps,so_dien_thoai',
            'email'                     => 'required| email| unique:khach_hangs,email|unique:nha_cung_caps,email',
            'password'                  => 'required| min: 8|max:50',

            //cái này là thương hiệu của nhà cung cấp
            'ten_thuong_hieu'           => 'required| min: 4| max: 100| regex:/^[\pL\s]+$/u',
            'id_danh_muc_dich_vu'       => 'required|exists:danh_muc_dich_vus,id',
            'ma_so_thue'                => 'required|regex:/^[0-9]{10,13}$/',
            'ma_bin_ngan_hang'          => 'required|regex:/^[0-9]{6,10}$/',
            'tai_khoan_ngan_hang'       => 'required|regex:/^[0-9]{10,20}$/',
            'dia_chi'                   => 'required',
            'logo'                      => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }
    public function messages()
    {
        return [
            'ten_nha_cung_cap.*'        => 'tên trên 4 kí tự và không chứa kí tự đặc biệt',
            'so_dien_thoai.*'           => 'Số điện thoại không đúng hoặc đã được sử dụng',
            'email.*'                   => 'Email đã được sử dụng hoặc không đúng định dạng',
            'password.*'                => 'Mật khẩu phải từ 8 đến 50 kí tự',

            'ten_thuong_hieu.*'         => 'Tên thương hiệu phải từ 4 đến 100 kí tự và không chứa kí tự đặc biệt',
            'id_danh_muc_dich_vu.*'     => 'Chưa nhập dịch vụ',
            'ma_so_thue.*'              => 'Mã số thuế sai định dạng',
            'ma_bin_ngan_hang.*'        => 'Mã BIN ngân hàng sai định dạng',
            'tai_khoan_ngan_hang.*'     => 'Tài khoản ngân hàng sai định dạng hoặc không tồn tại',
            'dia_chi.*'                 => 'Địa chỉ là bắt buộc',
            'logo.*'                    => 'Logo là bắt buộc và phải là hình ảnh có định dạng jpeg, png, jpg, gif, svg và kích thước tối đa 2MB',
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
