import React, { Component } from 'react';
import {Bar, Line, Doughnut} from 'react-chartjs-2';
import '../../App.css';
import  * as charts from '../pages/manager/Chart';
import { withStyles } from "@material-ui/core/styles";
import  { useEffect } from 'react'
import  { useState } from 'react'
import axios from 'axios';
import TypeContext from '../../App'


export   class BarChart extends Component {
  constructor(){
    super();
    this.state = {
      chartData:{}
    }
  }

  componentWillMount(){
    this.getChartData();
  }

  getChartData(){
    this.setState({
      chartData:{
        labels: ['assembling', 'integrating', 'joining'],
        datasets:[
          {
            barPercentage: 2,
            barThickness: 11,
            maxBarThickness: 1,
            label:['Employee Count'],
            data:[
              5,
              7,
              14,
            ],fill: false,
            backgroundColor:[
              '#82C272',
              '#00A88F',
              '#0087AC'

            ]
          }



        ]
      }
    });
  }

  render() {
    return (
      <div className="App">
        
        <charts.BarChart chartData={this.state.chartData} location="Employee Count" legendPosition="bottom"/>
      </div>
    );
  }
}

export  class DoughnutChart extends Component {
  constructor(){
    super();
    this.state = {
      chartData:{}
    }
  }

  componentWillMount(){
    this.getChartData();
  }

  getChartData(){
    this.setState({
      chartData:{
        labels: ['Reviewed', 'Pending'],
        datasets:[
          {
            

            label:['Reviewed', 'Pending'],
            data:[
              617594,
              181045
            ],
            backgroundColor:[
              '#3BB58F',
              '#3A63AD'
            ]
          }
        ]
      }
    });
  }

  render() {
    return (
      <div className="App">
        
        <charts.DoughnutChart chartData={this.state.chartData} location="Timesheets" legendPosition="bottom"/>
      </div>
    );
  }
}


const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  }
});

export  function DoughnutChartforhours1 (props)
{

  const [projects, setProjects] = useState(props.names);

  const [hours, setHours] = useState(props.hours);

  const [color, setColor] = useState();
  const [chartData, setchartData] = useState({});

  const Type = TypeContext;
  useEffect(() => {

    

    var token = localStorage.getItem('token');

    axios.get('https://localhost:44336/api/managerlogin/projecthours' , { headers: {"Authorization" : `Bearer ${token}`} }
    )
     .then(response => {
      setProjects(response.data.names);
      setHours(response.data.hours);
       console.log(response.data);

       setchartData({
        labels: response.data.names,
        datasets:[
          {
            
            labels: response.data.names,
            data:response.data.hours,
            backgroundColor:[
              '#E65F8E',
              '#A86BD1',
              '#3AA5D1',
              'rgba(255, 99, 71, 1)',
              'rgba(54, 16, 25, 0.6)',
              'rgba(5, 9, 12, 0.6)',
              'rgba(54, 2, 235, 0.6)',
            ]
          }
        ]
      })
   


     })
     .catch(error => {

    

      console.log('error', error);
 
        });

        setColor(Type.type);




  },[]);


  return (
    <div className="App">
      
      <Doughnut
          data={chartData}
          options={
            {
              legend: {
                color:"red",
                display:true,
                position:"bottom",
                labels: {
                    fontColor:Type.type==="light"?"white":"black",
                    fontSize: 13
                },
               title:{
              display:false,
              text:"this.props.location",
              fontSize:18
            }
          }
        }
      }
        />
   
   
   
   
   
    </div>
  )
}



export  class DoughnutChartforhours extends Component {
  constructor(){
    super();
    this.state = {
      chartData:{},
    }
  }



componentDidMount()
{ 
  
  console.log(this.props.names);
  this.getChartData();

}

  getChartData(){
    this.setState({
      chartData:{
        labels: this.state.names,
        datasets:[
          {
            
            labels: this.state.names,
            data:this.state.hours,
            backgroundColor:[
              '#E65F8E',
              '#A86BD1',
              '#3AA5D1'

            ]
          }
        ]
      }
    });
  }

  render() {
    return (
      <div className="App">
        
        <charts.DoughnutChart chartData={this.state.chartData}  location=" Project Hours" legendPosition="bottom"/>
      </div>
    );
  }
}


export  class DoughnutChartforhoursforemployee extends Component {
  constructor(){
    super();
    this.state = {
      chartData:{}
    }
  }

  componentWillMount(){
    this.getChartData();
  }

  getChartData(){
    this.setState({
      chartData:{
        labels: ['assembling', 'integrating'],
        datasets:[
          {
            

            labels: ['assembling'],
            data:[
              61,
              18
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)'

            ]
          }
        ]
      }
    });
  }

  render() {
    return (
      <div className="App">
        
        <charts.DoughnutChart chartData={this.state.chartData} location="" legendPosition="bottom"/>
      </div>
    );
  }
}


export  class Linechartforemployee extends Component {
  constructor(){
    super();
    this.state = {
      chartData:{}
    }
  }

  componentWillMount(){
    this.getChartData();
  }

  getChartData(){
    this.setState({
      chartData:{
        labels: ['Monday', 'Tuesday', 'Wednesday','Thursday','Friday'],
        datasets:[
          {
            

            label: "Working Hours",
            data:[
              9,
              11,
              5,
              7,9
            ],  fill: false,    tension: 0.1,

            borderColor:
              'rgba(255, 99, 71, 1)'

            
          }
        ]
      }
    });
  }

  render() {
    return (
      <div className="App">
        
        <charts.Linechart chartData={this.state.chartData} location="" legendPosition="bottom"/>
      </div>
    );
  }
}



export  class App extends Component {
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
            label: "Reject Count",
            backgroundColor: "rgba(60, 179, 113,0.2)",
            borderColor: "rgba(60, 179, 113,1)",
            borderWidth: 1,
            //stack: 1,
            hoverBackgroundColor: "rgba(60, 179, 113,0.4)",
            hoverBorderColor: "rgba(60, 179, 113,1)",
            data: [65, 59, 80, 81, 0, 0, 0]
          },

          {
            label: "Resubmit Count",
            backgroundColor: "rgba(255, 165, 0,0.2)",
            borderColor: "rgba(255, 165, 0,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255, 165, 0,0.4)",
            hoverBorderColor: "rgba(255, 165, 0,1)",
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
        display: true,
        position:"bottom"
      },
      title:{
        display:false,
        text:"Project Hours",
        fontSize:18
      },
      type: "bar"
   
    };
    return (
      <Bar
        data={this.state.data}
      
        options={options}
      />
    );
  }
}
