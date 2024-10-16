<?php

use Inertia\inertia;
use Illuminate\Support\Facades\Route;


Route::get('/',function(){
    return Inertia::render('Sample');
 });