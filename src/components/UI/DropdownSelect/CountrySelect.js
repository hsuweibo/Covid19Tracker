/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

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
      defaultValue={props.defaultValue}
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
