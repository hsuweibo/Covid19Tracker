/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import * as CountTypes from "../../Constants/CountTypes";

const useStyles = makeStyles({
  option: {
    fontSize: "1rem",
  },

  root: {
    width: "150px",
  },
});

export default function CountTypeSelect(props) {
  const classes = useStyles(props);

  return (
    <Autocomplete
      options={props.countTypes}
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
          label="Type"
          size="small"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: "off",
            readOnly: true,
          }}
        />
      )}
    />
  );
}

CountTypeSelect.propTypes = {
  onSelect: PropTypes.func, // The cb func when something is selected. First arg is the events object. Second arg is the selected value.
  value: PropTypes.string, // The controlled selected value
  countTypes: PropTypes.arrayOf(
    PropTypes.oneOf([
      CountTypes.ACTIVE,
      CountTypes.DEATHS,
      CountTypes.RECOVERED,
    ])
  ), // The list of count type options
};
