<?php

use App\Events\MessageSent;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test-realtime', function () {
    broadcast(new MessageSent("Hello Bi"));
    return "Sent!";
});