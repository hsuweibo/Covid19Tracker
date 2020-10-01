/* eslint-disable no-use-before-define */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Select from "./Select";

import PropTypes from "prop-types";
import * as Duration from "../../Constants/Duration";

const useStyles = makeStyles(
  {
    root: {
      width: "130px",
    },
  },
  { name: "DurationSelect" }
);

export default function DurationSelect(props) {
  const classes = useStyles(props);

  return (
    <Select
      {...props}
      classes={{ root: classes.root }}
      options={[
        Duration.ONE_WEEK,
        Duration.TWO_WEEKS,
        Duration.ONE_MONTH,
        Duration.ALL,
      ]}
      readOnly={true}
      label="Duration"
    />
  );
}

DurationSelect.propTypes = {
  onSelect: PropTypes.func, // The cb func when something is selected. First arg is the events object. Second arg is the selected value.
  value: PropTypes.oneOf([
    Duration.ONE_WEEK,
    Duration.TWO_WEEKS,
    Duration.ONE_MONTH,
    Duration.ALL,
  ]), // The controlled selected value
};
