import React, { useState } from "react";
import AppBar from "./AppBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import ViewProject from "./project/ViewProject";
import LandingPage from "./LandingPage";
import NewProject from "./project/NewProject";
import ViewAllProjects from "./project/ViewAllProjects";

export default () => {
  //hook for light vs dark mode
  const [darkMode, setDarkMode] = useState(true);

  //initialize theme for material ui
  const theme = createMuiTheme({
    palette: {
      primary: { main: darkMode ? "#7BC8F6" : "#58baf3" },
      secondary: { main: darkMode ? "#A7FFB5" : "#aaf0ae" },
      paper: {
        main: darkMode ? "#212121" : "#f0eef1",
        light: darkMode ? "#262626" : "#e6e3e8",
        lighter: darkMode ? "#333333" : "#FFFFFF",
      },
      info: { main: "#a6a6a6" },
    },
    typography: {
      fontFamily: '"Quicksand", "Helvetica", "Arial", sans-serif',
      fontSize: 16,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
    overrides: {
      MuiMenu: {
        list: {
          padding: 0,
        },
      },
      MuiExpansionPanelSummary: {
        root: {
          disabled: {
            opacity: "0.0",
          },
        },
      },
    },
    shadows: ["none"],
  });

  // fx to be passed to app bar to toggle dark mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppBar toggleTheme={toggleTheme} />
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/project/view/all" exact component={ViewAllProjects} />
          <Route path="/project/view/:id" exact component={ViewProject} />
          <Route path="/project/new" exact component={NewProject} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
};
