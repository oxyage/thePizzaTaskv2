import React, {Component, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import axios from 'axios'
import Container from "@material-ui/core/Container";

import {Button, Spinner, Form, Table} from "react-bootstrap"

import AppNavigationComponent from "./components/AppNavigationComponent";
import PizzasListComponent from "./components/home/PizzasListComponent";

import OrderListComponent from "./components/orders/OrderListComponent";

import Cart from "./components/cart/CartListComponent";
import FormOrder from "./components/cart/FormOrderComponent";






class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            loading: true,
            Pizzas: [],
            Cart: [],
            Orders: [],
            USD: localStorage.getItem('EUR') !== 'true',
        };

        this.changeCurrency = this.changeCurrency.bind(this);
        this.getCurrency = this.getCurrency.bind(this);
        this.changeCountPizza = this.changeCountPizza.bind(this);
        this.changeOrderedPizza = this.changeOrderedPizza.bind(this);
    }


    componentDidMount(){

        const userId = localStorage.getItem('userId');

        if(!userId)
        {

            let newId = Math.ceil(Math.random() * 100000);
            localStorage.setItem('userId', newId);

            axios.post('/api/customer',
                {
                    name: newId
                })
                .then(function (response) {
                    console.log("Welcome, new user", response.data.name);
                })
                .catch(function (error) {
                    console.warn("User haven't created", error);
                });
        }
        else
        {
            console.log("Welcome, user", userId);
        }

        this.setState({
            userId: userId
        }, function(){

            Promise
                .all([
                    this.loadPizzas(),
                    this.loadCart(),
                    this.loadOrders(),
                ])
                .then(() => {
                //console.log('all ready');
                    //todo: зачем я это вставлял?
                    if(!this.state.USD)
                        this.changeCurrency(!this.state.USD);
            });




        });
    }

    getCurrency()
    {
        return (this.state.USD) ? '$' : '€';
    }

    changeCountPizza(id, count){


        axios.put('/api/cart/' + this.state.userId, {
            pizza_id: id,
            count: count
        });


        const Pizzas = this.state.Pizzas.map(pizza => {

            if(pizza.id === id)
                pizza.count = count;

            return pizza;
        });

        const Cart = this.state.Cart.map(item => {
            if(item.pizza_id === id)
                item.count = count;

            return item;
        });

        this.setState({
            Pizzas,
            Cart
        });
    }

    changeOrderedPizza(p, ordered)
    {
        const Pizzas = this.state.Pizzas.map(pizza => {

            if(pizza.id === p.pizza_id)
            {
                pizza.ordered = ordered;
                pizza.count = (ordered) ? 1 : 0;
            }

            return pizza;
        });

        let newCart = this.state.Cart;

        if(ordered)
        {
            newCart.push(p);

            axios.post('/api/cart/' + this.state.userId, {
                pizza_id: p.pizza_id
            });

        }
        else
        {
            axios.put('/api/cart/' + this.state.userId, {
                pizza_id: p.pizza_id,
                count: 0
            });

            newCart = newCart.filter(item => {
                return p.pizza_id !== item.pizza_id;

            });
        }



         this.setState({
             Pizzas,
             Cart: newCart
         });
    }


    changeCurrency(isEuro)
    {

        const EURtoUSD = 1.13;

        const Cart = this.state.Cart.map(item => {

            if(isEuro)
            {
                item.cost = +(item.cost * EURtoUSD).toFixed(2);
            }
            else
            {
                item.cost = +(item.cost / EURtoUSD).toFixed(2);
            }

            return item;
        });

        const Pizzas = this.state.Pizzas.map(pizza => {

            if(isEuro)
            {
                pizza.cost = +(pizza.cost * EURtoUSD).toFixed(2);
            }
            else
            {
                pizza.cost = +(pizza.cost / EURtoUSD).toFixed(2);
            }

            return pizza;
        });

        const Orders = this.state.Orders.map(Order => {


            Order.order_content = Order.order_content.map(item => {

                if(isEuro)
                {
                    item.cost = +(item.cost * EURtoUSD).toFixed(2);
                }
                else
                {
                    item.cost = +(item.cost / EURtoUSD).toFixed(2);
                }

                return item;
            });

            return Order;
        });


        localStorage.setItem('EUR', isEuro);

        this.setState({
            Orders,
            Cart,
            Pizzas,
            USD: !isEuro,
        });
    }


    loadPizzas(){
        return axios.get('/api/pizzas')
            .then(response => {
            this.setState({
                Pizzas: response.data,
                loading: false
            }, function(){



            });
        })
            .catch(error =>{
                console.error('Error loading pizza\'s list');
            });

    }

    loadOrders(){

        return axios.get('/api/orders/' + this.state.userId)
            .then(response => {

            this.setState({
                Orders: response.data
            }, function(){

            });



        })
            .catch(error => {
                console.error('Error loading orders list');
            });
    }

    loadCart(){

        return axios.get('/api/cart/' + this.state.userId)
             .then(response => {

                 //add to this.state.Pizza info by cart
                 const Cart = response.data;

                 const Pizzas = this.state.Pizzas.map(pizza => {


                     Cart.forEach(item => {

                         if(pizza.id === item.pizza_id)
                         {
                             pizza.ordered = true;
                             pizza.count = item.count;
                         }

                     });

                     return pizza;
                 });


                this.setState({
                    Cart: Cart,
                    Pizzas: Pizzas,
                    });

            })
            .catch(error => {
                console.error('Error loading cart');
            });


    }


    render() {
        return (
            <Router>
                <div>

                    <AppNavigationComponent cartSize={this.state.Cart.length} />

                    <Switch>

                        <Route exact path="/">
                            <Container maxWidth="lg" >
                                <PizzasListComponent
                                    Pizzas={this.state.Pizzas}
                                    currency={this.getCurrency()}
                                    changeCountPizza={this.changeCountPizza}
                                    changeOrderedPizza={this.changeOrderedPizza}
                                />
                            </Container>
                        </Route>

                        <Route path="/orders">
                            <Container maxWidth="lg" >
                               <OrderListComponent Orders={this.state.Orders} currency={this.getCurrency()}/>
                            </Container>
                        </Route>

                        <Route path="/cart">
                            <Container maxWidth="lg" >
                                <Cart
                                    Cart={this.state.Cart}
                                    currency={this.getCurrency()}
                                    changeCurrency={this.changeCurrency}
                                    USD={this.state.USD}
                                    changeCountPizza={this.changeCountPizza}
                                    changeOrderedPizza={this.changeOrderedPizza}
                                />

                                <Button variant="info" >Get order</Button>

                                <FormOrder/>

                            </Container>
                        </Route>

                    </Switch>
                </div>
            </Router>
        );
    }
}


export default App;
