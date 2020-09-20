import React from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      margin: "1em 0",
      textAlign: "right",
      [theme.breakpoints.down("xs")]: {
        textAlign: "center",
      },
    },

    formControl: {
      [theme.breakpoints.down("xs")]: {
        width: "80%",
      },
    },

    menuItem: {
      textAlign: "right",
      marginRight: "1em",
      display: "block",
    },
  }),
  { name: "DropdownSelect" }
);

const DropdownSelect = (props) => {
  const { label, options, defaultValue, onSelectChange } = props;
  const classes = useStyles();

  const menuItems = options.map((o, index) => (
    <MenuItem className={classes.menuItem} key={`${o} ${index}`} value={o}>
      {o}
    </MenuItem>
  ));

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel id={`${label}-selector-label`}>{label}</InputLabel>
        <Select
          labelId={`${label}-selector-label`}
          value={defaultValue}
          onChange={onSelectChange}
          label={label}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
            transformOrigin: {
              horizontal: "right",
              vertical: "top",
            },
            getContentAnchorEl: null,
            style: { height: "300px" },
          }}
        >
          {menuItems}
        </Select>
      </FormControl>
    </div>
  );
};

export default DropdownSelect;
