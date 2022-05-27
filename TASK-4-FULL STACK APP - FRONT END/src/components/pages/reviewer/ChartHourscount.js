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

    axios.get('https://localhost:44336/api/reviewerlogin/projectstatuscount', { headers: { "Authorization": `Bearer ${token}` } }
    )
      .then(response => {
        setProjects(response.data.names);
        setHours(response.data.hours);
        console.log(response.data);

        setchartData({
          labels: ["Not Alloted", "Alloted", "In Progress", "Approved", "Pending"],
          datasets: [
            {

              labels: ["Not Alloted", "Alloted", "In Progress", "Approved", "Pending"],
              data: response.data,
              backgroundColor: [
                '#E65F8E',
                '#A86BD1',
                '#3AA5D1',
                '#ff7961',
                'rgba(54, 16, 25, 0.6)',
                "#fff176",
                'rgba(54, 2, 235, 0.6)',
                "#9e9e9e"
              ]
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

