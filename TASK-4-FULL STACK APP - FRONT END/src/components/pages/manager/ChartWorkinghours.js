import React, { Component } from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import '../../../App.css';
import { useThemestate } from '../../../App';

import { withStyles } from "@material-ui/core/styles";
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import TypeContext from '../../../App'




export default function DoughnutChartforhours1(props) {

  const themestate = useThemestate();


  const [color, setColor] = useState();
  const [chartData, setchartData] = useState({});


  useEffect(() => {



    var token = localStorage.getItem('token');

    axios.get('https://localhost:44336/api/managerlogin/projectstatuscount', { headers: { "Authorization": `Bearer ${token}` } }
    )
      .then(response => {

        console.log(response.data);

        setchartData({
          labels: ["created", "Not Alloted", "Alloted", "In Progress", "Approved", "Pending"],
          datasets: [
            {

              labels: ["created", "Not Alloted", "Alloted", "In Progress", "Approved", "Pending"],
              data: response.data,
              backgroundColor: [
                '#E65F8E',
                '#A86BD1',
                '#3AA5D1',
                '#a1887f',
                '#009688',
                '#fff176',
                '#37474f',
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

      <Doughnut
        data={chartData}
        options={
          {
            legend: {
              color: "red",
              display: true,
              position: "bottom",
              labels: {
                fontColor: themestate.theme.palette.type == "light" ? "black" : "white",
                //fontColor:"red",
                fontSize: 13
              },
              title: {
                display: false,
                text: "this.props.location",
                fontSize: 18
              }
            }
          }
        }
      />



    </div>
  )
}

