import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react'
import useDashboard from '../../layout/Dashbord';
import Dashbord from '../../layout/Dashbord';
import useTable from "../../components/useTable";
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import { Menu } from '../../layout/Listitems';
import * as employeeService from "./Service";
import Popup from "../../components/Popup";
import { FlashOnOutlined } from '@material-ui/icons';
import useFullPageLoader from "../../layout/useFullPageLoader";
import Snackbar from '@material-ui/core/Snackbar';
import Auth from '../../../Auth';
import { Search } from "@material-ui/icons";
import clsx from 'clsx';
import { Reviewerlist } from '../../layout/Listitems';
import Chart from '../../pages/manager/ChartTimesheets';
import Grid from '@material-ui/core/Grid';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Deposists from './Deposists';
import Countchart from './CartEmployeecount'
import Timesheetchart from './ChartTimecount'
import Workinghours from './ChartHourscount'



const headCells = [
  { id: 'nameofservice', label: 'Project Name' },
  { id: 'fromdate', label: 'project Start Date', disableSorting: true },
  { id: 'Project_details', label: 'Project Details', disableSorting: false }
]


const tasksheadCells = [
  { id: 'nameofservice', label: 'Nameofservice' },
  { id: 'fromdate', label: 'From-date', disableSorting: FlashOnOutlined },
  { id: 'project_status', label: 'project_status', disableSorting: false }
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
  }, paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  heightt: {
    width: "1000px"
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
    marginLeft: '-35px'
  },
  iconn6: {
    color: theme.palette.primary.text,

    marginTop: '-8px',
    marginLeft: '-140px'
  },

  barpaper: {

  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },

}))
export default function App(props) {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false)
  const [openLoad, setOpenLoad] = useState(false)

  const [recordForEdit, setRecordForEdit] = useState(null)

  const [records, setRecords] = useState([]);

  const [taskRecords, setTaskRecords] = useState([]);

  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })

  const [snackbaropen, setSnackbaropen] = useState(false);
  const [snackbartype, setSnackbartype] = useState();
  const [snackbarmsg, setSnackbarmsg] = useState();

  const [loader, showLoader, hideLoader] = useFullPageLoader();



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





  const onClick0 = () => { };

  const onClick2 = () => { props.history.push('/ReviewerHome/Addemployees'); };
  const onClick3 = () => { props.history.push('/ReviewerHome/Timesheets'); };

  const onClick4 = () => { props.history.push('/ReviewerHome/Projects'); };

  const logingout = () => { props.history.push('/'); }

  const arry = () => ([
    { id: 0, op: "Dashboard", fn: onClick0, iconnum: 3 },
    { id: 1, op: "Add Employees", fn: onClick2, iconnum: 1 },
    { id: 2, op: "Timesheets", fn: onClick3, iconnum: 2 }
  ]);




  const classes1 = useStyles();

  const fixedHeightPaper = clsx(classes1.paper, classes1.fixedHeight);

  return (

    <div>
      <Dashbord color="primary"
        loader={loader}
        logout={(props) => {
          Auth.logout(() => { localStorage.clear(); logingout(); });

        }
        }
        Menuitems={Reviewerlist(onClick0, onClick2, onClick3, onClick4)}
      >


        <Grid container spacing={3} >
          {/* Chart */}
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

          {/* Recent Deposits */}
          <Grid item xs={6} >
            <Paper
              sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}
            >
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

              <Workinghours />
            </Paper>
          </Grid>
          {/* Recent Orders */}


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
            <Paper elevation={3} style={{ minHeight: " 320px", width: "100%" }} className={fixedHeightPaper}>
              <Deposists />
            </Paper>
          </Grid>


        </Grid>

      </Dashbord>



    </div>

  );

}


