import React from 'react';
import Grid from "@material-ui/core/Grid";
import PizzaCardComponent from "./PizzaCardComponent";
import {makeStyles} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";



const useStyles = makeStyles(
    (theme) => ({
    root: {
        // display: 'flex',
        // flexWrap: 'wrap',
        maxWidth: 345,
        // justifyContent: 'space-around',
        // overflow: 'hidden',
        // backgroundColor: theme.palette.background.paper,
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
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    deleteIcon:{
        marginLeft: 'auto'
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    rootNav: {
        flexGrow: 1,
    },
    menuButtonNav: {
        marginRight: theme.spacing(2),
    },
    titleNav: {
        flexGrow: 1,
    },

}));


export default function PizzasListComponent(props) {

    const classes = useStyles();

    const {Pizzas, currency} = props;

    return (
        <Grid container spacing={4}>

            {Pizzas.map(pizza => {


              return(<Grid item xs={12} sm={6} md={4} key={pizza.id}>
                    <div className={classes.paper}>
                        <PizzaCardComponent
                            title={pizza.title}
                            description={pizza.description}
                            cost={pizza.cost}
                            weight={pizza.weight}
                            ordered={pizza.ordered}
                            count={pizza.count}
                            currency={currency}
                            changeCountPizza={props.changeCountPizza}
                            changeOrderedPizza={props.changeOrderedPizza}
                            {...pizza}
                        />
                    </div>
                </Grid>);
            })}

        </Grid>);
}
