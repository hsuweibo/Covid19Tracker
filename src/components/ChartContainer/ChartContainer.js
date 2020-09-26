import React, { Component } from "react";
import { Card, CardContent, Typography, withStyles } from "@material-ui/core";
import DailyChangeChart from "./DailyChangeChart/DailyChangeChart";
import Spinner from "../UI/Spinner/Spinner";

import CountrySelect from "../Select/CountrySelect";
import CountTypeSelect from "../Select/CountTypeSelect";

import { getHistoricalData } from "../../Data/JHUData";
import * as CountTypes from "../../Constants/CountTypes";
import * as Countries from "../../Constants/Countries";

const styles = (theme) => ({
  selectBar: {
    display: "flex",
    flexWrap: "wrap",
    margin: "8px 0px",
  },

  countrySelect: {
    marginLeft: 5,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: 0,
      marginTop: "1em",
    },
  },

  countTypeSelect: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
});

class ChartContainer extends Component {
  state = {
    selectedCountry: null,
    selectedCountType: null,
    data: null,
    loadComplete: false,
  };

  componentDidMount() {
    getHistoricalData().then((data) =>
      this.setState({
        data: data,
        loadComplete: true,
        selectedCountry: Countries.WORLDWIDE,
        selectedCountType: CountTypes.ACTIVE,
      })
    );
  }

  countTypeSelectHandler = (_event, value) => {
    this.setState({ selectedCountType: value });
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
            <CountTypeSelect
              countTypes={[
                CountTypes.ACTIVE,
                CountTypes.DEATHS,
                CountTypes.RECOVERED,
              ]}
              value={this.state.selectedCountType}
              onSelect={this.countTypeSelectHandler}
              classes={{ root: this.props.classes.countTypeSelect }}
            />
            <CountrySelect
              countries={Object.keys(this.state.data)}
              onSelect={this.countrySelectHandler}
              value={this.state.selectedCountry}
              classes={{ root: this.props.classes.countrySelect }}
            />
          </div>

          <DailyChangeChart
            countType={this.state.selectedCountType}
            data={
              this.state.data[this.state.selectedCountry][
                this.state.selectedCountType
              ]
            }
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

export default withStyles(styles)(ChartContainer);
