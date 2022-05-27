import React from 'react';
import { useState } from 'react';
import { useParams } from 'react';
import { useEffect } from 'react'
import Controls from "../../components/controls/Controls";
import useDashboard from '../../layout/Dashbord';
import Dashbord from '../../layout/Dashbord';
import load from '../../layout/Load'
import useTable from "../../components/useTable";
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Typography } from '@material-ui/core';
import { Menu } from '../../layout/Listitems';
import { Managerlist } from '../../layout/Listitems';

import * as employeeService from "./Service";
import Popup from "../../components/Popup";
import { FlashOnOutlined } from '@material-ui/icons';
import { Search } from "@material-ui/icons";
import CircularProgress from '@material-ui/core/CircularProgress';
import useFullPageLoader from "../../layout/useFullPageLoader";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import MuiAlert from '@material-ui/lab/Alert';

import *   as  Charts from '../../layout/Appp'
import Auth from '../../../Auth';
import Grid from '@material-ui/core/Grid';
import useDarkMode from '../../../Mode'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import TimerIcon from '@material-ui/icons/Timer';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import axios from 'axios';
import PauseIcon from '@material-ui/icons/Pause';

import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

import ClearIcon from '@material-ui/icons/Clear';
import { Employeelist } from '../../layout/Listitems';



const defaultProps = {
  paddingRight: "1rem",
  marginLeft: "5rem",
  marginTop: "2rem",
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  m: 1,
  border: 1,
  style: { width: '22rem', height: '20rem' },

};

const headCells = [
  { id: 'taskname', label: 'Task Name' },
  { id: 'duration', label: 'Duration', disableSorting: true }
]


