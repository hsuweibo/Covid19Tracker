import { blue, red, green } from "@material-ui/core/colors";
import Chart from "chart.js";
import React, { Component } from "react";
import * as CountTypes from "../../../Constants/CountTypes";
import PropTypes from "prop-types";
import numeral from "numeral-es6";
import moment from "moment";

const settings = {
  [CountTypes.ACTIVE]: {
    borderColor: blue["A100"],
    backgroundColor: blue[200],
    labelText: "cases",
  },
  [CountTypes.DEATHS]: {
    borderColor: red["A100"],
    backgroundColor: red[200],
    labelText: "deaths",
  },
  [CountTypes.RECOVERED]: {
    borderColor: green["A100"],
    backgroundColor: green[200],
    labelText: "recoveries",
  },
};

const chartConfig = {
  type: "line",
  data: {}, // to be specified at runtime
  options: {
    hover: {
      intersect: true,
    },
    tooltips: {
      mode: "nearest",
      axis: "x",
      intersect: false,
      displayColors: false, // disable showing dataset colors (there will always only be one on the chart, so no reason to show)
      callbacks: {
        label: null, // to be specified at run-time
        title: function (tooltipItem, data) {
          return moment(data.labels[tooltipItem[0].index]).format(
            "MMM DD, YYYY"
          );
        },
      },
    },
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          display: true,
          afterBuildTicks: function (axis, ticks) {
            // Add surrounding spaces to prevent labels cluttering
            return ticks.map(
              (tick, index) => ` ${moment(tick).format("MMM DD")} `
            );
          },

          ticks: {
            maxRotation: 0,
            fontSize: 11,
          },
        },
      ],
      yAxes: [
        {
          // when the data is all 0, chart.js shows negative values for y-axis. This callback changes that behavior.
          afterDataLimits: (axis) => {
            if (axis.min < 0) {
              axis.min = 0;
            }
          },
          afterTickToLabelConversion: function (axis) {
            for (const i in axis.ticks) {
              axis.ticks[i] = numeral(axis.ticks[i]).format("0,0");
            }
          },
          ticks: {
            precision: 0, // avoids decimal
            fontSize: 11,
          },
        },
      ],
    },
  },
};

export default class DailyChangeChart extends Component {
  canvasRef = React.createRef();
  chart = null;

  constructor(props) {
    super();

    // Callback function that determines what to generate for a datapoint's tooltip content(label)
    const label = (tooltipItem, data) => {
      return (
        numeral(
          data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
        ).format("0,0") +
        " " +
        settings[this.props.countType].labelText
      );
    };

    chartConfig.options.tooltips.callbacks.label = label;
  }

  /* Change the props data to a form accepted by the chart.js API. */
  propsDataToChartData = () => {
    const data = {
      // The keys are originally of the form "MM/DD/YY". Change it to a more tradition form, like 'Jan 04'.
      labels: Object.keys(this.props.data),
      datasets: [
        {
          // Label is by default used in legend and tooltip, but since we don't use legend, and the tooltip is customized,
          // this field can actually be anything
          label: settings[this.props.countType].labelText,
          backgroundColor: settings[this.props.countType].backgroundColor,
          borderColor: settings[this.props.countType].borderColor,
          data: Object.values(this.props.data),
        },
      ],
    };

    return data;
  };

  componentDidMount() {
    chartConfig.data = this.propsDataToChartData();

    this.chart = new Chart(
      this.canvasRef.current.getContext("2d"),
      chartConfig
    );
  }

  componentDidUpdate() {
    this.chart.data = this.propsDataToChartData();
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
  // The data. Each key should be a date of the form 'MM/DD/YY'. The values are numbers.
  data: PropTypes.object,
  countType: PropTypes.oneOf([
    CountTypes.ACTIVE,
    CountTypes.DEATHS,
    CountTypes.RECOVERED,
  ]),
};
