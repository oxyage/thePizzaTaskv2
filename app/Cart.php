<?php

namespace App;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Cart extends Model
{
    //
	protected $fillable = ['pizza_id', 'customer_id', 'count'];

	public static function show($customer_id)
    {
        return DB::table('carts')
            ->where('customer_id', $customer_id)
            ->join('pizzas', 'carts.pizza_id', '=', 'pizzas.id')
            ->select(
                'carts.pizza_id',
                'carts.count',
                'pizzas.title',
                'pizzas.cost',
                'pizzas.weight')
            ->get()
            ->toArray();
    }



    //пригодится после сделанного заказа очистить корзину
    public static function clear($customer_id)
    {
        return Cart::where('customer_id', $customer_id)->delete();
    }

}
