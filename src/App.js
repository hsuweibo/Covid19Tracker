import React from "react";
import { Typography } from "@material-ui/core";
import OverviewContainer from "./components/OverviewContainer/OverviewContainer";
import {
  StylesProvider,
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import ChartContainer from "./components/ChartContainer/ChartContainer";
import ListContainer from "./components/ListContainer/ListContainer";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const theme = createMuiTheme({
  overrides: {
    MuiCard: {
      // root: { margin: "2em" },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: "15px",
    padding: "1.5rem",
    maxWidth: theme.breakpoints.values["lg"],
    margin: "0 auto",
  },

  overviewGridItem: {
    gridColumn: "1/9",
    gridRow: "2/3",
    [theme.breakpoints.down("sm")]: {
      gridColumn: "1/13",
    },
  },

  chartGridItem: {
    gridColumn: "1/9",
    gridRow: "3/4",
    [theme.breakpoints.down("sm")]: {
      gridColumn: "1/13",
    },
  },

  listGridItem: {
    gridColumn: "9 /13",
    gridRow: "2/4",
    [theme.breakpoints.down("sm")]: {
      gridColumn: "1/13",
      gridRow: "4/5",
      height: "500px",
    },
  },

  appBar: {
    gridColumn: "1 /13",
    gridRow: "1/2",
  },

  footer: {
    gridColumn: "1/13",
    gridRow: "5/6",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <div className={classes.gridContainer}>
          <div className={classes.appBar}>
            <AppBar position="static">
              <Toolbar>
                <Typography
                  variant="h4"
                  style={{ flexGrow: 1, textAlign: "center" }}
                >
                  <i className="fas fa-virus"></i> COVID-19 TRACKER
                </Typography>
              </Toolbar>
            </AppBar>
          </div>
          <div className={classes.overviewGridItem}>
            <OverviewContainer />
          </div>
          <div className={classes.chartGridItem}>
            <ChartContainer />
          </div>
          <div className={classes.listGridItem}>
            <ListContainer />
          </div>
          <div className={classes.footer}>
            <Typography color="textSecondary" align="center" variant="body2">
              Covid-19 Tracker is powered by React and the disease.sh API
            </Typography>
          </div>
        </div>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;
