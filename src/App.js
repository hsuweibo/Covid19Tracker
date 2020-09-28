import React from "react";
import { Typography, Link } from "@material-ui/core";
import OverviewContainer from "./components/OverviewContainer/OverviewContainer";
import { makeStyles } from "@material-ui/core/styles";
import ChartContainer from "./components/ChartContainer/ChartContainer";
import TableContainer from "./components/TableContainer/TableContainer";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: "13px",
    padding: "0.6rem",
    maxWidth: theme.breakpoints.values["lg"],
    margin: "0 auto",
  },

  overviewGridItem: {
    gridColumn: "1/8",
    gridRow: "2/3",
    [theme.breakpoints.down("sm")]: {
      gridColumn: "1/13",
    },
  },

  chartGridItem: {
    gridColumn: "1/8",
    gridRow: "3/4",
    [theme.breakpoints.down("sm")]: {
      gridColumn: "1/13",
    },
  },

  listGridItem: {
    gridColumn: "8 /13",
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
    gridRow: "4/5",
    [theme.breakpoints.down("sm")]: {
      gridRow: "5/6",
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
      <AppBar position="static" style={{ backgroundColor: "#524a4a" }}>
        <Toolbar>
          <Typography variant="h4" style={{ flexGrow: 1, textAlign: "center" }}>
            <i className="fas fa-virus"></i> COVID-19 TRACKER
          </Typography>
        </Toolbar>
      </AppBar>

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
          <Typography color="textSecondary" align="center" variant="body2">
            Covid-19 Tracker is powered by React{" "}
            <i className="fab fa-react"></i> and the open data API from{" "}
            <Link href="https://disease.sh/" target="_blank">
              disease.sh
            </Link>{" "}
          </Typography>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
