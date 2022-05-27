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
import EmployeeForm from "./Form";
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
import ScheduleIcon from '@material-ui/icons/Schedule';
import axios from 'axios';
import Countchart from './ChartEmployeecount'
import Timesheetchart from './ChartTimesheets'
import Workinghours from './ChartWorkinghours';
import clsx from 'clsx';
import Deposists from './Deposists';



const headCells = [
  { id: 'nameofservice', label: 'Nameofservice' },
  { id: 'fromdate', label: 'From-date', disableSorting: true },
  { id: 'Project_details', label: 'Project_details', disableSorting: false }
]










const useStyles = makeStyles(theme => ({
  pageContent: {


    margin: theme.spacing(5),
    padding: theme.spacing(3)
  },
  searchInput: {
    float: 'right',
    marginLeft: '60%',
    width: '55%',

  },
  newButton: {
    position: 'absolute',
    right: '10px'
  }, heading: {
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
    marginLeft: '-35px'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  iconn6: {
    color: theme.palette.primary.text,

    marginTop: '-8px',
    marginLeft: '-140px'
  }
}))


export default function App(props) {




  const history = useHistory();


  const [projects, setProjects] = useState([]);


  const [hours, setHours] = useState([]);

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

      showLoader();
      var token = localStorage.getItem('token');

      axios.get('https://localhost:44336/api/managerlogin/projecthours', { headers: { "Authorization": `Bearer ${token}` } }
      )
        .then(response => {

          setProjects(response.data.names);
          setHours(response.data.hours);
          console.log(response.data);

          hideLoader();


        })
        .catch(error => {

          hideLoader();

          console.log('error', error);
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

        });
    }
  }, []);


  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting }
    = useTable(records, headCells, filterFn);



  const onClick0 = () => {

  };
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
  const onClick3 = () => { history.push('/ManagerHome/Timesheets'); };
  const onClick4 = () => { history.push('/ManagerHome/Resubmittedtimesheets'); };
  const onClick5 = () => { history.push('/ManagerHome/Projects'); };

  const logingout = () => { history.push('/'); }

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

  const openInPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true)
  }



  const [theme, toggleDarkMode] = useDarkMode();

  const themeConfig = createMuiTheme(theme);

  const classes1 = useStyles();

  const fixedHeightPaper = clsx(classes1.paper, classes1.fixedHeight);


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

        <Grid container spacing={3}>

          <Grid item xs={6}  >
            <div className={classes.heading}>
              <Grid container xs={6} spacng={1} direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >

                <Grid container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                  spacing={0}
                >

                  <Grid item xs={3} className={classes.iconn} >    <ScheduleIcon /></Grid>
                  <Grid item xs={9} className={classes.iconn1} >   <h3> Project Status </h3></Grid>
                </Grid>
              </Grid>
            </div>
            <Paper
              sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 100, }}
            >

              < Workinghours />
            </Paper>
          </Grid>

          <Grid item xs={6} >
            <div className={classes.heading}>
              <Grid container xs={6} spacng={1} direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >

                <Grid container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                  spacing={0}
                >

                  <Grid item xs={3} className={classes.iconn} >    <ScheduleIcon /></Grid>
                  <Grid item xs={9} className={classes.iconn2} >   <h3> Timesheet Count </h3></Grid>
                </Grid>
              </Grid>
            </div>

            <Paper
              sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}
            >
              <Timesheetchart />
            </Paper>
          </Grid>

          <Grid item xs={6} >
            <div className={classes.heading}>
              <Grid container xs={6} spacng={1} direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >

                <Grid container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                  spacing={0}
                >

                  <Grid item xs={3} className={classes.iconn} >    <ScheduleIcon /></Grid>
                  <Grid item xs={9} className={classes.iconn1} >   <h3> Employee In Projects</h3></Grid>
                </Grid>
              </Grid>
            </div>
            <Paper
              sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240, }}
            >

              <Countchart />
            </Paper>
          </Grid>

          <Grid item xs={6} style={{ padding: "13px 0px", top: '5px', position: "relative", zIndex: "-1" }}>
            <Paper elevation={3} className={fixedHeightPaper} style={{ minHeight: " 290px", width: "100%" }}>
              <Deposists />
            </Paper>
          </Grid>

        </Grid>


      </Dashbord>

    </div>

  );

}


