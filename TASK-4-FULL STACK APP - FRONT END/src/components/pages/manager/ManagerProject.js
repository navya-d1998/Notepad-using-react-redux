import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react'
import Controls from "../../components/controls/Controls";
import useDashboard from '../../layout/Dashbord';
import Dashbord from '../../layout/Dashbord';
import load from '../../layout/Load'
import useTable from "../../components/useTable";
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import { Menu } from '../../layout/Listitems';
import { Managerlist } from '../../layout/Listitems';
import EmployeeForm from "./ProjectForm";
import * as employeeService from "./Service";
import Popup from "../../components/Popup";
import { FlashOnOutlined } from '@material-ui/icons';
import { Search } from "@material-ui/icons";
import CircularProgress from '@material-ui/core/CircularProgress';
import useFullPageLoader from "../../layout/useFullPageLoader";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import MuiAlert from '@material-ui/lab/Alert';
import './Style.css';
import *   as  Charts from '../../layout/Appp'
import Auth from '../../../Auth';
import Grid from '@material-ui/core/Grid';
import useDarkMode from '../../../Mode'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import pic from '../../../resources/images/notfound.png'

const headCells = [
    { id: 'nameofservice', label: 'Project Name' },
    { id: 'fromdate', label: 'From Date', disableSorting: true },
    { id: 'project_status', label: 'Project Status', disableSorting: false },
    { id: 'actions', label: 'Actions', disableSorting: FlashOnOutlined }

]


const useStyles = makeStyles(theme => ({
    pageContent: {


        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {

        width: '35%',

    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }, paper: {
        padding: theme.spacing(2),
        overflow: 'auto', width: '100%',
        flexDirection: 'column',
        alignItems: 'center'
    },
    fixedHeight: {
        height: '620px',
    }, root: {
        flexGrow: 1,
        maxWidth: 500,
    },

}))


export default function App(props) {




    const history = useHistory();

    const [openPopup, setOpenPopup] = useState(false)

    const [openLoad, setOpenLoad] = useState(false)

    const [recordForEdit, setRecordForEdit] = useState(null)

    const [apierror, setApierror] = useState(null);

    const [records, setRecords] = useState([]);

    const classes = useStyles();
    const [spinner, setSpinner] = useState(true);

    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
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
                    Auth.logout(() => { localStorage.clear(); history.push('/') });

                }, 4000)
            }

            employeeService.GetAllProjects(setRecords, setOpenLoad, showLoader, hideLoader, setSnackbaropen);






        }

    }, []);


    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting }
        = useTable(records, headCells, filterFn);



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
    };
    const onClick0 = () => { history.push('/ManagerHome'); };
    const onClick2 = () => { history.push('/ManagerHome/Tasks'); };
    const onClick3 = () => { history.push('/ManagerHome/Timesheets'); };
    const onClick4 = () => { history.push('/ManagerHome/Resubmittedtimesheets'); };
    const logingout = () => { history.push('/'); }
    const onClick5 = () => { };


    const arry = () => ([
        { id: 0, op: "Dashboard", fn: onClick0, iconnum: 3 },
        { id: 1, op: "Create Project", fn: onClick1, iconnum: 1 },
        { id: 2, op: "Add tasks", fn: onClick2, iconnum: 1 },
        { id: 3, op: "Timesheets", fn: onClick3, iconnum: 2 },
        { id: 4, op: "Resubmitted Timesheets", fn: onClick4, iconnum: 2 }

    ]);

    const addOrEdit = (employee, resetForm) => {

        console.log(employee);

        employeeService.addproject(setSnackbaropen, setSnackbartype, setSnackbarmsg, employee);
        employeeService.GetAllProjects(setRecords, setOpenLoad, showLoader, hideLoader);

        resetForm()
        setRecordForEdit(null)

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
    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }



    const [theme, toggleDarkMode] = useDarkMode();

    const themeConfig = createMuiTheme(theme);

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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

            <Dashbord color="primary"
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

                <Paper elevation={4} className={fixedHeightPaper}>

                    {openLoad ? <div className="divv"><h2 >No  Projects </h2>
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
                            <TblContainer    >
                                <TblHead />
                                <TableBody  >
                                    {
                                        recordsAfterPagingAndSorting().map(item =>

                                        (
                                            <TableRow key={item.id}>

                                                <TableCell>  {item.nameofservice} </TableCell>
                                                <TableCell>{item.fromdate}</TableCell>
                                                <TableCell>  <div style={{ paddingLeft: "7px", paddingRight: "7px", width: 'fit-content', backgroundColor: item.project_status == "approved" ? "#4caf50" : item.project_status == "in progress" ? "skyblue" : item.project_status == "alloted" ? "yellow" : item.project_status == "pending" ? "orange" : "grey" }}  >     {item.project_status}  </div>             </TableCell>
                                                <TableCell>  <Link to={`/ManagerHome/Projects/${item.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }} ><DoubleArrowIcon /></Link></TableCell>

                                            </TableRow>

                                        )
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


