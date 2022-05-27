import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as employeeService from "./Service";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]

const selectWidth = 150;
const useStyles = makeStyles(theme => ({
    root: {
        minWidth: '300px',
        maxWidth: "600px",
        minHeight: '400px'
    }
}));

const useMenuItemStyles = makeStyles(theme => ({
    menuItem: {
        width: selectWidth
    }
}));
const initialFValues = {
    nameofservice: '',
    fromdate: new Date(),
    todate: new Date(),
    reviewr_id: 'id',
    manager_id: 'id',
    project_status: 'not alloted',
    Project_details: ''
}

export default function EmployeeForm(props) {
    const { addOrEdit, recordForEdit } = props

    const [reviewers, setReviewers] = useState([]);
    const classes = useStyles();

    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('nameofservice' in fieldValues)
            temp.nameofservice = fieldValues.nameofservice.length !== 0 ? "" : "This field is required."
        if ('fromdate' in fieldValues)
            temp.fromdate = fieldValues.fromdate ? "" : "This field is required."
        if ('todate' in fieldValues)
            temp.todate = fieldValues.todate ? "" : "This field is required."
        if ('reviewr_id' in fieldValues)
            temp.reviewr_id = fieldValues.reviewr_id ? "" : "This field is required."
        if ('manager_id' in fieldValues)
            temp.manager_id = fieldValues.manager_id ? "" : "This field is required."
        if ('Project_details' in fieldValues)
            temp.Project_details = fieldValues.Project_details ? "" : "This field is required."


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
        console.log(values);
        if (validate()) {


            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {

        employeeService.GetAllReviewers(setReviewers);

        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit} className={classes.root} >


            <Grid container spacing={0} direction="row">
                <Grid container item xs={6} spacing={3} direction="row">
                    <Grid item xs={6}>
                        <Typography variant="h6" >Project Name : </Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant="h6" >Reviewer : </Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant="h6" >From Date : </Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant="h6" >Project Details : </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={6} spacing={3} direction="row">
                    <Grid item xs={10}>
                        <Controls.Input
                            name="nameofservice"
                            label=" "
                            value={values.nameofservice}
                            onChange={handleInputChange}
                            error={errors.nameofservice}
                        />
                    </Grid>
                    <Grid item xs={7}>
                        <Controls.Select
                            name="reviewr_id"
                            label=""
                            value={values.reviewr_id}
                            onChange={handleInputChange}
                            options={reviewers}
                            error={errors.reviewr_id}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Controls.DatePicker
                            name="fromdate"
                            label=""
                            value={values.fromdate}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Controls.Input
                            label=""
                            name="Project_details"
                            value={values.Project_details}
                            onChange={handleInputChange}
                            error={errors.Project_details}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <div style={{ marginTop: "15px" }}>
                <Controls.Button
                    type="submit"
                    text="Submit" />
                <Controls.Button
                    text="Reset"
                    color="default"
                    onClick={resetForm} />
            </div>
        </Form >
    )
}