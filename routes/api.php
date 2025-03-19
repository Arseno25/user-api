<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Route::get('/user', function (Request $request) {
//    return $request->user();
//})->middleware('auth:sanctum');

 //Menggunakan Route::apiResource untuk mendefinisikan rute CRUD secara otomatis
//Route::apiResource('users', UserController::class)->middleware('validate.user');

Route::get('users', [UserController::class, 'index']);
Route::post('users', [UserController::class, 'store'])->middleware('validate.user');
Route::get('users/{user}', [UserController::class, 'show']);
Route::put('users/{user}', [UserController::class, 'update'])->middleware('validate.user');
Route::delete('users/{user}', [UserController::class, 'destroy']);
