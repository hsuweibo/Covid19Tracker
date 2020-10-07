import React from "react";
import { Typography, Link } from "@material-ui/core";
import OverviewContainer from "./components/OverviewContainer/OverviewContainer";
import {
  makeStyles,
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import ChartContainer from "./components/ChartContainer/ChartContainer";
import TableContainer from "./components/TableContainer/TableContainer";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const theme = responsiveFontSizes(createMuiTheme());

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "100vh",
  },

  gridContainer: {
    display: "grid",
    alignContent: "center",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: "13px",
    padding: "0.6rem",
    width: "100%",
    maxWidth: theme.breakpoints.values["lg"],
    margin: "0 auto",
  },

  overviewGridItem: {
    gridColumn: "1/8",
    gridRow: "1/2",
    [theme.breakpoints.down("sm")]: {
      gridColumn: "1/13",
    },
  },

  chartGridItem: {
    gridColumn: "1/8",
    gridRow: "2/3",
    [theme.breakpoints.down("sm")]: {
      gridColumn: "1/13",
    },
  },

  listGridItem: {
    gridColumn: "8 /13",
    gridRow: "1/3",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      gridColumn: "1/13",
      gridRow: "3/4",
      height: "500px",
    },
  },

  footer: {
    gridColumn: "1/13",
    gridRow: "3/4",
    [theme.breakpoints.down("sm")]: {
      gridRow: "4/5",
    },
  },

  // Global styles, overrides the default style for small table cells
  "@global": {
    ".MuiTableCell-sizeSmall": {
      padding: "6px 10px 6px 6px",
    },
  },
}));

function App() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar position="static" style={{ backgroundColor: "#2b1b04" }}>
            <Toolbar>
              <Typography
                variant="h3"
                style={{
                  flexGrow: 1,
                  textAlign: "center",
                  letterSpacing: "3px",
                  color: "white",
                  margin: ".4em",
                }}
              >
                Covid-
                {/* The favico also uses federo font */}
                <span style={{ fontFamily: "Federo, sans-serif" }}>
                  19
                </span>{" "}
                Tracker
              </Typography>
            </Toolbar>
          </AppBar>

          <div style={{ flex: "1 0 auto", display: "flex" }}>
            <div className={classes.gridContainer}>
              <div className={classes.appBar}></div>
              <div className={classes.overviewGridItem}>
                <OverviewContainer />
              </div>
              <div className={classes.chartGridItem}>
                <ChartContainer />
              </div>
              <div className={classes.listGridItem}>
                <TableContainer />
              </div>
              <div className={classes.footer}>
                <Typography
                  color="textSecondary"
                  align="center"
                  variant="body2"
                >
                  Covid-19 Tracker is powered by React{" "}
                  <i className="fab fa-react"></i> and the open data API from{" "}
                  <Link href="https://disease.sh/" target="_blank">
                    disease.sh
                  </Link>{" "}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
