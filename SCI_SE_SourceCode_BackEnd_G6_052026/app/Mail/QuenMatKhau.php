<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class QuenMatKhau extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;
    public $new_password;
    public $name;

    public function __construct($new_password, $name)
    {
        $this->new_password   = $new_password;
        $this->name = $name;
    }

    public function build()
    {
        return $this->subject("Kích Hoạt Tài Khoản Trên Hệ Thống")->view('mail_quen_mat_khau', ['new_password' => $this->new_password, 'name' => $this->name]);
    }
}
