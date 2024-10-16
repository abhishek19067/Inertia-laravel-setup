<?php

use App\Http\Controllers\nameController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/name',[nameController::class,"store"]);
Route::get('/show',[nameController::class,"show"]);
Route::delete('/delete/{id}',[nameController::class,"delete"]); 
 Route::put('/edit/{id}',[nameController::class,"edit"]);
 route::put('/update/{id}',[nameController::class,'update']);