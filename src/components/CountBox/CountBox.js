import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./CountBox.module.css";
import numeral from "numeral-es6";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "1em",
    boxSizing: "border-box",
    position: "relative",
    textAlign: "center",
  },

  highlight: {
    position: "absolute",
    display: "block",
    width: "80%",
    top: "1%",
    left: "50%",
    transform: "translateX(-50%)",
    height: "5px",
    backgroundColor: (props) => {
      const mapping = {
        cases: theme.palette.info.main,
        deaths: theme.palette.error.main,
        recovered: theme.palette.success.main,
      };
      return mapping[props.countType];
    },
  },
}));

const CountBox = (props) => {
  const classes = useStyle(props);
  return (
    <div className={classes.root}>
      <div className={classes.highlight}></div>
      <Typography variant="body1">New {props.countType}</Typography>
      <Typography variant="h5">
        {numeral(props.newCount).format("0.00a")}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {numeral(props.totalCount).format("0.00a")} total
      </Typography>
    </div>
  );
};

export default CountBox;
