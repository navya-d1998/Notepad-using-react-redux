import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as employeeService from "./Service";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    root: {
        minWidth: '400px',
        minHeight: '250px'
    }
}));
const statusoptions = [
    { id: 'manager accepted', title: 'Accept' },
    { id: 'manager rejected', title: 'Reject' },
    { id: 'manager reviewed', title: 'Resubmit' },
]


export default function EmployeeForm(props) {

    const { timesheetid, changestate, setChangestate, addOrEdit, recordForEdit, timesheethours } = props
    const classes = useStyles();

    const initialFValues = {
        timesheetid: 0,

        hours: timesheethours,

        description: ''


    }
    const validate = (fieldValues = values) => {
        let temp = { ...errors }


        if ('hours' in fieldValues)
            temp.hours = fieldValues.hours > 0 ? "" : "This field is required."

        if ('description' in fieldValues)
            temp.description = fieldValues.description.length !== 0 ? "" : "This field is required."


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
        if (changestate === true)
            if (values.status === 'manager reviewed') {
                setValues.flag = 1;
            }
        setChangestate(false);

    })

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit} className={classes.root} >
            <Grid container direction="column"
                justify="flex-start" spacing={1}
                alignItems="flex-start">



                <Grid container spacing={1} direction="row">
                    <Grid container item xs={6} spacing={7} direction="column">

                        <Grid item xs={4}>
                            <Typography variant="h6" >
                                Hours:
                    </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" >
                                Description:
                    </Typography>
                        </Grid>
                    </Grid>

                    <Grid container item xs={8} spacing={3} direction="column">
                        <Grid item xs={10}>
                            <Controls.Input
                                label=""
                                name="hours"
                                value={values.hours}
                                onChange={handleInputChange}
                                error={errors.hours}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-multiline-static"
                                label=""
                                name="description"
                                multiline
                                rows={4}
                                value={values.description}
                                onChange={handleInputChange}
                                error={errors.description}
                                defaultValue={values.description}
                                variant="outlined"
                            />
                        </Grid>

                    </Grid>


                </Grid>
                <Grid item xs={12}>
                    <div style={{ marginTop: "10px" }}>
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