import React from 'react';
import { useState } from 'react';
import Dashbord from '../../layout/Dashbord';
import useTable from "../../components/useTable";
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import { Menu } from '../../layout/Listitems';
import EmployeeForm from "./ProjectForm";
import TimesheeteditForm from "./TimesheetForm";
import * as employeeService from "./Service";
import Popup from "../../components/Popup";
import { FlashOnOutlined } from '@material-ui/icons';
import Controls from "../../components/controls/Controls";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useEffect } from 'react'
import useFullPageLoader from "../../layout/useFullPageLoader";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import Auth from '../../../Auth';
import { Search } from "@material-ui/icons";
import { Managerlist } from '../../layout/Listitems';
import clsx from 'clsx';
import useDarkMode from '../../../Mode';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';
import '../../../App.css'
import pic from '../../../resources/images/notfound.png'
const tasksheadCells = [
    { id: 'employeename', label: 'Employee Name' },
    { id: 'projecttname', label: 'Project name' },
    { id: 'taskname', label: 'Taskname' },
    { id: 'date', label: 'Date' },
    { id: 'hours', label: 'Hours' },
    { id: 'description', label: 'Description' },
    { id: 'comments_reviwer', label: 'Reviwer comments' },
    //   { id: 'status', label: 'status' },
    { id: 'actions', label: 'Actions', disableSorting: FlashOnOutlined }
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


    const history = useHistory();

    const classes = useStyles();

    const [openPopup, setOpenPopup] = useState(false)
    const [openPopup1, setOpenPopup1] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [projecttName, setProjectName] = useState(null);
    const [records, setRecords] = useState([]);
    const [changestate, setChangestate] = useState(false);
    const [projectId, setProjectId] = useState(null);
    const [timesheetid, setTimesheetid] = useState(null);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openLoad, setOpenLoad] = useState(false)
    const [snackbaropen, setSnackbaropen] = useState(false);
    const [snackbartype, setSnackbartype] = useState();
    const [snackbarmsg, setSnackbarmsg] = useState();

    const [loader, showLoader, hideLoader] = useFullPageLoader();
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
                setTimeout(() => {
                    Auth.logout(() => { localStorage.clear(); history.push('/') });

                }, 4000)
            }

            showLoader();
            var token = localStorage.getItem('token');

            axios.get('https://localhost:44336/api/managerlogin/viewtimesheets', { headers: { "Authorization": `Bearer ${token}` } }
            )
                .then(response => {

                    setRecords(response.data);

                    hideLoader();

                })
                .catch(error => {

                    hideLoader();

                    if (error.response.status === 500) {
                        setSnackbaropen(true);
                        setSnackbartype('error');
                        setSnackbarmsg("Something went wrong.");
                    }

                    if (error.response.status === 404) {
                        setOpenLoad(true);

                        setSnackbaropen(true);
                        setSnackbartype('info');
                        setSnackbarmsg("No records found.");
                    }
                    console.log('error', error.response.status);
                });
        }

    }, []);



    const onClick0 = () => { history.push('/ManagerHome'); };
    const onClick1 = () => {


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
                    Auth.logout(() => { localStorage.clear(); history.push('/') });

                }, 4000)
            }
            else {

                setOpenPopup(true); setRecordForEdit(null);
            }
        }
    }
    const onClick2 = () => { history.push('/ManagerHome/Tasks'); };
    const onClick3 = () => { };
    const onClick4 = () => { history.push('/ManagerHome/Resubmittedtimesheets'); };
    const logingout = () => { history.push('/'); }
    const onClick5 = () => { history.push('/ManagerHome/Projects'); };

    const arry = () => ([
        { id: 0, op: "Dashboard", fn: onClick0, iconnum: 3 },
        { id: 1, op: "Create Project", fn: onClick1, iconnum: 1 },
        { id: 2, op: "Add tasks", fn: onClick2, iconnum: 1 },
        { id: 3, op: " Timesheets", fn: onClick3, iconnum: 2 },
        { id: 4, op: "Resubmitted Timesheets", fn: onClick4, iconnum: 2 }

    ]);

    const edittimesheet = (employee, resetForm) => {

        if (employee.status === 'manager reviewed') {
            employee.flag = 1;
        }
        console.log(timesheetid);

        try {
            employeeService.edittimesheet(setSnackbaropen, setSnackbartype, setSnackbarmsg, employee, timesheetid);


            resetForm()
            setRecordForEdit(null)
        }
        catch (e) {
            setSnackbaropen(true);
            setSnackbartype('error');
            setSnackbarmsg("Something went wrong.");
        }

    }


    const addOrEdit = (employee, resetForm) => {

        employeeService.addproject(setSnackbaropen, setSnackbartype, setSnackbarmsg, employee);
        employeeService.GetAllProjects(setRecords, setOpenLoad, showLoader, hideLoader);

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

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.nameofservice.toLowerCase().includes(target.value))
            }
        })
    }


    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [theme, toggleDarkMode] = useDarkMode();

    const themeConfig = createMuiTheme(theme);
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
                Menuitems={Managerlist(onClick0, onClick1, onClick2, onClick3, onClick4, onClick5)}
            >

                <Popup
                    title="Project Form"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup} >

                    <EmployeeForm
                        recordForEdit={recordForEdit}
                        addOrEdit={addOrEdit} />

                </Popup>

                <Popup
                    title="Review Timesheet"
                    openPopup={openPopup1}
                    setOpenPopup={setOpenPopup1} >

                    <TimesheeteditForm
                        timesheetid={timesheetid}
                        setChangestate={setChangestate} recordForEdit={recordForEdit}
                        changestate={changestate}

                        addOrEdit={edittimesheet} />

                </Popup>
                <Paper elevation={4} className={fixedHeightPaper} alignItems='center' >

                    {openLoad ? <div className="divv"><h2 >No  Pending  Timesheets </h2>
                        <img style={{ height: "38vh" }} src={pic} alt="No Content Found" />

                    </div> :

                        <div>

                            <Toolbar>
                                <Controls.Input
                                    label="Search Projects"
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

                                            <TableCell>{item.employeename}</TableCell>
                                            <TableCell>{item.projecttname}</TableCell>
                                            <TableCell>{item.taskname}</TableCell>
                                            <TableCell>{item.date}</TableCell>
                                            <TableCell>{item.hours}</TableCell>
                                            <TableCell>{item.description}</TableCell>
                                            <TableCell>{item.comments_reviwer}</TableCell>

                                            <TableCell>
                                                <Controls.ActionButton
                                                    color="primary"
                                                    onClick={() => { openInPopup(item) }}>
                                                    <EditOutlinedIcon fontSize="small" />
                                                </Controls.ActionButton>
                                            </TableCell>

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

