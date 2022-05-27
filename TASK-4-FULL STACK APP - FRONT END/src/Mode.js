
import { Switch, Link, Redirect} from "react-router-dom";
import four0four from '../src/components/pages/404';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, withRouter} from "react-router-dom";
import React, { useState } from "react";
import { FormControlLabel } from "@material-ui/core";




const themeObject = {
    palette: {
      primary: { main: "#053f5b" },
      secondary: { main: "#5e3c6f" },
      type: "light"
    },
    themeName: "Blue Lagoon 2020",
    typography: {
      fontFamily: "Bitter"
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


  export default useDarkMode ;