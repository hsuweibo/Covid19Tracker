/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";

const useStyles = makeStyles({
  option: {
    fontSize: "1rem",
  },
  root: {
    width: "300px",
  },
});

export default function CountrySelect(props) {
  const classes = useStyles(props);

  return (
    <Autocomplete
      id="country-select-demo"
      options={props.countries}
      classes={{
        option: classes.option,
        root: classes.root,
      }}
      disableClearable
      value={props.value}
      autoHighlight
      onChange={props.onSelect}
      getOptionLabel={(option) => option}
      renderOption={(option) => <span>{option}</span>}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          size="small"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: "off",
          }}
        />
      )}
    />
  );
}

CountrySelect.propTypes = {
  value: PropTypes.string, // The controlled selected value (not necessary same as the input value, i.e., the typed-in value)
  onSelect: PropTypes.func, // The cb func when something is selected. First arg is the events object. Second arg is the selected value.
  countries: PropTypes.arrayOf(PropTypes.string), // The list of countries available for select
};
