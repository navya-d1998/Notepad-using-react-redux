  
import React from "react";
import loader from "./Load"
import Spinner from "../../resources/images/spinner.gif";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },

  root: {
    display: 'flex',
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));
const FullPageLoader = () => {
    const classes = useStyles();
    return (

        <div className="fp-container">
          < CircularProgress disableShrink  className="fp-loader" alt="loading" />
           
         </div>
    );
};

export default FullPageLoader;