import React, { Component } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { getOverviewData } from "../../Data/WorldometersData";
import Spinner from "../UI/Spinner/Spinner";
import EnhancedTable from "../Table/Table";

const styles = {
  root: {
    height: "400px",
    minHeight: "100%",
  },

  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
    height: "100%",
  },
};

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
    let items;
    if (!this.state.loadComplete) {
      items = (
        <Spinner />
        // <tr>
        //   <td>
        //     <Spinner />
        //   </td>
        // </tr>
      );
    } else {
      // items = Object.keys(this.state.data).map((country) => {
      //   return (
      //     <tr key={country}>
      //       <td>{country}</td>
      //       <td>{this.state.data[country].cases}</td>
      //     </tr>
      //   );
      // });
      items = <EnhancedTable data={this.state.data} />;
    }

    return (
      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h4">Cases by Country</Typography>
          {items}
          {/* <table>
            <tbody>{items}</tbody>
          </table> */}
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(ListContainer);
