import Chart from "chart.js";
import React, { Component } from "react";

class HistoryChart extends Component {
  canvasRef = React.createRef();

  componentDidMount() {
    const myFunc = function (dataLabel, index) {
      // Hide the label of every 2nd dataset. return null to hide the grid line too
      return index % 30 === 0 ? dataLabel : "";
    };
    this.myChart = new Chart(this.canvasRef.current.getContext("2d"), {
      type: "line",
      data: {
        labels: this.props.labels,
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
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
              beforeUpdate: function (dataLabel, index) {
                console.log("hello");
                // Hide the label of every 2nd dataset. return null to hide the grid line too
                return index % 2 === 0 ? dataLabel : "";
              },
              ticks: {
                callback: function (dataLabel, index) {
                  console.log("hello");
                  // Hide the label of every 2nd dataset. return null to hide the grid line too
                  return index % 2 === 0 ? dataLabel : "";
                },
              },
            },
          ],
        },
      },
    });
  }

  render() {
    return <canvas ref={this.canvasRef}></canvas>;
  }
}

export default HistoryChart;
