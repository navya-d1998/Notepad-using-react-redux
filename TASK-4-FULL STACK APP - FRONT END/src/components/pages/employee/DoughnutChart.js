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

    axios.get('https://localhost:44336/api/employeelogin/projecttimesheetcount', { headers: { "Authorization": `Bearer ${token}` } }
    )
      .then(response => {

        setReviewed(response.data[0]);
        setPending(response.data[1])

        console.log(response.data);

        setchartData({
          labels: ['Submitted', 'Pending'],
          datasets: [
            {

              labels: ['Submitted', 'Pending'],
              data: [response.data[0], response.data[1]],
              backgroundColor: [
                '#3BB58F',
                '#3A63AD'
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

