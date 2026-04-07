<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Utf8JsonResponse
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

    // Nếu response là JSON
    if ($response instanceof \Illuminate\Http\JsonResponse) {

        // Lấy dữ liệu gốc từ JsonResponse
        $data = $response->getData(true);

        // Encode lại với JSON_UNESCAPED_UNICODE để hiển thị tiếng Việt đúng
        $response->setContent(json_encode($data, JSON_UNESCAPED_UNICODE));

        // Đặt lại header UTF-8
        $response->headers->set('Content-Type', 'application/json; charset=utf-8');
    }

    return $response;
    }
}
