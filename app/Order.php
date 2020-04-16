<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    //
	protected $fillable = ['customer_name', 'content'];
	
	public function getOrderById($order_id)
	{
		
	}
	
	public function getOrdersByCustomerId($customer_id)
	{
		
	}
}
