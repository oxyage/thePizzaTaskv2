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
            ["name" =>  "guest", "password" => "guest"],
            ["name" =>  "stepan", "password" => "123"],
            ["name" =>  "anna", "password" => "123"],
            ["name" =>  "oleg", "password" => "123"],
            ["name" =>  "yaroslaw", "password" => "123"],
            ["name" =>  "vladimir", "password" => "123"],
            ["name" =>  "darya", "password" => "123"],
            ];


        foreach($customers as $customer)
        {
            Customer::create([
                'name' => $customer['name'],
                'password' => $customer['password']
            ]);
        }
    }
}
