import React, { Component } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import HistoryChart from "../HistoryChart/HistoryChart";
import Spinner from "../UI/Spinner/Spinner";
import DropdownSelect from "../UI/DropdownSelect/DropdownSelect";

import { getHistoricalData } from "../../Data/JHUData";

class ChartContainer extends Component {
  state = {
    selectedCountry: null,
    selectedDataType: null,
    data: null,
    loadComplete: false,
  };

  componentDidMount() {
    getHistoricalData().then((data) =>
      this.setState({
        data: data,
        loadComplete: true,
        selectedCountry: "Worldwide",
        selectedDataType: "cases",
      })
    );
  }

  dataTypeSelectHandler = (event) => {
    this.setState({ selectedDataType: event.target.value });
  };

  countrySelectHandler = (event) => {
    this.setState({ selectedCountry: event.target.value });
  };

  render() {
    let content;
    if (!this.state.loadComplete) {
      content = <Spinner />;
    } else {
      content = (
        <React.Fragment>
          <DropdownSelect
            label="Category"
            options={["cases", "deaths", "recovered"]}
            defaultValue={this.state.selectedDataType}
            onSelectChange={this.dataTypeSelectHandler}
          />
          <DropdownSelect
            label="Country"
            options={Object.keys(this.state.data)}
            defaultValue={this.state.selectedCountry}
            onSelectChange={this.countrySelectHandler}
          />

          <HistoryChart
            dataType={this.state.selectedDataType}
            labels={Object.keys(
              this.state.data[this.state.selectedCountry][
                this.state.selectedDataType
              ]
            )}
            data={Object.values(
              this.state.data[this.state.selectedCountry][
                this.state.selectedDataType
              ]
            )}
          ></HistoryChart>
        </React.Fragment>
      );
    }
    return (
      <Card>
        <CardContent>
          <Typography variant="h4" align="center">
            Daily Changes
          </Typography>
          {content}
        </CardContent>
      </Card>
    );
  }
}

export default ChartContainer;
