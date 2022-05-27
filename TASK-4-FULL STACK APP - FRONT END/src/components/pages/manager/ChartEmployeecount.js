import React, { Component } from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import '../../../App.css';
import { withStyles } from "@material-ui/core/styles";
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import TypeContext from '../../../App';
import { useThemestate } from '../../../App';
export default function DoughnutChartforhours1(props) {
  const themestate = useThemestate();

  const [projects, setProjects] = useState(props.names);

  const [hours, setHours] = useState(props.hours);

  const [color, setColor] = useState();

  const [chartData, setchartData] = useState({});


  useEffect(() => {



    var token = localStorage.getItem('token');

    axios.get('https://localhost:44336/api/managerlogin/projectcount', { headers: { "Authorization": `Bearer ${token}` } }
    )
      .then(response => {

        console.log(response.data);

        setchartData({
          labels: response.data.names,
          datasets: [
            {
              barPercentage: 2,
              barThickness: 11,
              maxBarThickness: 1,
              label: ['Employee Count'],
              data: response.data.hours

              , fill: false,
              backgroundColor: [
                '#82C272',
                '#00A88F',
                '#0087AC',
                '#673ab7',
                '#333ab7',
                '#673444',
                "#455a64"

              ]
            }
          ]
        })

      })
      .catch(error => {

        console.log('error', error);

      });

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
                fontSize: 13,
                fontColor: themestate.theme.palette.type == "light" ? "black" : "white",
              },
            }
          }}
      />


    </div>
  )
}

