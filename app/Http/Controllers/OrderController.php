<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use App\Order;
use App\Cart;
use App\Pizza;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;


class OrderController extends Controller
{
	public function make($customer_id, Request $request) // сформировать заказ из корзины
    {
        //find in cart all where customer_id
        // move it to order
        $cart = Cart::show($customer_id);

        if(!$cart)
            return response('Cart is empty', 404);

        $order = Order::create([
            'customer_id' =>    $customer_id,
            'order_content'=>   json_encode($cart),
            'delivery' =>       $request->get('delivery'),
            'username' =>       $request->get('username'),
            'contacts' =>       $request->get('contacts'),
        ]);

        Cart::clear($customer_id);

        return $order;
	}

	public static function getAllOrders($customer_id)
    {
        return Order::where('customer_id', $customer_id)
                        ->orderBy('id', 'desc')
                        ->get()
                        ->map(function($order){
                           $order['order_content'] = json_decode($order['order_content']);
                           return $order;
                        });
    }





}
