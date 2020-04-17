<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    //
	protected $fillable = ['pizza_id', 'customer_id', 'count'];

	public static function show($customer_id)
    {
        return Cart::all()->where('customer_id', $customer_id);
    }

	public function addToCart()
	{

	    //return sum and numbers
	}

	public static function removeFromCart($customer_id, $id)
	{
        $position = Cart::where('customer_id', $customer_id)
            ->where('id', $id);
        $position->delete();

	}

	public function editInCart()
	{

        //return sum and numbers
	}
}
