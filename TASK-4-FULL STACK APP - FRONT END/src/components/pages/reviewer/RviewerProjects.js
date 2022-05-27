import React from 'react';
import { useState } from 'react';
import useDashboard from '../../layout/Dashbord';
import Dashbord from '../../layout/Dashbord';
import useTable from "../../components/useTable";
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import { Menu } from '../../layout/Listitems';
import { Employeelist } from '../../layout/Listitems';
import Controls from "../../components/controls/Controls";
import Typography from '@material-ui/core/Typography';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import * as employeeService from "./Service";
import Popup from "../../components/Popup";
import { FlashOnOutlined } from '@material-ui/icons';
import useFullPageLoader from "../../layout/useFullPageLoader";
import Snackbar from '@material-ui/core/Snackbar';
import { useEffect } from 'react'
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Auth from '../../../Auth';
import clsx from 'clsx';
import { Search } from "@material-ui/icons";
import '../../../App.css'
import *   as  Charts from '../../layout/Appp'
import Grid from '@material-ui/core/Grid';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { Link } from 'react-router-dom';
import { Reviewerlist } from '../../layout/Listitems';
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
        width: '35%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    paper: {
        padding: theme.spacing(2),
        //display: 'flex',
        overflow: 'auto', width: '100%',
        flexDirection: 'column',
        alignItems: 'center'
    },
    fixedHeight: {
        height: '620px',
    },
    heading: {
        float: "left",
        width: "100%",
        height: "35px", flexDirection: 'column',
        backgroundColor: theme.palette.primary.main
    },
    itms: {
        float: "left",
        marginLeft: "-10px"
    },
    iconn: {
        color: theme.palette.primary.text,
        marginTop: '8px'
    },
    iconn1: {
        color: theme.palette.primary.text,
        marginTop: '-7px',
        marginLeft: '-20px'
    },
    iconn2: {
        color: theme.palette.primary.text,
        marginTop: '-7px',
        marginLeft: '-50px'
    },
    iconn5: {
        color: theme.palette.primary.text,
        marginTop: '6px',
        marginLeft: '-50px'
    },
    iconn6: {
        color: theme.palette.primary.text,
        marginTop: '-7px',
        marginLeft: '-180px'
    }
}))
export default function App(props) {

    const [openPopup, setOpenPopup] = useState(false)

    const [recordForEdit, setRecordForEdit] = useState(null)

    const [records, setRecords] = useState([]);

    const [openLoad, setOpenLoad] = useState(false)
    const [taskRecords, setTaskRecords] = useState([]);

    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [snackbaropen, setSnackbaropen] = useState(false);
    const [snackbartype, setSnackbartype] = useState();
    const [snackbarmsg, setSnackbarmsg] = useState();

    const [loader, showLoader, hideLoader] = useFullPageLoader();

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
                    Auth.logout(() => { localStorage.clear(); props.history.push('/') });

                }, 4000)
            }


            showLoader();
            employeeService.GetAllhistoryProjects(setRecords, setOpenLoad, showLoader, hideLoader, setSnackbaropen);

        }

    }, []);



    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting }
        = useTable(records, headCells, filterFn);



    const onClick0 = () => { props.history.push('/ReviewerHome'); };

    const onClick2 = () => { props.history.push('/ReviewerHome/Addemployees'); };
    const onClick3 = () => { props.history.push('/ReviewerHome/Timesheets'); };
    const onClick4 = () => { props.history.push('/ReviewerHome/Projects'); };

    const logingout = () => { props.history.push('/'); }









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
            <Dashbord color="primary"
                loader={loader} logout={(props) => {
                    Auth.logout(() => { localStorage.clear(); logingout(); });

                }
                }
                Menuitems={Reviewerlist(onClick0, onClick2, onClick3, onClick4)}
            >



                <Paper elevation={4} className={fixedHeightPaper}>

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
                                (<TableRow key={item.id}>

                                    <TableCell>{item.nameofservice}</TableCell>
                                    <TableCell>{item.fromdate}</TableCell>
                                    <TableCell>  <div style={{ paddingLeft: "7px", paddingRight: "7px", width: 'fit-content', backgroundColor: item.project_status == "approved" ? "#4caf50" : item.project_status == "in progress" ? "skyblue" : item.project_status == "alloted" ? "yellow" : item.project_status == "pending" ? "orange" : "grey" }}  >     {item.project_status}  </div>             </TableCell>
                                    <TableCell>  <Link to={`/ReviewerHome/Projects/${item.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }} ><DoubleArrowIcon /></Link></TableCell>


                                </TableRow>)
                                )
                            }
                        </TableBody>
                    </TblContainer>
                    <TblPagination />

                </Paper>

            </Dashbord>


        </div>

    );

}


