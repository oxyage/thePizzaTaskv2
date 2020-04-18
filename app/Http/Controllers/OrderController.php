<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;
use App\Cart;


class OrderController extends Controller
{
    //

	public function take(Request $request, $customer_id)
    {
        //find in cart all where customer_id
        // move it to order
        $customers_cart = Cart::all()->where('customer_id', $customer_id);

        //get last order id
        $order_id = time();

        foreach($customers_cart as $cart){
            Order::create([
                'order_id' => $order_id,
                'customer_id' => $customer_id,
                'pizza_id' => $cart['pizza_id'],
                'count' => $cart['count'],
                'delivery' => $request->get('delivery'),
                'contacts' => $request->get('contacts')
            ]);
        }


	}

	public function history($customer_id)
	{
       //find all where customer id

	}



}
