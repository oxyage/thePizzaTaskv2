<?php

use App\Customer;
use Illuminate\Database\Seeder;

class CustomersSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $customers = [
            ["name" =>  "guest"],
            ["name" =>  "stepan"],
            ["name" =>  "anna"],
            ["name" =>  "oleg"],
            ["name" =>  "yaroslaw"],
            ["name" =>  "vladimir"],
            ["name" =>  "darya"],
            ];


        foreach($customers as $customer)
        {
            Customer::create([
                'name' => $customer['name']
            ]);
        }
    }
}
