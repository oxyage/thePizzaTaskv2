import {Button, Form} from "react-bootstrap";
import React from "react";

export default function FormOrder()
{
    return (<Form>
        <Form.Row>
            <Form.Group controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Alex" />
            </Form.Group>

            <Form.Group  controlId="formGridSurname">
                <Form.Label>Surname</Form.Label>
                <Form.Control type="text" placeholder="Smith" />
            </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridAddress">
            <Form.Label>Delivery Address</Form.Label>
            <Form.Control placeholder="1234 Main St" />
        </Form.Group>

        <Form.Group controlId="formGridPhone">
            <Form.Label>Mobile Phone</Form.Label>
            <Form.Control placeholder="+7-912-345-67-89" />
        </Form.Group>



        <Button variant="primary" type="submit">
            Submit
        </Button>
    </Form>);
}
