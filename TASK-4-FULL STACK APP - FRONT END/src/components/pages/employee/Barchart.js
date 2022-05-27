import React, { Component } from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import '../../../App.css';
import { withStyles } from "@material-ui/core/styles";
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import TypeContext from '../../../App'
import { useThemestate } from '../../../App';
export default function DoughnutChartforhours1(props) {
  const themestate = useThemestate();

  const [projects, setProjects] = useState(props.names);

  const [hours, setHours] = useState(props.hours);

  const [color, setColor] = useState();

  const [chartData, setchartData] = useState({});

  const Type = TypeContext;
  useEffect(() => {

    var token = localStorage.getItem('token');

    axios.get('https://localhost:44336/api/employeelogin/bardata', { headers: { "Authorization": `Bearer ${token}` } }
    )
      .then(response => {
        console.log(response.data);

        setchartData({
          labels: response.data.lables,
          datasets: [
            {
              label: "Reject Count",
              backgroundColor: "rgba(60, 179, 113,0.2)",
              borderColor: "rgba(60, 179, 113,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(60, 179, 113,0.4)",
              hoverBorderColor: "rgba(60, 179, 113,1)",
              data: response.data.reject
            },

            {
              label: "Resubmit Count",
              backgroundColor: "rgba(255, 165, 0,0.2)",
              borderColor: "rgba(255, 165, 0,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255, 165, 0,0.4)",
              hoverBorderColor: "rgba(255, 165, 0,1)",
              data: response.data.resubmit
            }
          ]
        })


      })
      .catch(error => {

        console.log('error', error);

      });
    setColor(Type.type);
  }, []);


  return (
    <div className="App">


      <Bar
        data={chartData}
        options={

          {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  fontSize: 13,
                  fixedStepSize: 1,
                  fontColor: themestate.theme.palette.type == "light" ? "black" : "white",
                }
              }],
              xAxes: [{
                barPercentage: 0.4,

                ticks: {
                  fontSize: 13,

                  fontColor: themestate.theme.palette.type == "light" ? "black" : "white",
                }
              }]
            },


            title: {
              display: false,
              fontSize: 18
            },
            legend: {
              display: true,
              position: "bottom",
              labels: {
                fontColor: themestate.theme.palette.type == "light" ? "black" : "white",
                fontSize: 13
              },
            }
          }}
      />

    </div>
  )
}

