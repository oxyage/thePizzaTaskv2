import {Button, Form} from "react-bootstrap";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(
    (theme) => ({
        root: {

        },
        cols: {
            margin: "0 5px"
        },

    }));

export default function FormOrder(props)
{
    const classes = useStyles();

    const [validated, setValidated] = useState(false);

    const {name, surname, delivery, contacts} = props.orderData;


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else
        {
            event.preventDefault();
            props.makeOrder(form);
        }

        setValidated(true);
    };

    const handleUpdateOrderData = (newData) => {
        props.updateOrderData(newData);
    };

    const handleChangeName = (event) => {
        handleUpdateOrderData({name: event.target.value})
    };

    const handleChangeSurname = (event) => {
        handleUpdateOrderData({surname: event.target.value})
    };

    const handleChangeDelivery = (event) => {
        handleUpdateOrderData({delivery: event.target.value})
    };

    const handleChangeContacts = (event) => {
        handleUpdateOrderData({contacts: event.target.value})
    };



    return (<Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row>
            <Form.Group className={classes.cols} controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" placeholder="Alex" defaultValue={props.orderData.name} onChange={(event) => handleChangeName(event)}/>
            </Form.Group>

            <Form.Group className={classes.cols} controlId="formGridSurname">
                <Form.Label>Surname</Form.Label>
                <Form.Control required type="text" placeholder="Smith" defaultValue={props.orderData.surname} onChange={(event) => handleChangeSurname(event)} />
            </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridAddress">
            <Form.Label>Delivery Address</Form.Label>
            <Form.Control required placeholder="1234 Main St"  defaultValue={delivery}  onChange={(event) => handleChangeDelivery(event)}  />
        </Form.Group>

        <Form.Group controlId="formGridPhone">
            <Form.Label>Mobile Phone</Form.Label>
            <Form.Control required placeholder="+7-912-345-67-89"  defaultValue={contacts}  onChange={(event) => handleChangeContacts(event)}   />
        </Form.Group>



        <Button variant="primary" type="submit">
            Submit
        </Button>
    </Form>);
}
