#The Pizza task

Here is only backend

## Installation

Copy or download this reposithory

**Fix configuration environment**

Create configuration file `.env}`

    cp .env.example .env

Change following strings

    DB_CONNECTION=mysql
    DB_HOST=remotemysql.com  -- set here your local mysql server
    DB_PORT=3306			-- set port local server
    DB_DATABASE=P2nDp9CQMQ	-- (at first create new database) 
    DB_USERNAME=P2nDp9CQMQ	-- user name to mysql
    DB_PASSWORD=R9cfAmnMqe	-- user password to mysql


**Go to migrations**
    php artisan migrate
