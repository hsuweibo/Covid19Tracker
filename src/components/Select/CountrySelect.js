/* eslint-disable no-use-before-define */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Select from "./Select";

import PropTypes from "prop-types";

const useStyles = makeStyles(
  {
    root: {
      width: "300px",
    },
  },
  { name: "CountrySelect" }
);

export default function CountrySelect(props) {
  const classes = useStyles(props);

  return (
    <Select
      {...props}
      classes={{ root: classes.root }}
      options={props.countries}
      readOnly={false}
      label="Country"
    />
  );
}

CountrySelect.propTypes = {
  value: PropTypes.string, // The controlled selected value (not necessary same as the input value, i.e., the typed-in value)
  onSelect: PropTypes.func, // The cb func when something is selected. First arg is the events object. Second arg is the selected value.
  countries: PropTypes.arrayOf(PropTypes.string), // The list of countries available for select
};
