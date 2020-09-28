import React, { Component } from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { getOverviewData } from "../../Data/WorldometersData";

import CountBox from "./CountBox/CountBox";
import Spinner from "../Spinner/Spinner";
import CountrySelect from "../Select/CountrySelect";
import * as CountTypes from "../../Constants/CountTypes";
import * as Countries from "../../Constants/Countries";

const styles = (theme) => ({
  countrySelect: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
});

class OverviewContainer extends Component {
  state = {
    selectedCountry: null,
    data: null,
    loadComplete: false,
  };

  componentDidMount() {
    getOverviewData().then((data) => {
      this.setState({
        data: data,
        loadComplete: true,
        selectedCountry: Countries.WORLDWIDE, //The default selected country once loaded
      });
    });
  }

  countrySelectHandler = (event, value) => {
    this.setState({ selectedCountry: value });
  };

  render() {
    let content;
    if (!this.state.loadComplete) {
      content = <Spinner></Spinner>;
    } else {
      const countrySelect = (
        <div style={{ margin: "8px" }}>
          <CountrySelect
            countries={Object.keys(this.state.data)}
            onSelect={this.countrySelectHandler}
            value={this.state.selectedCountry}
            classes={{ root: this.props.classes.countrySelect }}
          />
        </div>
      );

      const selectedCountryData = this.state.data[this.state.selectedCountry];
      content = (
        <React.Fragment>
          {countrySelect}

          <Grid container>
            <Grid item xs={12} sm={4}>
              <CountBox
                countType={CountTypes.ACTIVE}
                newCount={selectedCountryData[CountTypes.NEW_ACTIVE]}
                totalCount={selectedCountryData[CountTypes.ACTIVE]}
              ></CountBox>
            </Grid>
            <Grid item xs={12} sm={4}>
              <CountBox
                countType={CountTypes.DEATHS}
                newCount={selectedCountryData[CountTypes.NEW_DEATHS]}
                totalCount={selectedCountryData[CountTypes.DEATHS]}
              ></CountBox>
            </Grid>
            <Grid item xs={12} sm={4}>
              <CountBox
                countType={CountTypes.RECOVERED}
                newCount={selectedCountryData[CountTypes.NEW_RECOVERED]}
                totalCount={selectedCountryData[CountTypes.RECOVERED]}
              ></CountBox>
            </Grid>
          </Grid>
        </React.Fragment>
      );
    }
    return (
      <Card>
        <CardContent>
          <Typography variant="h4" align="center">
            Cases Overview
          </Typography>
          {content}
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles, { name: "OverviewContainer" })(
  OverviewContainer
);
