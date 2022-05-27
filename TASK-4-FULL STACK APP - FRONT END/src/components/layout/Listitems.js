import React from 'react';
import  { useState } from 'react';
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
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';
import PostAddTwoToneIcon from '@material-ui/icons/PostAddTwoTone';
// export default function getItems(items, headCells,filterFn) {
  import EventNoteIcon from '@material-ui/icons/EventNote';
  import { makeStyles } from '@material-ui/core/styles';
  import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import useDarkMode from '../../Mode';
import { useTheme } from '../../App';
import ListAltIcon from '@material-ui/icons/ListAlt';
import EventIcon from '@material-ui/icons/Event';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import BallotIcon from '@material-ui/icons/Ballot';




const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  
    '& List ListItem  ListItemText hover': {
    width:"inherit",
    backgroundColor: theme.palette.primary.main,
    color:theme.palette.primary.main,
    cursor: 'pointer',
}
  }


}));

   export  function  Menu (props) {

    const { primary, onClick1,key, iconnum } = props;

    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    };

  
  return(
    
  <div onClick= { onClick1}  key={key}>
    <ListItem button  selected={selectedIndex === {key}}
          onClick={(event) => handleListItemClick(event, {key})}     >
      <ListItemIcon > 
      { iconnum===3?  <DashboardIcon />:null }
      { iconnum===2?   <AssignmentIcon />:null }
      { iconnum===1?   <PostAddTwoToneIcon />:null }
      { iconnum===0?   <EventNoteIcon />:null }
      </ListItemIcon>
      <ListItemText  primary={primary} />
    </ListItem>
    </div>
    
)
  
};


export  const  SelectedListItem =() => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItem
          button
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemText primary="Trash" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemText primary="Spam" />
        </ListItem>
      </List>
    </div>
  );
}



    export  const  Managerlist =(onClick0, onClick1,onClick2, onClick3,onClick4,onClick5) => {

  const classes = useStyles();

 const themeToggle = useTheme();


  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index,onCl) => {

  

    onCl();

    
      setSelectedIndex(index);
       

    
  };


  return (
    <div className={classes.root}>


      <List component="nav" aria-label="main mailbox folders">
     
        <ListItem 
          button
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0,onClick0)   }
        >
          <ListItemIcon>
          <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
  
  
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1,onClick1)}
        >
          <ListItemIcon>
          <LibraryAddIcon />
          </ListItemIcon>
          <ListItemText primary="Create Project" />
        </ListItem>

   
        <ListItem
          button
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2,onClick2)}
        >
          <ListItemIcon>
          <PostAddTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary="Add Tasks" />
        </ListItem>

        <ListItem
          button
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3,onClick3)}
        >
          <ListItemIcon>
          <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Timesheets" />
        </ListItem>
  
        <ListItem
          button
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4,onClick4)}
        >
          <ListItemIcon>
          <AssignmentLateIcon />
          </ListItemIcon>
          <ListItemText primary="Resubmitted Timesheets" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 5}
          onClick={(event) => handleListItemClick(event, 5,onClick5)}
        >
          <ListItemIcon>
          <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItem>
      
      </List>

    </div>
  );
}



export  const  Employeelist =(onClick0, onClick1,onClick2, onClick3,onClick4,onClick5) => {

  const classes = useStyles();

  const themeToggle = useTheme();


  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index,onCl) => {

    onCl();
      setSelectedIndex(index);
       
      

    
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
     
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0,onClick0)}
        >
          <ListItemIcon>
          <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
  
  
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1,onClick1)}
        >
          <ListItemIcon>
          <EventIcon />
          </ListItemIcon>
          <ListItemText primary="Todays Timesheets" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2,onClick4)}
        >
          <ListItemIcon>
          <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Timesheets To Resubmit" />
        </ListItem>
   

        <ListItem
          button
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3,onClick3)}
        >
          <ListItemIcon>
          < ListAltIcon/>
          </ListItemIcon>
          <ListItemText primary="Pending Timesheets" />
        </ListItem>
  
     
        <ListItem
          button
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4,onClick2)}
        >
          <ListItemIcon>
          <EventAvailableIcon/>
          </ListItemIcon>
          <ListItemText primary="Timesheets History" />
        </ListItem>   


        <ListItem
          button
          selected={selectedIndex === 5}
          onClick={(event) => handleListItemClick(event, 5,onClick5)}
        >
          <ListItemIcon>
          <BallotIcon/>
          </ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItem>
       
      </List>
    </div>
  );
}


export  const  Reviewerlist =(onClick0, onClick1,onClick2,onClick3) => {

  const classes = useStyles();

  const themeToggle = useTheme();


  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index,onCl) => {

    onCl();
      setSelectedIndex(index);
       

    
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
     
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0,onClick0)}
        >
          <ListItemIcon>
          <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
  
  
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1,onClick1)}
        >
          <ListItemIcon>
          <PostAddTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary="Add Employees" />
        </ListItem>

   
        <ListItem
          button
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2,onClick2)}
        >
          <ListItemIcon>
          <EventNoteIcon />
          </ListItemIcon>
          <ListItemText primary="Timesheets" />
        </ListItem>

        <ListItem
          button
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3,onClick3)}
        >
          <ListItemIcon>
          <BallotIcon/>
          </ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItem>
       
      </List>
    </div>
  );
}