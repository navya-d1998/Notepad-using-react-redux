
import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import dateFormat from 'dateformat';
import { useState } from 'react';
import { useEffect } from 'react'
import useFullPageLoader from "../../layout/useFullPageLoader";
import axios from 'axios';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();

  const [count, setCount] = useState(0);

  const [loader, showLoader, hideLoader] = useFullPageLoader();

  useEffect(() => {

    var token = localStorage.getItem('token');

    axios.get('https://localhost:44336/api/employeelogin/activeprojectcount', { headers: { "Authorization": `Bearer ${token}` } }).then(response => {

      setCount(response.data);
      hideLoader();
    })
      .catch(error => {

        hideLoader();
        console.log(error);

      })

  }, []);


  return (
    <React.Fragment>
      <div >
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Current ongoing Projects
      </Typography>

        <Typography component="p" variant="h4">
          {count}
        </Typography>
        <Typography color="textSecondary" className={classes.depositContext}>
          on
        {dateFormat(new Date(), "   mmmm dS, yyyy")}
        </Typography>
        <div>
          <Typography color="primary" variant="h5" style={{ fontSize: "30px", marginTop: "20px" }}>
            Have a Great Day! <div><EmojiEmotionsIcon style={{ fontSize: 30, }} /></div>
          </Typography>
        </div>
      </div>
    </React.Fragment>
  );
}