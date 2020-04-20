# THE PIZZA TASK

Here is only backend

## Installation

Copy or download this reposithory

**Fix configuration environment**

Create configuration file `.env`

    cp .env.example .env

Change following strings

    DB_CONNECTION=mysql
    DB_HOST=remotemysql.com 	-- set here your mysql server
    DB_PORT=3306			-- set port local server
    DB_DATABASE=pizzas_db	    -- (at first create new database) 
    DB_USERNAME=username	    -- user name to mysql
    DB_PASSWORD=userpass	    -- user password to mysql


**Start migrations and fill database**

    php artisan migrate --seed
	
	
# Deploy to Heroku

By default, Heroku will launch an Apache web server together with PHP to serve applications from the root directory of the project.

However, your application’s document root is the public/ subdirectory, so you need to create a Procfile that configures the correct document root:

    echo "web: vendor/bin/heroku-php-apache2 public/" > Procfile
    git add .
    git commit -m "Procfile for Heroku"
    
To create a new Heroku application that you can push to, use the heroku create command:    
    
    heroku create    
	
The application’s encryption key is used by Laravel to encrypt user sessions and other information. Its value will be read from the `APP_KEY` environment variable.

As it must comply with the rules of the selected cipher in the configuration, the easiest way to generate a valid key is using the php artisan key:generate --show command, which will print a key that you can copy and then paste into the next step.
    
    php artisan key:generate --show	
	
	heroku config:set APP_KEY={Paste_here}
	
	
Pushing to Heroku

    git push heroku master

Go to Heroku dashboard `http://dashboard.heroku.com/apps/{APP_NAME}}/settings`

Set Config Vars

    DB_CONNECTION=mysql
    DB_HOST=remotemysql.com 	-- set here your mysql server
    DB_PORT=3306			-- set port local server
    DB_DATABASE=pizzas_db	    -- (at first create new database) 
    DB_USERNAME=username	    -- user name to mysql
    DB_PASSWORD=userpass	    -- user password to mysql
    
Open project    
    
    heroku open	
