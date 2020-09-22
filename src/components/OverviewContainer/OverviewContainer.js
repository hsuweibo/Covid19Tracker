import React, { Component } from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";

import { getOverviewData } from "../../Data/WorldometersData";

import CountBox from "../CountBox/CountBox";
import Spinner from "../UI/Spinner/Spinner";
import DropdownSelect from "../UI/DropdownSelect/DropdownSelect";

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
        selectedCountry: "Worldwide",
      });
    });
  }

  countrySelectHandler = (event) => {
    this.setState({ selectedCountry: event.target.value });
  };

  render() {
    let content;
    if (!this.state.loadComplete) {
      content = <Spinner></Spinner>;
    } else {
      const countryNames = Object.keys(this.state.data);
      const countryDropdownSelect = (
        <DropdownSelect
          label="Country"
          defaultValue={this.state.selectedCountry}
          onSelectChange={this.countrySelectHandler}
          options={countryNames}
        />
      );

      const selectedCountryData = this.state.data[this.state.selectedCountry];
      console.log(selectedCountryData);
      content = (
        <React.Fragment>
          {countryDropdownSelect}

          <Grid container>
            <Grid item xs={12} sm={4}>
              <CountBox
                countType="cases"
                newCount={selectedCountryData.newCases}
                totalCount={selectedCountryData.cases}
              ></CountBox>
            </Grid>
            <Grid item xs={12} sm={4}>
              <CountBox
                countType="deaths"
                newCount={selectedCountryData.newDeaths}
                totalCount={selectedCountryData.deaths}
              ></CountBox>
            </Grid>
            <Grid item xs={12} sm={4}>
              <CountBox
                countType="recovered"
                newCount={selectedCountryData.newRecovered}
                totalCount={selectedCountryData.recovered}
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

export default OverviewContainer;
