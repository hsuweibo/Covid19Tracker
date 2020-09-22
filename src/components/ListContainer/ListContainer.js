import React, { Component } from "react";
import { Card, CardContent } from "@material-ui/core";

class ListContainer extends Component {
  render() {
    return (
      <Card style={{ height: "100%" }}>
        <CardContent>
          <table>
            <tr>
              <td>Canada</td>
              <td>65465</td>
            </tr>
          </table>
        </CardContent>
      </Card>
    );
  }
}

export default ListContainer;
