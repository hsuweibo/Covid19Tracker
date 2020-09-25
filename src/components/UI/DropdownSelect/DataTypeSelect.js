/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  option: {
    fontSize: "1rem",
    // '& > span': {
    //   marginRight: 10,
    //   fontSize: 18,
    // },
  },
});

export default function DataTypeSelect(props) {
  const classes = useStyles();

  return (
    <Autocomplete
      style={{ width: 100 }}
      options={props.types}
      classes={{
        option: classes.option,
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
          label="Data type"
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
