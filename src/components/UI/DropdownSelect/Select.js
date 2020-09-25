/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    // '& > span': {
    //   marginRight: 10,
    //   fontSize: 18,
    // },
  },
});

export default function CountrySelect(props) {
  const classes = useStyles();

  return (
    <Autocomplete
      id="country-select-demo"
      style={{ width: 300 }}
      options={props.countries}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      renderOption={(option) => (
        <React.Fragment>
          <span>{option}</span>
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          size="small"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
          InputProps={{ ...params.InputProps }}
        />
      )}
    />
  );
}
