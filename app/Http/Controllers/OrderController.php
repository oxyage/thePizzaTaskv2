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
    //
    public static function getPizzasByCustomerCart($customer_id)
    {
       /* $customer_cart = Cart::all()->where('customer_id', $customer_id)->all();


        $pizzas_id = array_map(function($item){

            return $item['pizza_id'];

        }, $customer_cart);



        $ordered_pizza = Pizza::all()->whereIn('id', $pizzas_id);

        return $ordered_pizza;
       */

       //todo: использовать только при новом заказе, т.к. старые заказы не хранятся в корзине
        $customer_cart = DB::table('carts')
            ->where('customer_id', $customer_id)
            ->join('pizzas', 'carts.pizza_id', '=', 'pizzas.id')
            ->select(
                //'carts.customer_id',
                'carts.pizza_id','carts.count','pizzas.title',
                //'pizzas.description',
                //'pizzas.images',
                'pizzas.cost','pizzas.weight')
            ->get();

        return $customer_cart;
    }

    public static function getCostAndWeightByOrder($customer_cart)
    {
        $all_sum = 0;
        $all_weight = 0;


        foreach($customer_cart as $position)
        {

            $all_sum += $position->count * $position->cost;
            $all_weight += $position->weight;
        }

        return ["cost"=>$all_sum, "weight"=>$all_weight];
    }

	public static function make($customer_id, Request $request)
    {
        //find in cart all where customer_id
        // move it to order

        $customer_cart = self::getPizzasByCustomerCart($customer_id);

        if(sizeof($customer_cart) === 0)
            return new Response(null, 404);


        $summary = self::getCostAndWeightByOrder($customer_cart);
        $summary['delivery'] = $request->get("delivery");
        $summary['contacts'] = $request->get("contacts");
        $summary['customer_id'] = $customer_id;

      #  return $summary;

        Cart::clear($customer_id); //очищаем корзину

        return Order::create([
            'customer_id' => $customer_id,
            'order_content'=>json_encode($customer_cart),
            'delivery' => $summary['delivery'],
            'contacts' => $summary['contacts']
        ]);

        //->select;




        //get last order id

/*
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
*/

	}

	public static function getAllOrders($customer_id)
    {
        $orders = Order::where('customer_id', $customer_id)->get();



        foreach($orders as $i => $order)
        {
            $orders[$i]['order_content'] = json_decode($order['order_content']);
            $order['summary'] = self::getCostAndWeightByOrder($order['order_content']);
        }
        return $orders;
    }


	public static function getOrder($customer_id, $order_id)
	{

        $order = Order::all()
            ->where('customer_id', $customer_id)
            ->where('id', $order_id)->first();


        if(!$order)
            return response(null, 400);



        $order['order_content'] = json_decode($order['order_content']);
        $order['summary'] = self::getCostAndWeightByOrder($order['order_content']);

        return $order;
	}



}
