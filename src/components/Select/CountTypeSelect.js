/* eslint-disable no-use-before-define */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Select from "./Select";

import PropTypes from "prop-types";
import * as CountTypes from "../../Constants/CountTypes";

const useStyles = makeStyles(
  {
    root: {
      width: "150px",
    },
  },
  { name: "CountTypeSelect" }
);

export default function CountTypeSelect(props) {
  const classes = useStyles(props);

  return (
    <Select
      {...props}
      classes={{ root: classes.root }}
      options={[CountTypes.ACTIVE, CountTypes.DEATHS, CountTypes.RECOVERED]}
      readOnly={true}
    />
  );
}

CountTypeSelect.propTypes = {
  onSelect: PropTypes.func, // The cb func when something is selected. First arg is the events object. Second arg is the selected value.
  value: PropTypes.oneOf([
    CountTypes.ACTIVE,
    CountTypes.DEATHS,
    CountTypes.RECOVERED,
  ]), // The controlled selected value
};
