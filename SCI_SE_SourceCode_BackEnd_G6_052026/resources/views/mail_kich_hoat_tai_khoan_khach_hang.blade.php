<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kích hoạt tài khoản</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:20px 0;">
        <tr>
            <td align="center">
                
                <!-- Container -->
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
                    
                    <!-- Header -->
                    <tr>
                        <td align="center" style="background:#0066FF;padding:30px;">
                            <h1 style="margin:0;color:#fff;">Multi Booking Service</h1>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding:30px;color:#333;">
                            
                            <h2 style="margin-top:0;">Xin chào {{ $name }}</h2>

                            <p>
                                Cảm ơn bạn đã đăng ký tài khoản tại hệ thống của chúng tôi.
                            </p>

                            <p>
                                Để hoàn tất đăng ký, vui lòng nhấn vào nút bên dưới để kích hoạt tài khoản:
                            </p>

                            <!-- Button -->
                            <div style="text-align:center;margin:30px 0;">
                                <a href="http://127.0.0.1:8000/api/khach-hang/kich-hoat-tai-khoan/{{ $hash_active }}"
                                   style="background:#0066FF;color:#fff;padding:15px 25px;
                                   text-decoration:none;border-radius:5px;font-size:16px;">
                                    KÍCH HOẠT TÀI KHOẢN
                                </a>
                            </div>

                            <p>
                                Nếu nút không hoạt động, hãy nhấn link bên dưới:
                            </p>

                            <p style="word-break:break-all;">
                                <a href="http://127.0.0.1:8000/api/khach-hang/kich-hoat-tai-khoan/{{ $hash_active }}">
                                    Xác nhận tại đây nhé!
                                </a>
                            </p>

                            <hr>

                            <p style="font-size:13px;color:#888;">
                                Đây là email tự động vui lòng không reply lại email này                            
                            </p>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="background:#f4f4f4;padding:20px;font-size:12px;color:#888;">
                            © {{ date('Y') }} Multi Booking Service. All rights reserved.
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>