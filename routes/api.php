<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StockController;
use App\Http\Controllers\DividendController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/stocks', [StockController::class, 'index']);
Route::post('/stocks', [StockController::class, 'store']);
Route::get('/stocks/{id}', [StockController::class, 'show']);
Route::put('/stocks/{id}', [StockController::class, 'update']);
Route::delete('/stocks/{id}', [StockController::class, 'destroy']);

Route::get('/dividends', [DividendController::class, 'index']);
Route::get('/dividends/{stock}', [DividendController::class, 'stockDividend']);
Route::post('/dividends', [DividendController::class, 'store']);
Route::get('/dividends/{id}', [DividendController::class, 'show']);
Route::put('/dividends/{id}', [DividendController::class, 'update']);
Route::delete('/dividends/{id}', [DividendController::class, 'destroy']);