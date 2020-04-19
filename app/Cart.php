<?php

namespace App;


use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    //
	protected $fillable = ['pizza_id', 'customer_id', 'count'];

	public static function show($customer_id)
    {
		//todo: исправить, чтобы возвращался массив
        return Cart::all()->where('customer_id', $customer_id)->all();
    }

	public static function addToCart($customer_id, $pizza_id, $count)
	{
        return Cart::create(['pizza_id'=> $pizza_id,
            'count'=> $count,
            'customer_id'=> $customer_id]);
	}

	public static function edit($customer_id, $pizza_id, $count)
    {
        $find = Cart::all()->where('customer_id', $customer_id)
            ->where('pizza_id', $pizza_id);

        if($find->count() > 0)
        {
            return Cart::where('customer_id', $customer_id)
                ->where('pizza_id', $pizza_id)
                ->update(['count'=>  $count]);

        }
        else
            return Cart::addToCart($customer_id, $pizza_id, $count);


    }


	public static function removeFromCart($customer_id, $pizza_id)
	{
     return Cart::where('customer_id', $customer_id)
            ->where('pizza_id', $pizza_id)
            ->delete();


	}

    //пригодится после сделанного заказа очистить корзину
    public static function clear($customer_id)
    {
        return Cart::where('customer_id', $customer_id)->delete();
    }

}
