<?php

//use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Route;

Route::get('/about', function () {
    return response('Welcome api home', 200);
});


//Route::get('/customers', "CustomerController@all");
Route::post('/customer', "CustomerController@add");


// Pizza
Route::get('/pizzas', "PizzaController@index");

//Route::get('/pizza/{id}', "PizzaController@show");
//Route::get('/pizza', function(){
//    return new Response('Invalid `pizza_id`', 403);
//});

// Cart
Route::any('/cart', function(){
    return new Response('', 400);
});

Route::post('/cart/{customer_id}', "CartController@add"); // add to cart 1 pizza
Route::put('/cart/{customer_id}', "CartController@update"); // update pizza in cart
Route::get('/cart/{customer_id}', "CartController@show"); // show customer's cart
Route::delete('/cart/{customer_id}', "CartController@clear"); //clear cart




//Order
Route::post('/order/{customer_id}', "OrderController@make"); //сформировать заказ из корзины
Route::get('/orders/{customer_id}', "OrderController@getAllOrders"); //посмотреть все заказы

Route::get('/order', function(){
    return new Response('Invalid `customer_id`', 403);
});


#Route::get('/order/{customer_id}/{order_id}', "OrderController@getOrder"); //посмотреть один заказ





