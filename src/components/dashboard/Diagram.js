import React from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import moment from "moment";

import { PALETTE } from "../../lib/constants";

const Diagram = () => {
  const seizures = useSelector((store) => store.user.seizures);
  const seizureDatesMoment = seizures.map((item) => moment(item.seizureDate).format("L"));
  const today = moment().format("L");
  const todayMinus1 = moment(today).subtract(1, "days").format("L");
  const todayMinus2 = moment(today).subtract(2, "days").format("L");
  const todayMinus3 = moment(today).subtract(3, "days").format("L");
  const todayMinus4 = moment(today).subtract(4, "days").format("L");
  const todayMinus5 = moment(today).subtract(5, "days").format("L");
  const todayMinus6 = moment(today).subtract(6, "days").format("L");
  const todayNumber = seizureDatesMoment.filter(item => item === today).length;
  const todayMinus1Number = seizureDatesMoment.filter(item => item === todayMinus1).length;
  const todayMinus2Number = seizureDatesMoment.filter(item => item === todayMinus2).length;
  const todayMinus3Number = seizureDatesMoment.filter(item => item === todayMinus3).length;
  const todayMinus4Number = seizureDatesMoment.filter(item => item === todayMinus4).length;
  const todayMinus5Number = seizureDatesMoment.filter(item => item === todayMinus5).length;
  const todayMinus6Number = seizureDatesMoment.filter(item => item === todayMinus6).length;
  const dataAxisX = [
    moment(today).format("ddd"),
    moment(todayMinus1).format("ddd"),
    moment(todayMinus2).format("ddd"),
    moment(todayMinus3).format("ddd"),
    moment(todayMinus4).format("ddd"),
    moment(todayMinus5).format("ddd"),
    moment(todayMinus6).format("ddd"),
  ];
  const dataAxisY = [
    todayNumber,
    todayMinus1Number,
    todayMinus2Number,
    todayMinus3Number,
    todayMinus4Number,
    todayMinus5Number,
    todayMinus6Number,
  ];

  return (
    <Bar
      data={
        {
          labels: dataAxisX.reverse(),
          datasets: [
            {
              label: "Number of seizures by day",
              data: dataAxisY.reverse(),
              backgroundColor: `${PALETTE.color4}`,
              borderColor: `${PALETTE.color2}`,
              borderWidth: 1
            },
          ],
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    stepSize: 1
                  }
                }
              ]
            }
          }
        }
      }
      height={5}
      width={10}
      options={{
        // maintainAspectRatio: false
      }}
    >
    </Bar >
  )
};

export default Diagram;