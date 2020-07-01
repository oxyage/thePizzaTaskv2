import {Table} from "react-bootstrap";
import React from "react";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {IconButton} from "@material-ui/core";

import {makeStyles} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';



const useStyles = makeStyles(
    (theme) => ({
        root: {

        },
        gridList: {
            // width: 500,
            // height: 450,
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
    }));

export default function Cart(props) {

    const {Cart} = props;

    const classes = useStyles();


    const sumWeight = Cart.reduce((sum, item) => {
        sum += item.count * item.weight;
        return sum;
    }, 0).toFixed(2);

    const sumCount = Cart.reduce((sum, item) => {
        sum += item.count;
        return sum;
    }, 0).toFixed(0);

    const sumCost = Cart.reduce((sum, item) => {
        sum += item.cost * item.count;
        return sum;
    }, 0).toFixed(2);



    return <Table responsive="lg">
        <thead>
        <tr>
            <th>#</th>
            <th>Pizza</th>
            <th>Cost</th>
            <th>Count</th>
            <th>Total cost</th>
            <th>Remove from cart</th>
        </tr>
        </thead>
        <tbody>

        {
            Cart.map((item, index) => {





                const increment = (id) => changeCount(id, item.count + 1);
                const decrement = (id) => {
                    if(item.count > 1)
                        changeCount(id, item.count - 1);
                };

                function changeCount(id, count){
                    props.changeCountPizza(id, count)
                }


                const handleChangeOrdered = (ordered) =>  {

                    props.changeOrderedPizza(item, ordered);
                };


                return (<tr key={index}>
                    <td>{(index + 1)}</td>
                    <td>{item.title} <small>({item.weight} kg)</small></td>
                    <td>{props.currency} {item.cost}</td>
                    <td>
                        <IconButton aria-label="minus one" onClick={() => decrement(item.pizza_id)}>
                            <RemoveIcon fontSize="small" />
                        </IconButton>
                        {item.count}
                        <IconButton aria-label="minus one" onClick={() => increment(item.pizza_id)}>
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </td>
                    <td>{props.currency} {(item.cost * item.count).toFixed(2)}</td>
                    <td>
                        <IconButton
                            onClick={() => handleChangeOrdered(false)}
                            aria-label="delete"
                           >
                            <RemoveShoppingCartIcon fontSize="small" color="secondary"/>
                        </IconButton>
                    </td>
                </tr>)
            })
        }

        <tr className="bg-light text-black">
            <th scope="row" colSpan="3" >Total</th>
            <td>
                { sumCount } <small>({ sumWeight } kg)</small>

            </td>
            <td>
                { props.currency + ' ' + sumCost}

            </td>
            <td>

                <div className="custom-control custom-switch">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="currencySwitch"
                        checked={!props.USD}
                        onChange={(event) =>
                            props.changeCurrency(event.target.checked)}
                    />
                    <label className="custom-control-label" htmlFor="currencySwitch">Show in EUR</label>
                </div>

            </td>
        </tr>
        </tbody>
    </Table>;
}
