import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import numeral from "numeral-es6";

import * as CountTypes from "../../../Constants/CountTypes";

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
        [CountTypes.ACTIVE]: theme.palette.info.main,
        [CountTypes.DEATHS]: theme.palette.error.main,
        [CountTypes.RECOVERED]: theme.palette.success.main,
      };
      return mapping[props.countType];
    },
  },
}));

const CountBox = (props) => {
  const classes = useStyle(props);
  let title;
  switch (props.countType) {
    case CountTypes.ACTIVE:
      title = "New cases";
      break;
    case CountTypes.DEATHS:
      title = "New deaths";
      break;
    case CountTypes.RECOVERED:
      title = "New recovered";
      break;
    default:
      title = "Unknown";
  }

  return (
    <div className={classes.root}>
      <div className={classes.highlight}></div>
      <Typography variant="body1">{title}</Typography>
      <Typography variant="h5">
        {numeral(props.newCount).format("0.[00]a")}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {numeral(props.totalCount).format("0.[00]a")} total
      </Typography>
    </div>
  );
};

export default CountBox;

CountBox.propTypes = {
  countType: PropTypes.oneOf([
    CountTypes.RECOVERED,
    CountTypes.DEATHS,
    CountTypes.ACTIVE,
  ]),
  newCount: PropTypes.number,
  totalCount: PropTypes.number,
};
