import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from './Auth';
import { FormControlLabel } from "@material-ui/core";
import { Switch, Link} from "react-router-dom";
const Path =(role)=>
{

    switch(role)
    {

      
      case "admin":
          return   "/AdminHome" 

      case "manager":
          return  "/ManagerHome"

        case "reviewer":
          return "/ReviewerHome"


        case "employee":
          return "/EmployeeHome"


        default:
          return  "/404"
    }
}




export const ProtectedRoute = ({roles,toggleDarkMode, component: Component, ...rest }) => {
    return (
        <Route
            {...rest} render={
                (props) => {
                    console.log(Auth.isAuthenticated())

                    console.log(roles);
                    console.log(localStorage.getItem('role'));
                    let rolename = localStorage.getItem('role');

                    if (Auth.isAuthenticated() && rolename==roles )
                     {

                        return <Component {...props} />
                    }

                    else if (Auth.isAuthenticated())
                    {
                    

                        switch(rolename)
                      {

                        
                        case "admin":
                            return <Redirect to={
                                { 
                                    pathname: "/AdminHome",
    
                                    state: {
                                        from: props.location
                                    }
                                }} />
      
          
                        case "manager":
                            return <Redirect to={
                                { 
                                    pathname: "/ManagerHome",
    
                                    state: {
                                        from: props.location
                                    }
                                }} />
       
                          case "reviewer":
                            return <Redirect to={
                                { 
                                    pathname: "/ReviewerHome",
    
                                    state: {
                                        from: props.location
                                    }
                                }} />
         
           
                          case "employee":
                            console.log("in")
                            return <Redirect to={
                                { 
                                    pathname: "/EmployeeHome",
    
                                    state: {
                                        from: props.location
                                    }
                                }} />
    
  
                          default:
                            return <Redirect to={
                                { 
                                    pathname: "/404",
    
                                    state: {
                                        from: props.location
                                    }
                                }} />
       }

                       

                    }

                    else {
                        
                        return <Redirect to={
                            { 
                                pathname: "/Login",

                                state: {
                                    from: props.location
                                }
                            }} />
                    }
                }

            }

        

            
        />
    )
}