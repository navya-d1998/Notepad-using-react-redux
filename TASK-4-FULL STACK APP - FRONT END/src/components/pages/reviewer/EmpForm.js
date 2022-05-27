import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as employeeService from "./Service";
import '../../../App.css'
import { makeStyles } from '@material-ui/core/styles';
import { Search } from "@material-ui/icons";
import Typography from '@material-ui/core/Typography';



const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]

const initialFValues = {
    projectid: '',
    employeeid: ''

}
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "25px",
        minWidth: '400px',
        minHeight: '290px',

    },


    dropdown: {
        marginTop: "10vh"

        // float:"right"
    },
    floting: {
        float: "left", marginTop: "-20vh"
    },
    floting1: {
        marginTop: "20vh"
    },

    floting0: {
        marginTop: "-8vh",
        marginLeft: "14vh"
    },
    floting3: {
        marginTop: "5vh"
    },
    submit: {
        backgroundColor: "#80cbc4",
    },
}));
export default function TaskForm(props) {

    const { setProjectedit, projectid, addOrEdit, recordForEdit, projectedit } = props

    const [employees, setEmployees] = useState([]);
    const [reviewers, setReviewers] = useState([]);

    const classes = useStyles();

    useEffect(() => {

        employeeService.GetAllEmployees(setReviewers);


    }, [])

    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('employeeid' in fieldValues)
            temp.employeeid = fieldValues.employeeid.length !== 0 ? "" : "This field is required."

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
            addOrEdit(values, resetForm);
        }
    }


    return (
        <Form onSubmit={handleSubmit} className={classes.root}  >
            <Grid container direction="column" paddingTop="5px"
                justify="center" spacing={3}
                alignItems="flex-start">

                <Grid container spacing={1} direction="row">
                    <Grid item xs={3}>
                        <Typography variant="h6" >
                            Employee:
              </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Controls.Select className={classes.floting1}
                            name="employeeid"


                            value={values.employeeid}
                            onChange={handleInputChange}
                            options={reviewers}
                            error={errors.employeeid}
                        />
                    </Grid>
                    <div style={{ marginTop: "10px" }}>
                        <Controls.Button
                            type="submit"
                            color="Primary"
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