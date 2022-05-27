
import React, { Component } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import otherlogo from '../../resources/images/logo.png';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './404.css';

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (

      <Grid container component="main" className="root">
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className="image" />
        <Grid className="paperContainer" item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className="paper">



            <Avatar className="avatar"

            >
              <LockOutlinedIcon />
            </Avatar >
            <Typography component="h1" variant="h5" style={{ marginTop: 20 }}>
              404 PAGE NOT FOUND
              </Typography>
            <form className="formClass" noValidate>
              <Grid container spacing={2} style={{ marginTop: 2 }}>

                <Grid item xs={12}>
                  <h3>Sorry, we couldn't find this page.</h3>
                </Grid>

                <Grid item xs={12}>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="submitButton"
                    onClick={() => (this.props.history.push("/"))}
                  >
                    Go Home
            </Button>
                </Grid>
              </Grid>

              <Grid container style={{ marginTop: 20 }}>

              </Grid>

            </form>

          </div>
        </Grid>
      </Grid>

    );
  }
}

export default NotFound;