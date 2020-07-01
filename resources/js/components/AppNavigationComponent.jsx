import React from 'react';
import "bootstrap/dist/js/bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, NavLink
} from "react-router-dom";

import Container from "@material-ui/core/Container";
import {Badge, Button, Nav, Navbar, NavItem} from "react-bootstrap";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(
    (theme) => ({
        root: {

        },

        navButton: {
            margin:'0 10px'
        },
        badge: {
            margin:'2px'
        },
    }));


export default function AppNavigationComponent(props) {

    const classes = useStyles();

    return (
        <Container maxWidth="lg" >
            <Navbar bg="dark" variant="dark" expand="md">
                <Navbar.Brand>

                        <NavLink to={'/'}>
                            <Button variant="info"> Get Pizza</Button>
                        </NavLink>

                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <NavLink to={'/orders'} className={classes.navButton}>

                            <Button variant="outline-light">
                                My Orders
                            </Button>
                        </NavLink>
                        <NavLink to={'/cart'} className={classes.navButton}>
                            <Button variant="outline-info">
                                My Cart {' '}
                                <Badge variant="light" className={classes.badge}>
                                    {props.cartSize}
                                </Badge>
                            </Button>

                        </NavLink>
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
}
