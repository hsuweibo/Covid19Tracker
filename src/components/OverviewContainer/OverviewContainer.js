import React, { Component } from "react";
import {
  Card,
  CardContent,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Grid,
} from "@material-ui/core";
import styles from "./OverviewContainer.module.css";
import CountBox from "../CountBox/CountBox";
import Spinner from "../UI/Spinner/Spinner";

class OverviewContainer extends Component {
  state = {
    selectedCountry: "Worldwide",
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
          this.setState({ data: newData });
        }
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
    let content;
    if (!this.state.loadComplete) {
      content = <Spinner></Spinner>;
    } else {
      const countryOptions = Object.keys(this.state.data);
      const selectedCountryData = this.state.data[this.state.selectedCountry];
      console.log(selectedCountryData);
      content = (
        <React.Fragment>
          <div style={{ textAlign: "right" }}>
            <FormControl className={styles.formControl}>
              <InputLabel id="country-selector-label">Country</InputLabel>
              <Select
                className="TEST"
                labelId="country-selector-label"
                value={this.state.selectedCountry}
                onChange={this.countrySelectHandler}
                label="Country"
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right",
                  },
                  transformOrigin: {
                    horizontal: "right",
                  },
                  getContentAnchorEl: null,
                  style: { height: "300px" },
                }}
              >
                {countryOptions.map((country) => {
                  return (
                    <MenuItem
                      key={country}
                      value={country}
                      className={styles.menuItem}
                    >
                      {country}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>

          <Grid container>
            <Grid item xs className={styles.withDivider}>
              <CountBox
                countType="Cases"
                newCount={selectedCountryData.newCases}
                totalCount={selectedCountryData.cases}
              ></CountBox>
            </Grid>
            <Grid item xs className={styles.withDivider}>
              <CountBox
                countType="Deaths"
                newCount={selectedCountryData.newDeaths}
                totalCount={selectedCountryData.deaths}
              ></CountBox>
            </Grid>
            <Grid item xs className={styles.withDivider}>
              <CountBox
                countType="Recovered"
                newCount={selectedCountryData.newRecovered}
                totalCount={selectedCountryData.recovered}
              ></CountBox>
            </Grid>
          </Grid>
        </React.Fragment>
      );
    }
    return (
      <Card className={styles.card}>
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
