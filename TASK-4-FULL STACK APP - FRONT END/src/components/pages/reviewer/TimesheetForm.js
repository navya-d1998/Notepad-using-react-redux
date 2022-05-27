import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as employeeService from "./Service";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";



const useStyles = makeStyles(theme => ({
    root: {
        marginTop: "25px",
        minWidth: '400px',
        minHeight: '250px'
    }
}));
const statusoptions = [
    { id: 'reviewer accepted', title: 'Accept' },
    { id: 'reviewer rejected', title: 'Reject' }
]

const initialFValues = {

    status: 'reviewer accepted',

    comments: '',

    flag: 0,

}

export default function EmployeeForm(props) {

    const { changestate, setChangestate, addOrEdit, recordForEdit } = props
    const classes = useStyles();
    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('status' in fieldValues)
            temp.status = fieldValues.status.length !== 0 ? "" : "This field is required."

        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        setChangestate(true);
        e.preventDefault()
        if (validate()) {

            addOrEdit(values, resetForm);

        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit} className={classes.root}>
            <Grid container direction="column"
                justify="center" spacing={3}
                alignItems="flex-start">

                <Grid container spacing={1} direction="row">
                    <Grid container item xs={6} spacing={7} direction="column">

                        <Grid item xs={4}>
                            <Typography variant="h6" >
                                Status:
                    </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" >
                                Comments:
                    </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={8} spacing={3} direction="column">
                        <Grid item xs={10}>
                            <Controls.Select
                                name="status"
                                value={values.status}
                                onChange={handleInputChange}
                                options={statusoptions}
                                error={errors.status}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controls.Input
                                label=""
                                name="comments"
                                value={values.comments}
                                onChange={handleInputChange}

                            />
                        </Grid>

                    </Grid>

                </Grid>


                <Grid item xs={6}>

                    <div style={{ marginTop: "15px" }}>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}