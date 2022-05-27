import React from 'react';
import { useState } from 'react';
import Dashbord from '../../layout/Dashbord';
import useTable from "../../components/useTable";
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import { Menu } from '../../layout/Listitems';
import Addemployees from "./EmpForm";
import * as employeeService from "./Service";
import Popup from "../../components/Popup";
import { FlashOnOutlined } from '@material-ui/icons';
import Controls from "../../components/controls/Controls";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useFullPageLoader from "../../layout/useFullPageLoader";
import Snackbar from '@material-ui/core/Snackbar';
import  { useEffect } from 'react'
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Auth from '../../../Auth';
import { Search } from "@material-ui/icons";
import { Reviewerlist } from '../../layout/Listitems';
import clsx from 'clsx';
import axios from 'axios';
import { Grid, } from '@material-ui/core';
import  pic from '../../../resources/images/notfound.png'

const tasksheadCells = [
    { id: 'nameofservice', label: 'Project Name' },
    { id: 'fromdate', label: 'project Start Date', disableSorting: FlashOnOutlined },
    { id: 'project_status', label: 'Project Status', disableSorting: false },
    { id: 'actions', label: 'Actions', disableSorting: FlashOnOutlined }
]


const getAllEmployees2 = () => ([
    { id: '1', nameofservice: 'Development', fromdate: 'jjjjj', project_status: 'bjjjjj' },
    { id: '2', nameofservice: 'Marketing', fromdate: 'eeeeee', project_status: 'asjjjj' },
    { id: '3', nameofservice: 'Accounting', fromdate: 'aaaaaaa', project_status: 'cjjjjj' },
    { id: '4', nameofservice: 'HR', fromdate: 'fromdate', project_status: 'djjjjj' },
    { id: '5', nameofservice: 'Accounting', fromdate: 'aaaaaaa', project_status: 'cjjjjj' },
    { id: '6', nameofservice: 'HR', fromdate: 'fromdate', project_status: 'djjjjj' }
])



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
    submit: {
         float:"left",
       
         marginTop:"2vh",
         marginLeft:"0",
        backgroundColor:"#80cbc4",
       },
       paper: {
        padding: theme.spacing(2),
       //display: 'flex',
        overflow: 'auto',  width:'100%',
        flexDirection: 'column',
        alignItems:'center'
      },
      fixedHeight: {
        height: '620px',
      }

}))
export default function Task(props) {
    const classes = useStyles();

    const [openPopup, setOpenPopup] = useState(false)
    const [openLoad, setOpenLoad] = useState(false)

    const [openPopup1, setOpenPopup1] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [projecttName, setProjectName] = useState(null);
    const [records, setRecords] = useState([]);
    const [projectedit, setProjectedit] = useState(false);
    const [projectId, setProjectId] = useState(null);

    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [ snackbaropen, setSnackbaropen ] = useState(false);
      const [ snackbartype, setSnackbartype ] = useState();
      const [ snackbarmsg, setSnackbarmsg ] = useState();



      const snackbarClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setSnackbaropen(false);

      };


    const [loader, showLoader, hideLoader] = useFullPageLoader();

    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting }
        = useTable(records, tasksheadCells, filterFn);


        useEffect(() => {
       
       
            if(localStorage.getItem('expires'))
            {
    
            var expdate =  localStorage.getItem('expires');
    
            var expiredate = new Date(expdate);
    
            var today = new Date();
    
    
            console.log(expiredate);
            console.log(today);
    
            if(expiredate.getTime() < today.getTime())
            {
                setSnackbaropen(true);
                setSnackbartype('warning');
                setSnackbarmsg("Your session has expired.");
                showLoader();
                setTimeout( () => { 
                  Auth.logout(()=>{localStorage.clear();props.history.push('/') });
                
                    }, 4000)
            }
          
       
            showLoader();
           employeeService.GetAllProjects(setRecords,setOpenLoad,showLoader,hideLoader,setSnackbaropen);
                 
           var token = localStorage.getItem('token');
       
           axios.get('https://localhost:44336/api/reviewerlogin/projects' , { headers: {"Authorization" : `Bearer ${token}`} }
                   )
              .then(response => {
        
                setRecords(response.data);
        
               hideLoader();
                  
        
        
                })
               .catch(error => {
        
                hideLoader();
        
                       if( error.response.status === 500 )
                       {
                           setSnackbaropen(true);
                           setSnackbartype('error');
                           setSnackbarmsg("Something went wrong.");
                       }
        
                      else if( error.response.status === 404 )
                       {
                           setSnackbaropen(true);
                           setSnackbartype('info');
                           setSnackbarmsg("No records found.");
                           setOpenLoad(true);
                       }
                       else
                       {
                         setSnackbaropen(true);
                         setSnackbartype('info');
                         setSnackbarmsg("No records found.");
                       }
                       console.log('error', error.response.status);
                       });
        }          
                  
                 },[]);
              
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


    const logingout = () => { props.history.push('/'); }

    const onClick0 = () => {  props.history.push('/ReviewerHome'); };
    const onClick2 = () => {  };
    const onClick3 = () => { props.history.push('/ReviewerHome/Timesheets'); };
    const onClick4 = () => { props.history.push('/ReviewerHome/Projects'); };


    const arry = () => ([
        { id: 0, op: "Dashboard", fn: onClick0,iconnum:3  },
        { id: 1, op: "Add Employees", fn: onClick2,iconnum:1  },
        { id: 2, op: " Timesheets", fn: onClick3,iconnum:2  }

    ]);

    const addOrEdit = (employee, resetForm) => {


        employeeService.addemployee(setSnackbaropen,setSnackbartype,setSnackbarmsg,employee,projectId);

        resetForm()
        setRecordForEdit(null)
  
    }

    const openInPopup = (id,nameofservice) => {
     
      
        setOpenPopup1(true); 
        setRecordForEdit(null);
    
        setProjectName(nameofservice);
        setProjectId( (id));
    }

    const handletask = (x)=>
    {

     setProjectedit(true);

     employeeService.changeprojectstatus(setSnackbaropen,setSnackbartype,setSnackbarmsg,projectId);

    }

    const editproject = (x) => {

        setOpenPopup1(false); 
        setRecordForEdit(null);
        setProjectId(x.id);
        setProjectName(x.nameofservice);
        setProjectedit(true);
       
    }


  

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (

        <div>
                       
  <Snackbar 
  anchorOrigin={{vertical:'top',horizontal:'center'}}
  open = {snackbaropen}
  autoHideDuration = {6000}
  onClose={snackbarClose}
  message = {<span id="message-id">{snackbarmsg}</span>}
  action ={[
    <IconButton 
    key="close"
    arial-label="close"
    color="#FFFFFF"
    onClick={snackbarClose}>
    </IconButton>
  ]}
  >
    <MuiAlert  autoHideDuration = {6000} elevation={6} variant="filled" onClose={snackbarClose} severity={snackbartype}>
  {snackbarmsg}
</MuiAlert>
</Snackbar>
 
            <Dashbord color="primary"
            loader = {loader}
 logout={(props)=>
    { Auth.logout(()=>{localStorage.clear();logingout();});
    
    }
}
                Menuitems={Reviewerlist( onClick0,onClick2,onClick3,onClick4)}
>
                <Popup
                    title="Adding Employees"
                    openPopup={openPopup1}
                    setOpenPopup={setOpenPopup1} >
            <div style={{marginLeft:"-15px"}} >  

                <Grid container spacing={1} direction="row">
          <Grid item xs={4}>          
            <Typography  variant="h6" style={{paddingBottom:"10px"}}>
            
            Project Name: 
             
            </Typography>
            </Grid>
            <Grid item xs={3}>  
            <Typography  variant="h6" style={{paddingBottom:"15px"}}>
            
            {projecttName}
             
            </Typography>
            </Grid>
            </Grid>
            </div> 
            <Addemployees   projectid={projectId} projectedit={projectedit}
                        recordForEdit={recordForEdit} 
                        setProjectedit = {   setProjectedit}
                                addOrEdit={addOrEdit} />


            { <div style={{marginTop:"-150px",marginBottom:"-5px", marginLeft:"-15px"}} >
            
            <Controls.Button 
                 color="Primary"
                 text="Completed Adding Employees"
                 onClick={() => {  console.log(projectId); handletask(projectId) }}>

            </Controls.Button></div> }
                </Popup>
              
              
                 <Paper elevation={4} className={fixedHeightPaper}> 

{  openLoad?<div className="divv"><h2>No Pending Projects To Add Employees </h2>
<img style={{height:"38vh"}}  src={pic} alt="No Content Found" />

</div>:
           <div>  
                 <Toolbar>
                    <Controls.Input
                        label="Search Projects"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment className="search"  position="start">
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

                                    <TableCell>{item.nameofservice}</TableCell>
                                    <TableCell>{item.fromdate}</TableCell>
                                    <TableCell>{item.project_status}</TableCell>
                                    <TableCell>
                                    <Controls.ActionButton 
                                            color="default"
                                            onClick={() => {  openInPopup(item.id,item.nameofservice) }}>
                                            <EditOutlinedIcon fontSize="small" color="#80cbc4" />
                                        </Controls.ActionButton>
                                    </TableCell>

                                </TableRow>)
                                )
                            }
                    </TableBody>
                    </TblContainer>
                    <TblPagination  />
            
               </div>             
            }
        </Paper>
            </Dashbord>

        </div>

    );

}

