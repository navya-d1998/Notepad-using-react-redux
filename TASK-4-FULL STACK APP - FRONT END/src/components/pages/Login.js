import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { useState } from 'react';
import { useEffect } from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import useFullPageLoader from '../layout/useFullPageLoader'
import { Redirect, Route } from "react-router";
//import hh from '../../bk.PNG'
import { useForm, Form } from '../components/useForm';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import MuiAlert from '@material-ui/lab/Alert';
import Auth from '../../Auth';
import { withRouter } from "react-router-dom";
import { Switch, } from "react-router-dom";
import './Login.css';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {

    height: '100vh',
    // width:'100vh'
  },
  image: {


    backgroundImage: 'url( https://www.timesheets.com/wp-content/uploads/2021/03/Homepage-Front-image-v2.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: "white",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    width: "80%",
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: "100px"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
    height: "100%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



function SignInSide(props) {

  const { slide } = props;

  const redirecting = () => {

    switch (localStorage.getItem('role')) {


      case "admin":
        props.history.push('/AdminHome');
        break;


      case "manager":
        props.history.push('/ManagerHome');
        break;


      case "reviewer":
        props.history.push('/ReviewerHome');
        break;



      case "employee":
        props.history.push('/EmployeeHome');
        break;



      default:
        props.history.push('/404');
        break;

    }
  }



  useEffect((props) => {


    if (localStorage.getItem("userName")) {
      redirecting();
    }


  }, []);




  const classes = useStyles();

  const initialFValues = {
    email: '',
    password: '',

    role: '',

  }

  const validate = (fieldValues = values) => {
    let temp = { ...errors }

    if ('email' in fieldValues)
      temp.email = fieldValues.email.length !== 0 ? "" : "This field is required."
    if ('password' in fieldValues)
      temp.password = fieldValues.password ? "" : "This field is required."


    setErrors({
      ...temp
    })

    if (fieldValues === values)
      return Object.values(temp).every(x => x === "")
  }

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFValues, true, validate);

  const handleSubmit = e => {
    e.preventDefault()
    console.log(values);
    if (validate()) {

      showLoader();
      addOrEdit(values, resetForm);
    }
  }


  const [roles, setRoles] = useState(null);

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



  const addOrEdit = (values, resetForm) => {



    let email = values.email;

    let password = values.password;


    let loginFormData = new FormData();
    loginFormData.append("grant_type", "password");
    loginFormData.append("username", email);
    loginFormData.append("password", password);



    axios.post('https://localhost:44336/token',
      "userName=" + email + "&password=" + password + "&grant_type=password").then(data => {

        localStorage.setItem('token', data.data.access_token);
        localStorage.setItem('userName', data.data.userName);
        let expires = ".expires";
        localStorage.setItem('expires', data.data[expires]);





        axios.get('https://localhost:44336/api/helper/role', { headers: { "Authorization": `Bearer ${data.data.access_token}` } })
          .then(role => {


            console.log(role.data);

            setRoles(role.data);

            let rn = role.data[0];

            let name = role.data[1];

            rn = rn.replace(/\s+/g, '');

            localStorage.setItem('role', rn);

            localStorage.setItem('name', name);

            console.log(rn);

            switch (rn) {


              case "admin":
                setTimeout(() => {
                  Auth.login(() => { props.history.push('/AdminHome') })
                }, 1000)

                break;
              case "manager":

                setTimeout(() => {
                  Auth.login(() => { props.history.push('/ManagerHome') })
                }, 1000)
                break;
              case "reviewer":


                setTimeout(() => {
                  Auth.login(() => { props.history.push('/ReviewerHome') })
                }, 1000)
                break;

              case "employee":

                setTimeout(() => {
                  Auth.login(() => { props.history.push('/EmployeeHome') })
                }, 1000)
                break;

              default:

                console.log(roles)
                props.history.push('/404');
                break;
            }


          })

      }
      ).catch(e => {

        console.log(e.response);

        if (e.response.data.error_description == "The user name or password is incorrect.") {
          hideLoader();
          console.log("gg")
          setSnackbaropen(true);
          setSnackbartype('error');
          setSnackbarmsg("Invalid credentials");
          setTimeout(() => {
            window.location.reload(true);

          }, 4000);

        }
        else if (e.response.status === 404 && e.response.data.error_description == "User Doesn't Exist") {

          console.log("gg")
          setSnackbaropen(true);
          setSnackbartype('error');
          setSnackbarmsg("This user doesn't exist.");
          setTimeout(() => {
            window.location.reload(true);

          }, 4000);


        }

        else if (e.response.status === 404 && e.response.data.error_description == "User Not Verified") {

          console.log("gg")
          setSnackbaropen(true);
          setSnackbartype('error');
          setSnackbarmsg("This user is not verified.");
          setTimeout(() => {
            window.location.reload(true);

          }, 4000);


        }

        else {

          console.log("ooo")
          setSnackbaropen(true);
          setSnackbartype('error');
          setSnackbarmsg("This user is not verified.");
          setTimeout(() => {
            window.location.reload(true);

          }, 4000);
        }



      })


  }

  const CheckingLogin = (props) => {
    if (Auth.isAuthenticated()) {
      let rolename = localStorage.getItem('role');

      switch (rolename) {


        case "admin":
          setTimeout(() => {
            Auth.login(() => { props.history.push('/AdminHome') })
          }, 1000)

          break;
        case "manager":
          props.history.push('/ManagerHome');
          setTimeout(() => {
            Auth.login(() => { props.history.push('/ManagerHome') })
          }, 1000)
          break;
        case "reviewer":
          setTimeout(() => {
            Auth.login(() => { props.history.push('/ReviewerHome') })
          }, 1000)
          break;

        case "employee":
          setTimeout(() => {
            Auth.login(() => { props.history.push('/EmployeeHome') })
          }, 1000)
          break;

        default: console.log(roles)
          props.history.push('/404');
          break;
      }

    }


  }






  return (


    <div>



      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
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
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>


          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>



            <Typography component="h1" variant="h5">
              Sign in
          </Typography>
            <Form onSubmit={handleSubmit} className={classes.form} noValidate>


              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={values.email}
                onChange={handleInputChange}
                error={errors.email}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleInputChange}
                error={errors.password}
              />
              <div className="remember">
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}

              >
                Sign In
            </Button>
              <Grid container spacing={10} direction="row"
                justify="space-between"
                alignItems="center">

                <Grid item xs={5} >
                  <Link href="#" variant="body2">
                    Forgot password?
                </Link>
                </Grid>


                <Grid item xs={7}>

                  <Link href="#" variant="body2">
                    {"         Don't have an account? Sign Up"}
                  </Link>

                </Grid>

              </Grid>

            </Form>
          </div>
        </Grid>

      </Grid>


      {loader}

    </div>
  );
}

export default (SignInSide);