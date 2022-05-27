import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import  {SelectedListItem}  from './Listitems';
import Chart from '../layout/Appp';
import logo from '../../resources/images/image.png'
import SettingsPowerIcon from '@material-ui/icons/SettingsPower';
import Auth from '../../Auth';
import  '../../App.css'
import {
  BrowserRouter as Router,
  Route,
  withRouter
} from "react-router-dom";
import { FormControlLabel } from "@material-ui/core";
import { Switch,} from "react-router-dom";
import FormGroup from '@material-ui/core/FormGroup';
import { FormatAlignCenterOutlined, FormatAlignJustify } from '@material-ui/icons';
import { useTheme } from '../../App';
import { useState } from 'react';
import  { useEffect } from 'react'
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import mountains from '../../resources/images/mountains.png'



 function  Capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function Copyright() {
  return (
    <Typography style={{ position: "fixed",
      left: 45,
      bottom: 0,
      width: "100%",
     
   
      textAlign: "left"}} variant="body2" color="default" align="center">
      {'Copyright © '}
      <Link color="default" href="http://localhost:3001/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  root1: {
    width: '100%',overflow: 'hidden',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  title1: {
    color: "black",
    
  },
  footer:{
    marginTop:'calc(5% + 60px)',
    bottom: 0,
    float:"left",
    marginLeft:"0px",
    position: 'sticky'
  },
  footeralign:{

    bottom:0, position: 'sticky',
    marginTop:"250px",
    marginBottom:"-100px"
  },
  toolbar: {
    paddingRight: 24,
   
  },
  toolbarIcon: {
   width:"8px",
   height:"5px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {    height:'100vh' ,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',  width:'100%',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 'inherit',
  },
  MuiIconButtonlabel: {
    width: "100%",
    display: "flex",
    FormatAlignCenterOutlined: "inherit",
    FormatAlignJustify: "inherit",
}


}));

function Dashboard(props) {

  const themeToggle = useTheme();
  
  const {color,Menuitems, children,loader, logout } = props;

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);




  const [greet, setGreet] = useState(null);

  const [icon, setIcon] = useState(null);

  const icons=()=>{

    var today = new Date();
    var curHr = today.getHours();
    if (curHr < 12) {
      return  <WbSunnyIcon/>;
    } else if (curHr >= 12 && curHr < 16) {
      return <Brightness5Icon/>;
    } else {
      return  <Brightness4Icon/>;
      
    }
  }

const greetings=()=>
{

  var today = new Date();
    var curHr = today.getHours();

    curHr < 12 ? 
 // <div class="container">
     <img src="https://gt-linckia.s3.amazonaws.com/static-ess-v6.3.0-prod-370/mountain-morning.svg" alt="Nature" style="width:100%;">
    <div class="text-block">
      <h4>Good Morning</h4>
      <p>What a beautiful sunrise</p>
  </div></img>:curHr >= 12 && curHr < 16 ?  <img src="https://gt-linckia.s3.amazonaws.com/static-ess-v6.3.0-prod-370/mountain-morning.svg" alt="Nature" style="width:100%;">
    <div class="text-block">
      <h4>Good Afternoon</h4>
      <p>What a beautiful sunrise</p>
  </div></img>: <img src="https://gt-linckia.s3.amazonaws.com/static-ess-v6.3.0-prod-370/mountain-morning.svg" alt="Nature" style="width:100%;">
    <div class="text-block">
      <h4>Good Evening'</h4>
      <p>What a beautiful sunrise</p>
  </div></img>




}


  useEffect(() => {

    var today = new Date();
    var curHr = today.getHours();
  
    if (curHr < 12) {
      setGreet(curHr);
      setIcon('WbSunnyIcon');
    } else if (curHr >= 12 && curHr < 16) {
      setGreet(curHr)
      setIcon('Brightness5Icon');
    } else {
      setGreet(curHr)
      setIcon('Brightness4Icon');
    }

  },[]);

  return (
    <div className={classes.root}>
    <CssBaseline />
    <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
      
       

     
       
        <button onClick={() => themeToggle.toggle()}   class="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit" tabindex="0" type="button" aria-label="Toggle light/dark theme" data-ga-event-category="header" data-ga-event-action="dark" title="Toggle light/dark theme"><span class="MuiIconButton-label">
          <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-.89 0-1.74-.2-2.5-.55C11.56 16.5 13 14.42 13 12s-1.44-4.5-3.5-5.45C10.26 6.2 11.11 6 12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6z"></path></svg></span>
          <span class="MuiTouchRipple-root"></span></button>

          <Typography component="h5" variant="h6" color="inherit" noWrap className={classes.title}>
        
      </Typography> 

      <h2>Welcome</h2> <pre> </pre>  <h2> {     Capitalize(  (localStorage.getItem('name') ) )    }</h2>
       
        <IconButton onClick={logout} color="inherit">
        
            < SettingsPowerIcon />
     
        </IconButton>
      </Toolbar>
    </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
        <img src={logo} className="logo" alt="logo" />
        <h2 style={{marginLeft:"85px",marginTop:"20px",  fontWeight: "bold"}} >Track-It!</h2>
        </div>
        <Divider />
        <div className={classes.root1}>
        <List >
        {loader}
           {Menuitems}
        
        </List>
        </div>
         <Divider />

            {  greet < 12 ? 
  <div class="container">
     <img style={{width:"32vh",overflow: 'hidden',marginRight:"-45px"}} src="https://gt-linckia.s3.amazonaws.com/static-ess-v6.3.0-prod-370/mountain-morning.svg" alt="Nature"  />
    <div class="text-block">
      <h4>Good Morning</h4>
  </div></div>: (greet >= 12 && greet < 16 )? <div class="container"> <img style={{width:"32vh",overflow: 'hidden',marginRight:"-45px"}}  src="https://gt-linckia.s3.amazonaws.com/static-ess-v6.3.0-prod-370/mountain-noon.svg" alt="Nature" />
    <div class="text-block">
      <h4>Good Afternoon</h4>
  </div></div>:<div class="container"><img style={{width:"32vh",overflow: 'hidden',marginRight:"-45px"}}  src="https://gt-linckia.s3.amazonaws.com/static-ess-v6.3.0-prod-370/mountain-eve.svg" alt="Nature"/>
    <div class="text-block">
      <h4>Good Evening</h4>
  </div></div> }


         <Typography variant="h5" style={{fontSize:"25px", marginTop:"20px"}}>
            
         </Typography>
         
      < div style={{marginLeft:"18px",marginTop:"8px"}}>{greetings()}</div>

            <Copyright />
        
        
      
      </Drawer>
      
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
      

        <Container maxWidth="lg" className={classes.container} >
          <Grid container spacing={2}>
          
          {loader}

        
           {children}
    
      
          </Grid>
     
        </Container>
      </main>
    </div>
  );
}

export default withRouter (Dashboard)