export default function App(props) {



  const history = useHistory();

  const [openPopup, setOpenPopup] = useState(false)

  const [openLoad, setOpenLoad] = useState(true)

  const [recordForEdit, setRecordForEdit] = useState(null)

  const [apierror, setApierror] = useState(null);

  const [records, setRecords] = useState([]);


  const [tasks, setTasks] = useState([]);

  const [projectdetails, setProjectdetails] = useState([]);


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
    },
    table1: {
      marginLeft: "5px",
      float: "right"
    },
    paper: {
      padding: theme.spacing(2),
      overflow: 'auto', width: '100%',
      flexDirection: 'column',
      alignItems: 'center'
    },
    fixedHeight: {
      height: '700px',
    },
    heading: {

      marginTop: "5px",

    },
    paper1: {
      font: "20px",
      flexDirection: 'column',
    }, paper22: {
      marginLeft: "25%",
      marginTop: "15px",
      width: "1000px"
    },
    width2: {
      marginTop: "40px",
      marginLeft: "5px",
      width: '30%',
    },
    days: {
      marginLeft: "-18%",
      fontWeight: "2"
    },
    sheets: {
      marginLeft: "-2%",
      fontWeight: "2"
    },
    width22: {
      marginTop: "10px",
      fontSize: "50px",
      fontFamily: "primary",
      marginLeft: "-2rem"
    },

    buttns: {
      marginTop: "40px",
    },
    papertimeline: {
      padding: '6px 16px',
    },
    secondaryTail1: {
      backgroundColor: projectdetails.projectstatus != "alloted" ? "#E91E63" : "default"
    },

    secondaryTail2: {
      backgroundColor: projectdetails.projectstatus != "alloted" && projectdetails.projectstatus != "in progress" ? "#E91E63" : "default"
    },
    secondaryTail3: {
      backgroundColor: projectdetails.projectstatus == "approved" ? "#E91E63" : "default"
    },


  }))


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


    console.log
      (props.match.params.id);

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

      employeeService.GetProjectdetails(props.match.params.id, setProjectdetails, setOpenLoad, showLoader, hideLoader, setSnackbaropen, history);

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

        axios.get('https://localhost:44336/api/managerlogin/projectdetails/' + props.match.params.id, { headers: { "Authorization": `Bearer ${token}` } }
        )
          .then(projectss => {

            console.log(projectss.data);

            setProjectdetails(projectss.data);
            console.log(projectss.data);

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
              history.push('/404');
              setOpenLoad(true);
              setSnackbaropen(true);
              setSnackbartype('info');
              setSnackbarmsg("No records found.");
            }

          });

      }
    }

  }, []);


  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting }
    = useTable(tasks, headCells, filterFn);


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
  const onClick11 = () => { props.history.push('/EmployeeHome/Todays_Timesheets'); };

  const onClick0 = () => { history.push('/ManagerHome'); };
  const onClick2 = () => { history.push('/ManagerHome/Tasks'); };
  const onClick3 = () => { history.push('/ManagerHome/Timesheets'); };
  const onClick4 = () => { history.push('/ManagerHome/Resubmittedtimesheets'); };
  const logingout = () => { history.push('/'); }
  const onClick5 = () => { history.push('/ManagerHome/Projects'); };


  const arry = () => ([
    { id: 0, op: "Dashboard", fn: onClick0, iconnum: 3 },
    { id: 1, op: "Create Project", fn: onClick1, iconnum: 1 },
    { id: 2, op: "Add tasks", fn: onClick2, iconnum: 1 },
    { id: 3, op: "Timesheets", fn: onClick3, iconnum: 2 },
    { id: 4, op: "Resubmitted Timesheets", fn: onClick4, iconnum: 2 }

  ]);

  const addOrEdit = (employee, resetForm) => {


    console.log(employee);



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
        Menuitems={Employeelist(onClick0, onClick11, onClick2, onClick3, onClick4, onClick5)}
      >






        <Paper elevation={4} className={fixedHeightPaper} alignItems='center' >
          <Typography variant="h5" component="h5" className={classes.paper1}> Project Name: {projectdetails.nameofservice}</Typography>

          <Timeline align="alternate">
            <TimelineItem>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">

                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator >
                <TimelineDot color="Primary">
                  <ClearIcon />
                </TimelineDot>
                <TimelineConnector className={classes.secondaryTail1} backgroundColor={projectdetails.projectstatus !== "alloted" ? "#E91E63" : "default"} />
              </TimelineSeparator>
              <TimelineContent>
                {projectdetails.projectstatus == "alloted" ?

                  <Box p={1} style={{ border: `2px solid #2391a1` }}>
                    <Paper elevation={0} className={classes.papertimeline}>

                      <Typography variant="h5" component="h1">
                        Not Started
            </Typography>
                      <Typography variant="h6" component="h1" style={{ color: "Primary" }} >Starting Date :{projectdetails.fromdate} </Typography>
                    </Paper>
                  </Box>

                  : <Paper elevation={3} className={classes.papertimeline}>

                    <Typography variant="h5" component="h1">
                      Started
        </Typography>
                    <Typography variant="h6" component="h1" style={{ color: "Primary" }} >Started On :{projectdetails.fromdate}</Typography>
                  </Paper>
                }


              </TimelineContent>
            </TimelineItem>



            <TimelineItem>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">

                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color={projectdetails.projectstatus !== "alloted" ? "Primary" : "default"}>
                  <AccessAlarmsIcon />
                </TimelineDot>
                <TimelineConnector className={classes.secondaryTail2} />
              </TimelineSeparator>

              <TimelineContent>
                {projectdetails.projectstatus == "in progress" ?

                  <Box p={1} style={{ border: `2px solid #2391a1` }}>
                    <Paper elevation={0} className={classes.papertimeline}>

                      <Typography variant="h5" component="h1">
                        In Progress
            </Typography>

                      <Typography variant="h6" component="h3">Days Left: {projectdetails.daysleft}</Typography>
                      <Typography variant="h6" component="h3">Approved Timesheets: {projectdetails.acceptedcount}</Typography>
                      <Typography variant="h6" component="h3">Rejected Timesheets: {projectdetails.rejectedcount}</Typography>
                      <Typography variant="h6" component="h3">Pending Timesheets: {projectdetails.pendingcount}</Typography>
                    </Paper>
                  </Box>

                  : <Paper elevation={3} className={classes.papertimeline}>

                    <Typography variant="h5" component="h1">
                      In Progress
        </Typography>
                  </Paper>
                }


              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color={projectdetails.projectstatus !== "in progress" && projectdetails.projectstatus !== "alloted" ? "Primary" : "default"}>
                  <PauseIcon />
                </TimelineDot>
                <TimelineConnector className={classes.secondaryTail3} />
              </TimelineSeparator>
              <TimelineContent>

                {projectdetails.projectstatus == "pending" ?

                  <Box p={1} style={{ border: `2px solid #2391a1` }}>
                    <Paper elevation={0} className={classes.papertimeline}>

                      <Typography variant="h5" component="h1">
                        Pending
            </Typography>

                      <Typography variant="h6" component="h3">Days Left: {projectdetails.daysleft}</Typography>
                      <Typography variant="h6" component="h3">Approved Timesheets: {projectdetails.acceptedcount}</Typography>
                      <Typography variant="h6" component="h3">Rejected Timesheets: {projectdetails.rejectedcount}</Typography>
                      <Typography variant="h6" component="h3">Pending Timesheets: {projectdetails.pendingcount}</Typography>
                    </Paper>
                  </Box>

                  : <Paper elevation={3} className={classes.papertimeline}>

                    <Typography variant="h5" component="h1">
                      Pending
        </Typography>
                  </Paper>
                }

              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color={projectdetails.projectstatus === "approved" ? "Primary" : "default"}>
                  <DoneOutlineIcon />
                </TimelineDot>
              </TimelineSeparator>
              <TimelineContent>
                {projectdetails.projectstatus == "approved" ?

                  <Box p={1} style={{ border: `2px solid #2391a1` }}>
                    <Paper elevation={0} className={classes.papertimeline}>

                      <Typography variant="h5" component="h1">
                        Approved
            </Typography>

                      <Typography variant="h6" component="h3">Approved Timesheets: {projectdetails.acceptedcount}</Typography>
                      <Typography variant="h6" component="h3">Rejected Timesheets: {projectdetails.rejectedcount}</Typography>
                      <Typography variant="h6" component="h3">Pending Timesheets: {projectdetails.pendingcount}</Typography>
                    </Paper>
                  </Box>

                  : <Paper elevation={3} className={classes.papertimeline}>

                    <Typography variant="h5" component="h1">
                      Approved
        </Typography>
                  </Paper>
                }

              </TimelineContent>
            </TimelineItem>
          </Timeline>

        </Paper>

      </Dashbord>


    </div>


  );

}


//export default App ;