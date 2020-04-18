<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Pizza;

class CreatePizzasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pizzas', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->longText('images');
            $table->float('cost'); //dollars
            $table->float('weight');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pizzas');
    }
}
