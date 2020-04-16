<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Cart;

class CartController extends Controller
{
    //
	public function add(Request $request)
	{
		
	}
	
	public function remove($id)
	{
		
	}
	
	public function edit(Request $request, $id)// position_id
	{
		//edit where position id = $id
	}
	
	public function show($customer_id)
	{
		//select all rows where customer id = {customer_id}
	}
	
	public function clear($customer_id)
	{
		//delete all rows where customer id = {customer_id}
	}
	
}
