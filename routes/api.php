<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Route::get('/user', function (Request $request) {
//    return $request->user();
//})->middleware('auth:sanctum');

Route::apiResource('/users', UserController::class);

Route::post('users', [UserController::class, 'store'])->middleware('validate.user');
Route::put('users/{user}', [UserController::class, 'update'])->middleware('validate.user');
Route::patch('users/{user}', [UserController::class, 'update'])->middleware('validate.user');
Route::delete('users/{user}', [UserController::class, 'destroy']);
