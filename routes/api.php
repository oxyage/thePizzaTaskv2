<?php

//use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/

// Pizza
Route::get('/pizzas', "PizzaController@index");
Route::get('/pizza/{id}', "PizzaController@show");
Route::get('/pizza', function(){
    return new Response('Invalid `pizza_id`', 403);
});

// Cart
Route::any('/cart', function(){
    return new Response('', 400);
});
Route::get('/cart/{customer_id}', "CartController@show");
//Route::post('/cart/{customer_id}', "CartController@add");
Route::put('/cart/{customer_id}', "CartController@edit");
Route::delete('/cart/{customer_id}', "CartController@clear"); //clear cart




//Order
Route::get('/order', function(){
    return new Response('Invalid `customer_id`', 403);
});
Route::get('/order/{customer_id}', "OrderController@history");
Route::post('/order/{customer_id}', "OrderController@edit");
Route::delete('/cart/{customer_id}', "CartController@clear");




