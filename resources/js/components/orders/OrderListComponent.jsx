import React, {Component} from 'react';
import {Spinner} from "react-bootstrap";


export default function OrderListComponent(props){

    const { Orders } = props;



        return (<table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col"># <Spinner animation="border" variant="secondary" style={{display: 'none'}} /></th>
                    <th scope="col">Date</th>
                    <th scope="col">Order</th>
                    <th scope="col">Cost</th>
                    <th scope="col">Delivery</th>
                    <th scope="col">User</th>
                    <th scope="col">Contacts</th>
                </tr>
                </thead>
                <tbody>

                {
                    Orders.map(order =>{

                        const sumCost = order.order_content.reduce((sum, item) => {
                            sum += item.cost * item.count;
                            return sum;
                        }, 0).toFixed(2);

                        const created_at = new Date(order.created_at);


                        return <tr key={order.id}>
                            <th scope="col">{order.id}</th>
                            <td scope="col">
                                {`${created_at.getHours()}:${created_at.getMinutes()}`} <br/>
                                {`${created_at.getMonth() + 1}-${created_at.getDate()}-${created_at.getFullYear()}`}
                            </td>
                            <td>
                                <ul>

                                    {

                                        order.order_content.map(item =>{




                                            return <li key={item.pizza_id}>
                                                {item.count} <small>x</small> <i>{item.title}</i>
                                            </li>
                                        })

                                    }


                                </ul>
                            </td>
                            <td>
                                { props.currency + ' ' + sumCost}
                            </td>
                            <td>{order.delivery}</td>
                            <td>{order.username}</td>
                            <td>{order.contacts}</td>


                        </tr>;

                    })
                }




                </tbody>
            </table>);

}

