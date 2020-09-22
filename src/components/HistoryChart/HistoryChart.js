import { blue, red, green } from "@material-ui/core/colors";
import Chart from "chart.js";
import React, { Component } from "react";

const settings = {
  cases: {
    borderColor: blue["A100"],
    backgroundColor: blue[200],
  },
  deaths: {
    borderColor: red["A100"],
    backgroundColor: red[200],
  },
  recovered: {
    borderColor: green["A100"],
    backgroundColor: green[200],
  },
};

class HistoryChart extends Component {
  canvasRef = React.createRef();

  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current.getContext("2d"), {
      type: "line",
      data: {
        labels: this.props.labels,
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: settings[this.props.dataType].backgroundColor,
            borderColor: settings[this.props.dataType].borderColor,
            data: this.props.data,
          },
        ],
      },
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
                  // Hide the label of every 2nd dataset. return null to hide the grid line too
                  return index % 5 === 0 ? dataLabel : "";
                },
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                // min: 0,
                precision: 0,
              },
            },
          ],
        },
      },
    });
  }

  componentDidUpdate() {
    this.myChart.data.datasets[0].data = this.props.data;
    this.myChart.data.labels = this.props.labels;
    this.myChart.data.datasets[0].backgroundColor =
      settings[this.props.dataType].backgroundColor;
    this.myChart.data.datasets[0].borderColor =
      settings[this.props.dataType].borderColor;
    this.myChart.update();
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        <canvas ref={this.canvasRef}></canvas>
      </div>
    );
  }
}

export default HistoryChart;
