/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";

const useStyles = makeStyles(
  {
    option: {
      fontSize: "1rem",
    },

    root: {
      padding: "6px 2px",
    },
  },
  { name: "Select" }
);

export default function Select(props) {
  const classes = useStyles(props);

  return (
    <Autocomplete
      options={props.options}
      classes={{
        option: classes.option,
        root: classes.root,
      }}
      value={props.value}
      disableClearable
      autoHighlight
      onChange={props.onSelect}
      getOptionLabel={(option) => option}
      renderOption={(option) => <span>{option}</span>}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          size="small"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: "off",
            readOnly: props.readOnly,
          }}
        />
      )}
    />
  );
}

Select.propTypes = {
  onSelect: PropTypes.func, // The cb func when something is selected. First arg is the events object. Second arg is the selected value.
  options: PropTypes.arrayOf(PropTypes.string), // A list of option labels for the dropdown select
  label: PropTypes.string, // The label string,
  value: PropTypes.string, // The controlled selected value. Should be one of 'options'
  readOnly: PropTypes.bool, // Whether or not typed input is enabled
};
