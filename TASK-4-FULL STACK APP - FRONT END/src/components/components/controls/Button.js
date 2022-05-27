import React from 'react'
import { Button as MuiButton, makeStyles } from "@material-ui/core";
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles(theme => ({

    root: {
        margin: theme.spacing(0.5)
       
    },
    label: {
        textTransform: 'none'
    },
    bttn: {
        backgroundColor:theme.palette.primary
    }
}))

export default function Button(props) {

    const { text, size, color, variant, onClick, ...other } = props
    const classes = useStyles();

    return (
        <MuiButton className={classes.bttn}
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
       
            onClick={onClick}
            {...other}
            classes={{ root: classes.root, label: classes.label }}>
            {text}
        </MuiButton>
    )
}