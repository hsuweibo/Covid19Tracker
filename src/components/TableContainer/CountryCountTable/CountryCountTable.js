import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";

import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import Paper from "@material-ui/core/Paper";
import numeral from "numeral-es6";
import * as CountTypes from "../../../Constants/CountTypes";
import PropTypes from "prop-types";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// array is an array of rows object
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    // pass in the entire row. If the result is equivalent, compare the index.
    // Whichever comes first has higher index
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// A component for the table header
function TableHeader(props) {
  const { classes, order, orderBy, onRequestSort, selectedColumns } = props;
  const createSortHandler = (column) => (event) => {
    onRequestSort(event, column);
  };

  let columns = ["country", ...selectedColumns];

  // Map column names to a label that will be displayed on the table.
  const labels = {
    [CountTypes.ACTIVE]: "Cases",
    [CountTypes.DEATHS]: "Deaths",
    [CountTypes.RECOVERED]: "Recovered",
    [CountTypes.NEW_ACTIVE]: "New Cases",
    [CountTypes.NEW_DEATHS]: "New Deaths",
    [CountTypes.NEW_RECOVERED]: "New Recovered",
    country: "Country",
  };

  // A configuration object used in return statement
  let headers = columns.map((column) => ({
    column: column,
    label: labels[column],
    numeric: column === "country" ? false : true,
    disablePadding: false,
  }));

  return (
    <TableHead>
      <TableRow>
        {headers.map((h) => (
          <TableCell
            key={h.column}
            align={h.numeric ? "right" : "left"}
            padding={h.disablePadding ? "none" : "default"}
            sortDirection={orderBy === h.column ? order : false}
          >
            <TableSortLabel
              active={orderBy === h.column}
              direction={orderBy === h.column ? order : "asc"}
              onClick={createSortHandler(h.column)}
            >
              {h.label}
              {orderBy === h.column ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },

  container: {
    height: "100%",
  },

  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function CountryCountTable(props) {
  const { rows, selectedColumns, defaultOrderBy } = props;

  const classes = useStyles(props);
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState(defaultOrderBy);

  const handleRequestSort = (event, column) => {
    // Any clicks on a non-active column makes isAsc false, because by default non-active col are always descending
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table
          stickyHeader
          className={classes.table}
          aria-labelledby="tableTitle"
          size="small"
          aria-label="country count table"
        >
          <TableHeader
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            selectedColumns={selectedColumns}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row) => {
              const countryCell = (
                <TableCell component="th" scope="row" padding="default">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={row.flag}
                      alt="flag"
                      width="20px"
                      style={{
                        verticalAlign: "middle",
                        marginRight: "5px",
                      }}
                    ></img>
                    {row.country}
                  </div>
                </TableCell>
              );

              const selectedCells = selectedColumns.map((col) => (
                <TableCell align="right" key={col}>
                  {numeral(row[col]).format("0,0")}
                </TableCell>
              ));

              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.country}>
                  {countryCell}
                  {selectedCells}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

CountryCountTable.propTypes = {
  // An array of the column names to display for the dataset. Valid column names are enumerated by the CountTypes constants.
  //'country' is also a valid column name, but is always selected by default.
  columns: PropTypes.arrayOf(
    PropTypes.oneOf([
      CountTypes.ACTIVE,
      CountTypes.DEATHS,
      CountTypes.RECOVERED,
      CountTypes.NEW_ACTIVE,
      CountTypes.NEW_DEATHS,
      CountTypes.NEW_RECOVERED,
    ])
  ),
  // The rows of data. Each row represent a country. 'country' and each of the CountTypes constants represent a column of the row.
  rows: PropTypes.arrayOf(
    PropTypes.exact({
      country: PropTypes.string,
      flag: PropTypes.string, // A url to an img of the country's national flag
      [CountTypes.ACTIVE]: PropTypes.number,
      [CountTypes.DEATHS]: PropTypes.number,
      [CountTypes.RECOVERED]: PropTypes.number,
      [CountTypes.NEW_ACTIVE]: PropTypes.number,
      [CountTypes.NEW_DEATHS]: PropTypes.number,
      [CountTypes.NEW_RECOVERED]: PropTypes.number,
    })
  ),

  // The column to sort by; should be a column in the 'columns' props, or the 'country' column
  defaultOrderBy: PropTypes.oneOf([
    "country",
    CountTypes.ACTIVE,
    CountTypes.DEATHS,
    CountTypes.RECOVERED,
    CountTypes.NEW_ACTIVE,
    CountTypes.NEW_DEATHS,
    CountTypes.NEW_RECOVERED,
  ]),
};
