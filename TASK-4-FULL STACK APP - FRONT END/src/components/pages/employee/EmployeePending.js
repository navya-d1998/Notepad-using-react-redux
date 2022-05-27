import React from 'react';
import { useState } from 'react';
import Dashbord from '../../layout/Dashbord';
import useTable from "../../components/useTable";
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import { Menu } from '../../layout/Listitems';
import TimesheeteditForm from "./TimesheetForm";
import * as employeeService from "./Service";
import Popup from "../../components/Popup";
import { FlashOnOutlined } from '@material-ui/icons';
import Controls from "../../components/controls/Controls";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useFullPageLoader from "../../layout/useFullPageLoader";
import Snackbar from '@material-ui/core/Snackbar';
import { useEffect } from 'react'
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import Auth from '../../../Auth';
import clsx from 'clsx';
import { Employeelist } from '../../layout/Listitems';
import { Search } from "@material-ui/icons";
import '../../../App.css'
import pic from '../../../resources/images/notfound.png'
const tasksheadCells = [
    { id: 'projecttname', label: 'Project Name' },
    { id: 'taskname', label: 'Task Name' },
    { id: 'date', label: 'Date' },
    { id: 'hours', label: 'Hours' },
    { id: 'description', label: 'Description' },
    { id: 'status', label: 'Status' },
]


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '35%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    paper: {
        padding: theme.spacing(2),
        overflow: 'auto', width: '100%',
        flexDirection: 'column',
        alignItems: 'center'
    },
    fixedHeight: {
        height: '620px',
    }
}))
export default function Task(props) {

    const [openPopup, setOpenPopup] = useState(false)
    const [openPopup1, setOpenPopup1] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [projecttName, setProjectName] = useState(null);

    const [records, setRecords] = useState([]);

    const [changestate, setChangestate] = useState(false);
    const [projectId, setProjectId] = useState(null);

    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })

    const [timesheetid, setTimesheetid] = useState(null);
    const [snackbaropen, setSnackbaropen] = useState(false);
    const [snackbartype, setSnackbartype] = useState();
    const [snackbarmsg, setSnackbarmsg] = useState();
    const [openLoad, setOpenLoad] = useState(false)

    const [loader, showLoader, hideLoader] = useFullPageLoader();

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.projecttname.toLowerCase().includes(target.value))
            }
        })
    }
    const snackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbaropen(false);

    };


    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting }
        = useTable(records, tasksheadCells, filterFn);


    useEffect(() => {
        if (localStorage.getItem('expires')) {

            var expdate = localStorage.getItem('expires');

            var expiredate = new Date(expdate);

            var today = new Date();
            console.log(expiredate);
            console.log(today);

            if (expiredate.getTime() < today.getTime()) {
                setSnackbaropen(true);
                setSnackbartype('warning');
                setSnackbarmsg("Your session has expired.");
                showLoader();
                setTimeout(() => {
                    Auth.logout(() => { localStorage.clear(); props.history.push('/') });

                }, 4000)
            }

            showLoader();
            var token = localStorage.getItem('token');

            axios.get('https://localhost:44336/api/employeelogin/pendingtimesheets', { headers: { "Authorization": `Bearer ${token}` } }).then(response => {

                setRecords(response.data);

                hideLoader();

            })
                .catch(error => {

                    hideLoader();
                    console.log(error);
                    hideLoader();

                    if (error.response.status === 404) {

                        console.log("gg")
                        setSnackbaropen(true);
                        setSnackbartype('info');
                        setSnackbarmsg("No records found.");

                        setOpenLoad(true);

                    }


                })

        }

    }, []);


    const onClick0 = () => { props.history.push('/EmployeeHome'); };
    const onClick1 = () => { props.history.push('/EmployeeHome/Todays_Timesheets'); };
    const onClick2 = () => { props.history.push('/EmployeeHome/History_Timesheets'); };
    const onClick3 = () => { };
    const onClick4 = () => { props.history.push('/EmployeeHome/Timesheets_To_Resubmit'); };
    const logingout = () => { props.history.push('/'); }
    const onClick5 = () => { props.history.push('/EmployeeHome/Projects'); };

    const arry = () => ([
        { id: 0, op: "Dashboard", fn: onClick0, iconnum: 3 },
        { id: 1, op: "Todays Timesheets", fn: onClick1, iconnum: 2 },
        { id: 2, op: " Timesheets History", fn: onClick2, iconnum: 2 },
        { id: 3, op: "Pending Timesheets", fn: onClick3, iconnum: 2 },
        { id: 4, op: " Timesheets To Resubmit", fn: onClick4, iconnum: 2 }

    ]);


    const addOrEdit = (employee, resetForm) => {

        if (employee.status === 'manager reviewed') {
            employee.flag = 1;
        }
        console.log(employee);

        if (employee.id === 0)
            employeeService.insertEmployee(employee)
        else
            employeeService.updateEmployee(employee)
        resetForm()
        setRecordForEdit(null)
    }

    const openInPopup = (item) => {


        setOpenPopup1(true);
        setRecordForEdit(null);

        setTimesheetid(item.id);

    }



    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (

        <div>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snackbaropen}
                autoHideDuration={6000}
                onClose={snackbarClose}
                message={<span id="message-id">{snackbarmsg}</span>}
                action={[
                    <IconButton
                        key="close"
                        arial-label="close"
                        color="#FFFFFF"
                        onClick={snackbarClose}>
                    </IconButton>
                ]}
            >
                <MuiAlert autoHideDuration={6000} elevation={6} variant="filled" onClose={snackbarClose} severity={snackbartype}>
                    {snackbarmsg}
                </MuiAlert>
            </Snackbar>
            <Dashbord key="hh" color="primary"
                loader={loader} logout={(props) => {
                    Auth.logout(() => { localStorage.clear(); logingout(); });

                }
                }
                Menuitems={Employeelist(onClick0, onClick1, onClick2, onClick3, onClick4, onClick5)}
            >



                <Popup
                    title="Review Timesheet"
                    openPopup={openPopup1}
                    setOpenPopup={setOpenPopup1} >

                    <TimesheeteditForm
                        timesheetid={timesheetid}
                        setChangestate={setChangestate} recordForEdit={recordForEdit}
                        changestate={changestate}

                        addOrEdit={addOrEdit} />



                </Popup>
                <Paper elevation={4} className={fixedHeightPaper}>

                    {openLoad ? <div className="divv"><h2>No pending timesheets </h2>
                        <img style={{ height: "38vh" }} src={pic} alt="No Content Found" />
                    </div> :

                        <div>
                            <Toolbar>
                                <Controls.Input
                                    label="Search Timesheets"
                                    className={classes.searchInput}
                                    InputProps={{
                                        startAdornment: (<InputAdornment className="search" position="start">
                                            <Search />
                                        </InputAdornment>)
                                    }}
                                    onChange={handleSearch}
                                />
                            </Toolbar>

                            <TblContainer >
                                <TblHead />
                                <TableBody >
                                    {
                                        recordsAfterPagingAndSorting().map(item =>
                                        (<TableRow key={item.id}>

                                            <TableCell>{item.projecttname}</TableCell>
                                            <TableCell>{item.taskname}</TableCell>
                                            <TableCell>{item.date}</TableCell>
                                            <TableCell>{item.hours}</TableCell>
                                            <TableCell>{item.description}</TableCell>
                                            <TableCell>{item.status}</TableCell>


                                        </TableRow>)
                                        )
                                    }
                                </TableBody>
                            </TblContainer>
                            <TblPagination />
                        </div>

                    }

                </Paper>

            </Dashbord>


        </div>

    );

}

