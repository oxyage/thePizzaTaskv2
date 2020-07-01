import React, {useState} from "react";
import {Card, CardHeader, CardMedia, CardContent, Typography, IconButton, Button} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions/CardActions";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles((theme) => ({
    root: {
        border: 1,
        maxWidth: 345,
    },
    header: {
        textAlign: 'left'
    },
    counterButton: {
        marginLeft: '10px',
        marginRight: '10px'
    },
    media: {

    },
    content:{
        textAlign: 'left'
    },
    deleteIcon:{
        marginLeft: 'auto'
    },

}));

export default function PizzaCardComponent(props)
{
    const classes = useStyles();

    const {id, title, description, images, cost, weight, currency, ordered, count} = props;



    function changeCount(id, count){
        props.changeCountPizza(id, count);
    }

    function changeOrdered(ordered){
        props.changeOrderedPizza({pizza_id: id, title, cost, weight, count: 1}, ordered);
    }


    const increment = () => changeCount(id, count + 1);
    const decrement = () => {
        if(count > 1)
            changeCount(id, count - 1);
    };

    const handleChangeOrdered = (ordered) =>  {

        if(!ordered)
            changeCount(id,1);

        changeOrdered(ordered);
    };


    return (
        <Card className={classes.root}>
            <CardHeader
                className={classes.header}
                title={title}
                subheader={`${currency} ${cost} / ${weight}kg`}
            />
            <CardMedia
                className={classes.media}
                component="img"
                src={'data:image/jpeg;base64,' + images}
                title={title}
            />

            <CardContent
                className={classes.content}
            >
                <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
            </CardContent>

            <CardActions disableSpacing>
                {!ordered && <Button
                    onClick={() => handleChangeOrdered(true)}
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.button}
                    startIcon={<AddShoppingCartIcon />}
                >
                    Add to cart
                </Button>}


                {ordered && <IconButton aria-label="minus one" className={classes.counterButton}  onClick={() => decrement()}>
                    <RemoveIcon fontSize="small" />
                </IconButton>}
                {ordered && count}

                {ordered && <IconButton aria-label="plus one" className={classes.counterButton} onClick={() => increment()}>
                    <AddIcon fontSize="small" />
                </IconButton>}

                {ordered &&
                <IconButton
                    className={classes.deleteIcon}
                    aria-label="delete"
                    onClick={() => handleChangeOrdered(false)}>
                    <RemoveShoppingCartIcon fontSize="small" color="secondary"/>
                </IconButton>}

            </CardActions>

        </Card>);
}
