import React, { Component } from "react";
import { Card, CardContent, Typography, withStyles } from "@material-ui/core";
import HistoryChart from "./HistoryChart/HistoryChart";
import Spinner from "../UI/Spinner/Spinner";

import CountrySelect from "../UI/DropdownSelect/CountrySelect";
import DataTypeSelect from "../UI/DropdownSelect/DataTypeSelect";

import { getHistoricalData } from "../../Data/JHUData";
import * as CountTypes from "../../Constants/CountTypes";
import * as Countries from "../../Constants/Countries";

const styles = {
  selectBar: {
    display: "flex",
    margin: "8px 0px",
  },

  countrySelect: {
    marginLeft: 5,
  },
};

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
        selectedCountry: Countries.WORLDWIDE,
        selectedDataType: CountTypes.ACTIVE,
      })
    );
  }

  dataTypeSelectHandler = (_event, value) => {
    this.setState({ selectedDataType: value });
  };

  countrySelectHandler = (_event, value) => {
    this.setState({ selectedCountry: value });
  };

  render() {
    let content;
    if (!this.state.loadComplete) {
      content = <Spinner />;
    } else {
      content = (
        <React.Fragment>
          <div className={this.props.classes.selectBar}>
            <DataTypeSelect
              types={[
                CountTypes.ACTIVE,
                CountTypes.DEATHS,
                CountTypes.RECOVERED,
              ]}
              defaultValue={CountTypes.ACTIVE}
              onSelect={this.dataTypeSelectHandler}
            />
            <CountrySelect
              countries={Object.keys(this.state.data)}
              onSelect={this.countrySelectHandler}
              defaultValue={Countries.WORLDWIDE}
              classes={{ root: this.props.classes.countrySelect }}
            />
          </div>

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

export default withStyles(styles)(ChartContainer);
