import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as employeeService from "./Service";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";

const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]
const useStyles = makeStyles(theme => ({
    root: {
        marginTop: "20px",
        minWidth: '400px',
        minHeight: '250px'
    }
}));
const initialFValues = {
    projectid: '',
    taskname: '',
    duration: 0,

}

export default function TaskForm(props) {
    const { setProjectedit, projectid, addtask, recordForEdit, projectedit } = props
    const classes = useStyles();
    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('taskname' in fieldValues)
            temp.taskname = fieldValues.taskname.length !== 0 ? "" : "This field is required."
        if ('duration' in fieldValues)
            temp.duration = fieldValues.duration.length !== 0 & fieldValues.duration !== 0 ? "" : "This field is required."

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
        e.preventDefault()

        if (validate()) {
            console.log(values);
            addtask(values, resetForm);
        }
    }

    useEffect(() => {

        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    useEffect(() => {

        if (projectedit === true) {
            setProjectedit(false);
        }

    })

    return (
        <Form onSubmit={handleSubmit} className={classes.root} >
            <Grid container direction="column" paddingTop="5px"
                justify="center" spacing={3}
                alignItems="flex-start">


                <Grid container spacing={1} direction="row">
                    <Grid container item xs={6} spacing={7} direction="column">

                        <Grid item xs={4}>
                            <Typography variant="h6" >
                                Taskname:
                    </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" >
                                Duration:
                    </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={6} spacing={3} direction="column">
                        <Grid item xs={12}>
                            <Controls.Input
                                name="taskname"
                                label=" "
                                value={values.taskname}
                                onChange={handleInputChange}
                                error={errors.taskname}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controls.Input
                                label=""
                                name="duration"
                                value={values.duration}
                                onChange={handleInputChange}
                                error={errors.duration}
                            />
                        </Grid>

                    </Grid>
                </Grid>




                <Grid item xs={10}>
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