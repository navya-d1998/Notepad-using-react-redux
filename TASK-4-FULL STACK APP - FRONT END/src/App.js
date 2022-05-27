
import './App.css';
import Login from './components/pages/Login';
import Admin from '../src/components/pages/AdminHome';
import Manager from './components/pages/manager/ManagerHome';
import ManagerTask from './components/pages/manager/ManagerTasks';
import ManagerTimesheets from './components/pages/manager/ManagerTimesheets';
import ManagerResubmittedtimesheets from './components/pages/manager/ManagerResubmittedtimesheets';
import ManagerProjects from './components/pages/manager/ManagerProject';
import ManagerProjectdetails from './components/pages/manager/Projectdetail';
//import TypeContext from './components/pages/manager/Chart2';

import { ProtectedRoute } from './ProtectedRoute';
import Reviewer from './components/pages/reviewer/ReviewerHome';
import ReviewerAddEmployees from './components/pages/reviewer/ReviewerAddEmployees';
import ReviewerTimesheets from './components/pages/reviewer/ReviewerTimesheets';
import Reviewerprojects from './components/pages/reviewer/RviewerProjects';
import Reviewerdetails from './components/pages/reviewer/Projectdetails';



import { createBrowserHistory } from "history";
import Employee from './components/pages/employee/EmployeeHome';
import Todays_Timesheets from './components/pages/employee/EmployeeToday';
import History_Timesheets from './components/pages/employee/EmployeeHistory';
import Pending_Timesheets from './components/pages/employee/EmployeePending';
import Timesheets_To_Resubmit from './components/pages/employee/EmployeeResubmit';
import Employeeprojects from './components/pages/employee/EmployeeProjects';
import EmployeeProjectdetails from './components/pages/employee/ProjectDetails';

import Auth from './Auth';
import { render } from "react-dom";
import { Switch, Link, Redirect } from "react-router-dom";
import four0four from '../src/components/pages/404';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useState } from "react";
import { FormControlLabel } from "@material-ui/core";

const themeObject = {
  palette: {
    primary: { main: "#2391a1",  light: '#3c44b126', text: "White" },

    secondary: {
      main: "#f83245",

      light: '#f8324526'
    },
    type: "light"
  },

  themeName: "Blue Lagoon 2020",
  typography: {
    fontFamily: "Open Sans"
  }
};

const useDarkMode = () => {
  const [theme, setTheme] = useState(themeObject);

  const {
    palette: { type }
  } = theme;
  const toggleDarkMode = () => {
    const updatedTheme = {
      ...theme,
      palette: {
        ...theme.palette,
        type: type === "light" ? "dark" : "light"
      }
    };
    setTheme(updatedTheme);
  };
  return [theme, toggleDarkMode];
};

const ThemeToggleContext = React.createContext();

const TypeContext = React.createContext();

const ThemestateContext = React.createContext();

export const useTheme = () => React.useContext(ThemeToggleContext);

export const useType = () => React.useContext(TypeContext);

export const useThemestate = () => React.useContext(ThemestateContext);

const App = (props) => {

  const [theme, toggleDarkMode] = useDarkMode();




  const themeConfig = createMuiTheme(theme);
  console.log(themeConfig);


  const Path = (role) => {
    let rolename = localStorage.getItem('role');

    //alert("in")
    switch (role) {


      case "admin":
        return "/AdminHome"

      case "manager":
        return "/ManagerHome"

      case "reviewer":
        return "/ReviewerHome"


      case "employee":
        return "/EmployeeHome"


      default:
        return "/Login"
    }
  }



  return (



    <div className="App">
      <ThemeToggleContext.Provider value={{ toggle: toggleDarkMode }}>
        <TypeContext.Provider value={{ type: theme.palette.type }}>
          <ThemestateContext.Provider value={{ theme: theme }}>

            <MuiThemeProvider theme={themeConfig}>


              <Router history={createBrowserHistory}>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => {

                      return (
                        Auth.isAuthenticated ?
                          <Redirect to={Path(localStorage.getItem('role'))} /> :
                          <Redirect to="/Login" />
                      )
                    }}


                  />



                  <Route exact path="/Login" component={Login} />

                  <ProtectedRoute roles="admin" exact path="/AdminHome" component={Admin} />

                  <ProtectedRoute roles="manager" exact path="/ManagerHome" component={Manager} />
                  <ProtectedRoute roles="manager" exact path="/ManagerHome/Tasks" component={ManagerTask} />
                  <ProtectedRoute roles="manager" exact path="/ManagerHome/Timesheets" component={ManagerTimesheets} />
                  <ProtectedRoute roles="manager" exact path="/ManagerHome/Resubmittedtimesheets" component={ManagerResubmittedtimesheets} />
                  <ProtectedRoute roles="manager" exact path="/ManagerHome/Projects" component={ManagerProjects} />
                  <ProtectedRoute roles="manager" exact path="/ManagerHome/Projects/:id" component={ManagerProjectdetails} />



                  <ProtectedRoute


                    roles="reviewer" exact path="/ReviewerHome" component={Reviewer} />

                  <ProtectedRoute roles="reviewer" exact path="/ReviewerHome/Addemployees" component={ReviewerAddEmployees} />

                  <ProtectedRoute roles="reviewer" exact path="/ReviewerHome/Timesheets" component={ReviewerTimesheets} />

                  <ProtectedRoute roles="reviewer" exact path="/ReviewerHome/Projects" component={Reviewerprojects} />

                  <ProtectedRoute roles="reviewer" exact path="/ReviewerHome/Projects/:id" component={Reviewerdetails} />



                  <ProtectedRoute roles="employee" exact path="/EmployeeHome" component={Employee} />
                  <ProtectedRoute roles="employee" exact path="/EmployeeHome/Todays_Timesheets" component={Todays_Timesheets} />
                  <ProtectedRoute roles="employee" exact path="/EmployeeHome/History_Timesheets" component={History_Timesheets} />
                  <ProtectedRoute roles="employee" exact path="/EmployeeHome/Pending_Timesheets" component={Pending_Timesheets} />
                  <ProtectedRoute roles="employee" exact path="/EmployeeHome/Timesheets_To_Resubmit" component={Timesheets_To_Resubmit} />
                  <ProtectedRoute roles="employee" exact path="/EmployeeHome/Projects" component={Employeeprojects} />
                  <ProtectedRoute roles="employee" exact path="/EmployeeHome/Projects/:id" component={EmployeeProjectdetails} />

                  <Route path="/" component={four0four} />
                  <Route exact path="/404" component={four0four} />
                </Switch>
              </Router>

            </MuiThemeProvider>
          </ThemestateContext.Provider>
        </TypeContext.Provider>
      </ThemeToggleContext.Provider>
    </div>


  );
}

export default (App);



