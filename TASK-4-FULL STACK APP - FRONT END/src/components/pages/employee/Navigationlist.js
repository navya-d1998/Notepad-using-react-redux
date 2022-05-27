import React from 'react';
import { useState } from 'react';
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



export default function Menuitems(props) {

  const arry = () => ([
    { id: 0, op: "Dashboard", fn: onClick0 },
    { id: 1, op: "Todays Timesheets", fn: onClick1 },
    { id: 2, op: " Timesheets History", fn: onClick2 },
    { id: 3, op: "Pending Timesheets", fn: onClick3 },
    { id: 4, op: " Timesheets To Resubmit", fn: onClick4 }

  ]);

  const onClick0 = () => { };
  const onClick1 = () => { props.history.push('/EmployeeHome/Todays_Timesheets'); };
  const onClick2 = () => { props.history.push('/EmployeeHome/History_Timesheets'); };
  const onClick3 = () => { props.history.push('/EmployeeHome/Pending_Timesheets'); };
  const onClick4 = () => { props.history.push('/EmployeeHome/Timesheets_To_Resubmit'); };


  return (
    <div >
      <ListItem button onClick={onClick0}>
        <ListItemIcon >
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>


      <ListItem button onClick={onClick1} >
        <ListItemIcon >
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Todays Timesheets" />
      </ListItem>

      <ListItem button onClick={onClick2} >
        <ListItemIcon >
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Timesheets History" />
      </ListItem>

      <ListItem button onClick={onClick3} >
        <ListItemIcon >
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Pending Timesheets" />
      </ListItem>

      <ListItem button onClick={onClick4} >
        <ListItemIcon >
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Timesheets To Resubmit" />
      </ListItem>



    </div>

  )
}
