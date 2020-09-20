import React, { Component } from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";

import CountBox from "../CountBox/CountBox";
import Spinner from "../UI/Spinner/Spinner";
import DropdownSelect from "../UI/DropdownSelect/DropdownSelect";

const styles = (theme) => ({
  root: {
    margin: "2em",
  },
});

class OverviewContainer extends Component {
  state = {
    selectedCountry: null,
    data: null,
    loadComplete: false,
  };

  componentDidMount() {
    fetch("https://disease.sh/v3/covid-19/countries?yesterday=true")
      .then((response) => response.json())
      .then((fetchedData) => {
        const newData = {};
        for (let datum of fetchedData) {
          newData[datum.country] = {
            cases: datum.cases,
            newCases: datum.todayCases,
            deaths: datum.deaths,
            newDeaths: datum.todayDeaths,
            recovered: datum.recovered,
            newRecovered: datum.todayRecovered,
          };
        }
        this.setState({ data: newData });
      })
      .then(() => {
        return fetch("https://disease.sh/v3/covid-19/all?yesterday=true")
          .then((response) => response.json())
          .then((fetchedData) => {
            const {
              cases,
              todayCases: newCases,
              deaths,
              todayDeaths: newDeaths,
              recovered,
              todayRecovered: newRecovered,
            } = fetchedData;
            const worldwideData = {
              cases,
              newCases,
              deaths,
              newDeaths,
              recovered,
              newRecovered,
            };
            this.setState((prevState) => {
              const newState = {
                ...prevState,
                selectedCountry: "Worldwide",
                data: { Worldwide: worldwideData, ...prevState.data },
                loadComplete: true,
              };
              return newState;
            });
          });
      });
  }

  countrySelectHandler = (event) => {
    this.setState({ selectedCountry: event.target.value });
  };

  render() {
    const { classes } = this.props;
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

          <Grid container className={classes.panel}>
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
      <Card className={classes.root}>
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

export default withStyles(styles)(OverviewContainer);
