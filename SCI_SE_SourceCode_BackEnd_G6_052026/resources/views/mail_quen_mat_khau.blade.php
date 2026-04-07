<!DOCTYPE html>

<html lang="vi">
<head>
    <meta charset="UTF-8">
</head>
<body style="margin:0;padding:0;background-color:#f4f6f9;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0">
    <tr>
        <td align="center" style="padding:30px 0;">
            
            <table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                
                <!-- Header -->
                <tr>
                    <td style="background:#3490dc;color:white;padding:20px;text-align:center;">
                        <h2 style="margin:0;">Cấp lại mật khẩu</h2>
                    </td>
                </tr>

                <!-- Body -->
                <tr>
                    <td style="padding:30px;text-align:center;color:#333;">
                        
                        <p>Xin chào <b>{{ $name }}</b>,</p>

                        <p>Chúng tôi đã tạo mật khẩu mới cho tài khoản của bạn:</p>

                        <div style="margin:20px 0;padding:15px;background:#f1f5f9;border-radius:8px;font-size:20px;font-weight:bold;color:#e3342f;letter-spacing:2px;">
                            {{ $new_password }}
                        </div>

                        <p style="color:#666;font-size:14px;">
                            Vì lý do bảo mật, vui lòng đăng nhập và thay đổi mật khẩu ngay sau khi đăng nhập.
                        </p>

                        <!-- Button -->
                        <a href="http://localhost:3000/login"
                           style="display:inline-block;margin-top:20px;padding:12px 25px;background:#38c172;color:white;text-decoration:none;border-radius:6px;font-weight:bold;">
                            Đăng nhập ngay
                        </a>

                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td style="padding:15px;text-align:center;font-size:12px;color:#999;">
                                Đây là email tự động vui lòng không reply lại email này                            
                    </td>
                </tr>

            </table>

        </td>
    </tr>
</table>

</body>
</html>

