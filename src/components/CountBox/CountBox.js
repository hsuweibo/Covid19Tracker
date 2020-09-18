import React from "react";
import { Typography } from "@material-ui/core";
import styles from "./CountBox.module.css";
import numeral from "numeral-es6";

const CountBox = (props) => {
  const ref = numeral;
  return (
    <div className={styles.countBox}>
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
