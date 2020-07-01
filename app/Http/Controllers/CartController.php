<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//use Illuminate\Http\Response;
use App\Cart;
use App\Order;
use Illuminate\Support\Facades\DB;


class CartController extends Controller
{

    public function add($customer_id, Request $request) // добавить 1 пиццу в корзину
    {
        return Cart::firstOrCreate([
                'customer_id' => $customer_id,
                'pizza_id' => $request->get('pizza_id')
            ]);
    }

	public function update($customer_id, Request $request) //обновить пиццу в корзине
    {

        $pizza = Cart::where('customer_id' , $customer_id)
                    ->where('pizza_id', $request->get('pizza_id'))
                    ->firstOrFail();

        if($request->get('count') <= 0) // удаляем если новое значение 0
        {
            return response($pizza->delete(), 204);
        }



        return response($pizza->update([
            'count' => $request->get('count')
        ]), 202);

    }



	public function show($customer_id) // получить корзину
	{
	    $cart =  Cart::show($customer_id);

        if(!$cart)
            return response([], 200);

        return $cart;
	}


    public function clear($customer_id)
    {
        return response(Cart::clear($customer_id),204);
    }

}
