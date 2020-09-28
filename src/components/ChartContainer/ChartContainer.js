import React, { Component } from "react";
import { Card, CardContent, Typography, withStyles } from "@material-ui/core";
import DailyChangeChart from "./DailyChangeChart/DailyChangeChart";
import Spinner from "../Spinner/Spinner";

import CountrySelect from "../Select/CountrySelect";
import CountTypeSelect from "../Select/CountTypeSelect";
import DurationSelect from "../Select/DurationSelect";

import { getHistoricalData } from "../../Data/JHUData";
import * as CountTypes from "../../Constants/CountTypes";
import * as Countries from "../../Constants/Countries";

import * as Duration from "../../Constants/Duration";

const styles = (theme) => ({
  selectBar: {
    display: "flex",
    flexWrap: "wrap",
    margin: "8px",
  },

  countTypeSelect: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  countrySelect: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  durationSelect: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
});

class ChartContainer extends Component {
  state = {
    selectedCountry: null,
    selectedCountType: null,
    selectedDuration: null,
    data: null,
    selectedData: null,
    loadComplete: false,
  };

  componentDidMount() {
    getHistoricalData(Duration.ALL).then((data) => {
      this.setState({
        data: data,
        loadComplete: true,
        selectedCountry: Countries.WORLDWIDE,
        selectedCountType: CountTypes.ACTIVE,
        selectedDuration: Duration.ONE_MONTH, // Default duration
      });
      this.updateSelectedData();
    });
  }

  countTypeSelectHandler = (_event, value) => {
    this.setState({ selectedCountType: value });
    this.updateSelectedData();
  };

  countrySelectHandler = (_event, value) => {
    this.setState({ selectedCountry: value });
    this.updateSelectedData();
  };

  durationSelectHandler = (_event, value) => {
    this.setState({ selectedDuration: value });
    this.updateSelectedData();
  };

  updateSelectedData = () => {
    this.setState((prevState) => {
      const {
        selectedDuration,
        data,
        selectedCountry,
        selectedCountType,
      } = prevState;
      let range;
      switch (selectedDuration) {
        case Duration.ONE_WEEK:
          range = Object.entries(
            data[selectedCountry][selectedCountType]
          ).slice(-7);
          break;
        case Duration.TWO_WEEKS:
          range = Object.entries(
            data[selectedCountry][selectedCountType]
          ).slice(-14);
          break;
        case Duration.ONE_MONTH:
          range = Object.entries(
            data[selectedCountry][selectedCountType]
          ).slice(-30);
          break;
        case Duration.ALL:
          range = Object.entries(
            data[selectedCountry][selectedCountType]
          ).slice();
          break;
        default:
          range = [];
      }
      const selectedData = {};
      for (const [date, count] of range) {
        selectedData[date] = count;
      }
      return { ...prevState, selectedData: selectedData };
    });
  };

  render() {
    let content;
    if (!this.state.selectedData) {
      content = <Spinner />;
    } else {
      content = (
        <React.Fragment>
          <div className={this.props.classes.selectBar}>
            <CountrySelect
              countries={Object.keys(this.state.data)}
              onSelect={this.countrySelectHandler}
              value={this.state.selectedCountry}
              classes={{ root: this.props.classes.countrySelect }}
            />
            <CountTypeSelect
              value={this.state.selectedCountType}
              onSelect={this.countTypeSelectHandler}
              classes={{ root: this.props.classes.countTypeSelect }}
            />
            <DurationSelect
              onSelect={this.durationSelectHandler}
              value={this.state.selectedDuration}
              classes={{ root: this.props.classes.durationSelect }}
            />
          </div>

          <DailyChangeChart
            countType={this.state.selectedCountType}
            data={this.state.selectedData}
          />
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

export default withStyles(styles, { name: "ChartContainer" })(ChartContainer);
