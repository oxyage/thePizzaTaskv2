<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    //
	protected $fillable = ['customer_id',
                            'order_content',
                            'delivery',
                            'contacts'];


	//public static function


	public function getOrderById($order_id)
	{

	}

	public function getOrdersByCustomerId($customer_id)
	{

	}
}
