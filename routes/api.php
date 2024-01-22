<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SpinshieldController;

Route::get('/callback/3/superaggrdev', [SpinshieldController::class, 'callback'])->name('callback');
