import { blue, red, green } from "@material-ui/core/colors";
import Chart from "chart.js";
import React, { Component } from "react";
import * as CountTypes from "../../../Constants/CountTypes";
import PropTypes from "prop-types";

const settings = {
  [CountTypes.ACTIVE]: {
    borderColor: blue["A100"],
    backgroundColor: blue[200],
  },
  [CountTypes.DEATHS]: {
    borderColor: red["A100"],
    backgroundColor: red[200],
  },
  [CountTypes.RECOVERED]: {
    borderColor: green["A100"],
    backgroundColor: green[200],
  },
};

const chartConfig = {
  type: "line",
  data: {}, // to be filled in at runtime
  options: {
    hover: {
      intersect: true,
    },
    tooltips: {
      mode: "nearest",
      intersect: false,
    },
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          display: true,
          ticks: {
            callback: function (dataLabel, index) {
              // Hide the label of every 5th dataset. return null to hide the grid line too
              return index % 5 === 0 ? dataLabel : "";
            },
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            precision: 0,
          },
        },
      ],
    },
  },
};

export default class DailyChangeChart extends Component {
  canvasRef = React.createRef();
  chart = null;

  componentDidMount() {
    const data = {
      labels: Object.keys(this.props.data),
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: settings[this.props.countType].backgroundColor,
          borderColor: settings[this.props.countType].borderColor,
          data: Object.values(this.props.data),
        },
      ],
    };
    chartConfig.data = data;
    this.chart = new Chart(
      this.canvasRef.current.getContext("2d"),
      chartConfig
    );
  }

  componentDidUpdate() {
    const data = {
      labels: Object.keys(this.props.data),
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: settings[this.props.countType].backgroundColor,
          borderColor: settings[this.props.countType].borderColor,
          data: Object.values(this.props.data),
        },
      ],
    };

    this.chart.data = data;
    this.chart.update();
  }

  render() {
    return (
      <div>
        <canvas ref={this.canvasRef}></canvas>
      </div>
    );
  }
}

DailyChangeChart.propTypes = {
  data: PropTypes.object,
  countType: PropTypes.oneOf([
    CountTypes.ACTIVE,
    CountTypes.DEATHS,
    CountTypes.RECOVERED,
  ]),
};
