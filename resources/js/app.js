import React, {Component, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import axios from 'axios'
import Container from "@material-ui/core/Container";

import {Button, Spinner, Form, Table, Alert} from "react-bootstrap"

import AppNavigationComponent from "./components/AppNavigationComponent";
import PizzasListComponent from "./components/home/PizzasListComponent";

import OrderListComponent from "./components/orders/OrderListComponent";

import Cart from "./components/cart/CartListComponent";
import FormOrder from "./components/cart/FormOrderComponent";






class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            userId: +localStorage.getItem('userId'),
            Pizzas: [],
            pizzasLoading: true,
            Cart: [],
            cartLoading: true,
            Orders: [],
            orderLoading: true,
            makeOrder: false,
            orderData: {
                name: '',
                surname: '',
                delivery: '',
                contacts: ''
            },
            USD: localStorage.getItem('EUR') !== 'true',
        };

        this.changeCurrency = this.changeCurrency.bind(this);
        this.getCurrency = this.getCurrency.bind(this);
        this.changeCountPizza = this.changeCountPizza.bind(this);
        this.changeOrderedPizza = this.changeOrderedPizza.bind(this);
        this.makeOrder = this.makeOrder.bind(this);
        this.updateOrderData = this.updateOrderData.bind(this);
    }


    componentDidMount(){

        const userId = +localStorage.getItem('userId');

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
                    this.setState({
                        userId: response.data.name
                    });


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
            userId: +localStorage.getItem('userId')
        }, function(){

            Promise
                .all([
                    this.loadPizzas(),
                    this.loadOrders(),
                ])
                .then(() => {
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

    makeOrder(orderData)
    {
        this.setState({
            makeOrder: true
        });


        axios.post('/api/order/' + this.state.userId,{
            delivery: this.state.orderData.delivery,
            contacts: this.state.orderData.contacts,
            username: this.state.orderData.name + ' ' + this.state.orderData.surname
        })
            .then(response => {


                  Promise.all([
                      this.loadOrders(),
                      this.loadCart()
                  ]).then(() => {




                      this.setState({
                          makeOrder: false,
                          Pizzas: this.state.Pizzas.map(pizza => {
                              pizza.ordered = false;
                              pizza.count = 1;
                              return pizza;
                          })
                      });

                  });




            });

        console.log('make new order');

    }

    updateOrderData(newData)
    {

        this.setState({
            makeOrder: false,
            orderData: {...this.state.orderData, ...newData}
        })
    }


    loadPizzas(){
        return axios.get('/api/pizzas')
            .then(response => {
            this.setState({
                Pizzas: response.data,
                pizzasLoading: false
            }, function(){

                this.loadCart();

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
                Orders: response.data,
                orderLoading: false
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
                    cartLoading: false,
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

                                {
                                    this.state.pizzasLoading &&  <Spinner animation="border" variant="secondary"/>
                                }


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


                                {
                                    this.state.orderLoading &&  <Spinner animation="border" variant="secondary"/>
                                }
                                {
                                    this.state.Orders.length < 1 && !this.state.orderLoading &&  <Alert variant={'info'}>
                                        Your order history is empty
                                    </Alert>
                                }

                                {
                                    this.state.Orders.length > 0 && !this.state.orderLoading &&  <OrderListComponent
                                        Orders={this.state.Orders}
                                        currency={this.getCurrency()}
                                    />
                                }


                            </Container>
                        </Route>

                        <Route path="/cart">
                            <Container maxWidth="lg" >

                                {

                                    this.state.makeOrder && <Alert variant={'success'}>
                                        Your order is accepted
                                    </Alert>
                                }


                                {
                                    this.state.Cart.length < 1 && !this.state.cartLoading && !this.state.makeOrder && <Alert variant={'info'}>
                                        Your cart is empty
                                    </Alert>
                                }

                                {
                                    this.state.cartLoading &&  <Spinner animation="border" variant="secondary"/>
                                }

                                {
                                    this.state.Cart.length > 0 && !this.state.makeOrder &&  <Cart
                                        Cart={this.state.Cart}
                                        currency={this.getCurrency()}
                                        changeCurrency={this.changeCurrency}
                                        USD={this.state.USD}
                                        changeCountPizza={this.changeCountPizza}
                                        changeOrderedPizza={this.changeOrderedPizza}

                                    />
                                }
                                {
                                    this.state.Cart.length > 0 && !this.state.makeOrder &&
                                    <FormOrder
                                        makeOrder={this.makeOrder}
                                        updateOrderData={this.updateOrderData}
                                        orderData={this.state.orderData}
                                    />
                                }

                            </Container>
                        </Route>

                    </Switch>
                </div>
            </Router>
        );
    }
}


export default App;
