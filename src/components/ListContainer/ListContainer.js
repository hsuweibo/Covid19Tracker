import React, { Component } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { getOverviewData } from "../../Data/WorldometersData";
import Spinner from "../UI/Spinner/Spinner";
import EnhancedTable from "../Table/Table";

const styles = (theme) => ({
  root: {
    height: "100%",
  },

  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    boxSizing: "border-box",
    height: "100%",
  },

  titleFlexItem: {
    flex: "0 0 auto",
    flexBasis: "auto",
  },

  tableFlexItem: {
    flex: "1 0 auto",
    paddingTop: theme.spacing(2),
  },

  // Set the height to 0, so that for the calculation of the entire column this component is in, this component's table's height is not taken into account.
  // Set the min-height to 100%, so that once the column height's is resolved/computed and rendered,
  // the tableRoot fills the height of the flex item (which flex-grows to fill the remaining height of the flex-container, which is set to 100% height of the column)
  tableRoot: {
    minHeight: "100%",
    height: "0",
  },
});

class ListContainer extends Component {
  state = {
    data: null,
    loadComplete: false,
  };

  componentDidMount() {
    getOverviewData().then((data) =>
      this.setState({ data: data, loadComplete: true })
    );
  }

  render() {
    const classes = this.props.classes;
    let table;
    if (!this.state.loadComplete) {
      table = <Spinner />;
    } else {
      table = (
        <EnhancedTable
          data={this.state.data}
          classes={{
            root: classes.tableRoot,
          }}
        />
      );
    }

    return (
      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
          <div className={classes.titleFlexItem}>
            <Typography variant="h4" align="center">
              Cases by Country
            </Typography>
          </div>
          <div className={classes.tableFlexItem}>{table}</div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(ListContainer);
