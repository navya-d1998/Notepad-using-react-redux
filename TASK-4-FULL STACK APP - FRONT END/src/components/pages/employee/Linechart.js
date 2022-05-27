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

  const [reviewed, setReviewed] = useState();

  const [pending, setPending] = useState();

  const [color, setColor] = useState();
  const [chartData, setchartData] = useState({});

  const Type = TypeContext;
  useEffect(() => {



    var token = localStorage.getItem('token');

    axios.get('https://localhost:44336/api/employeelogin/weekhours', { headers: { "Authorization": `Bearer ${token}` } }
    )
      .then(response => {

        setReviewed(response.data.hours);

        setPending(response.data.names)

        console.log(response.data);

        setchartData({
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          datasets: [
            {


              label: "Working Hours",
              data: response.data.hours, fill: false, tension: 0.1,

              borderColor:
                'rgba(255, 99, 71, 1)'

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

      <Line
        data={chartData}
        options={{

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
            color: "red",
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

