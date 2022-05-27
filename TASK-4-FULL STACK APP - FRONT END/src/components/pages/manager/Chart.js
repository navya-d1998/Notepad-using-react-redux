import React, { Component } from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import TypeContext from '../../pages/manager/Chart2';
import { withStyles } from "@material-ui/core/styles";


const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.main
  }
});

export class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData
    }
  }





  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right',
    location: 'City'
  }

  render() {
    return (
      <div className="chart">
        <Bar
          data={this.state.chartData}
          options={

            {
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }],
                xAxes: [{
                  barPercentage: 0.4
                }]
              },


              title: {
                display: false,
                text: this.props.location,
                fontSize: 18
              },
              legend: {
                display: this.props.displayLegend,
                position: this.props.legendPosition
              }
            }}
        />


      </div>
    )
  }
}





export class DoughnutChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData,


    }
  }



  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right',
    location: 'City'
  }

  render() {

    return (
      <div className="chart">


        <Doughnut
          data={this.state.chartData}
          options={
            {
              legend: {
                display: this.props.displayLegend,
                position: this.props.legendPosition,
                labels: {
                  fontSize: 13
                },

                title: {
                  display: false,
                  text: this.props.location,
                  fontSize: 18
                }
              }
            }
          }
        />
      </div>
    )
  }

}


export class Linechart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData
    }
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right',
    location: 'City'
  }
  render() {
    return (
      <div className="chart">
        <Line
          data={this.state.chartData}
          options={{
            title: {
              display: false,
              text: this.props.location,
              fontSize: 18
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            }
          }}
        />
      </div>
    )
  }
}


export
  class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "My First dataset",
            color: "rgba(255,99,132,0.2)",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            //stack: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
          },

          {
            label: "My second dataset",
            backgroundColor: "rgba(155,231,91,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [45, 79, 50, 41, 16, 85, 20]
          }
        ]
      }
    };
  }

  render() {
    const options = {
      responsive: true,
      legend: {
        display: false
      },
      type: "bar"

    };
    return (
      <Bar
        data={this.state.data}
        width={null}
        height={null}
        options={options}

      />


    );
  }
}


