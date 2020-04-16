# THE PIZZA TASK

Here is only backend

## Installation

Copy or download this reposithory

**Fix configuration environment**

Create configuration file `.env`

    cp .env.example .env

Change following strings

    DB_CONNECTION=mysql
    DB_HOST=localhost  -- set here your local mysql server
    DB_PORT=3306			-- set port local server
    DB_DATABASE=pizzas_db	-- (at first create new database) 
    DB_USERNAME=username	-- user name to mysql
    DB_PASSWORD=userpass	-- user password to mysql


**Go to migrations**

    php artisan migrate
	
**Fill database sample pizzas**

	php artisan db:seed --class=PizzasSeeder
	

	
	
	
