import React, { Component } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import styles from "./ChartContainer.module.css";
import HistoryChart from "../HistoryChart/HistoryChart";

class ChartContainer extends Component {
  state = {
    selectedCountry: "Worldwide",
    data: null,
    loadComplete: false,
  };

  componentDidMount() {
    const convertToIncrementalData = (cumulatedData) => {
      const incrementalData = {};
      let prevCount = null;
      for (const [currDate, currCount] of Object.entries(cumulatedData)) {
        if (prevCount) {
          incrementalData[currDate] = currCount - prevCount;
        }
        prevCount = currCount;
      }
      return incrementalData;
    };

    fetch("https://disease.sh/v3/covid-19/historical?lastdays=30")
      .then((response) => response.json())
      .then((fetchedData) => {
        const newData = {};
        for (let datum of fetchedData) {
          newData[datum.country] = {
            cases: convertToIncrementalData(datum.timeline.cases),
          };
        }
        this.setState({ data: newData, loadComplete: true });
      });
    // .then(() => {
    //   return fetch("https://disease.sh/v3/covid-19/all?yesterday=true")
    //     .then((response) => response.json())
    //     .then((fetchedData) => {
    //       const {
    //         cases,
    //         todayCases: newCases,
    //         deaths,
    //         todayDeaths: newDeaths,
    //         recovered,
    //         todayRecovered: newRecovered,
    //       } = fetchedData;
    //       const worldwideData = {
    //         cases,
    //         newCases,
    //         deaths,
    //         newDeaths,
    //         recovered,
    //         newRecovered,
    //       };
    //       this.setState((prevState) => {
    //         const newState = {
    //           ...prevState,
    //           data: { Worldwide: worldwideData, ...prevState.data },
    //           loadComplete: true,
    //         };
    //         return newState;
    //       });
    //     });
    // });
  }

  render() {
    return (
      <Card className={styles.card}>
        <CardContent>
          <Typography variant="h4" align="center">
            Historical Data
          </Typography>
          {this.state.loadComplete ? (
            <HistoryChart
              labels={Object.keys(this.state.data.Afghanistan.cases)}
              data={Object.values(this.state.data.Afghanistan.cases)}
            ></HistoryChart>
          ) : null}
        </CardContent>
      </Card>
    );
  }
}

export default ChartContainer;
