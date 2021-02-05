import React from "react";
import { Bar } from "react-chartjs-2";
import styled from "styled-components/macro";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import Chart from "chart.js";

import { PALETTE } from "../../lib/constants";

const StyledBar = styled(Bar)`
  margin-bottom: 10px;
  background-color: ${PALETTE.color8};
`;

const Diagram = () => {
  return (
    <StyledBar
      data={
        {
          labels: [
            "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
          ],
          datasets: [
            {
              label: "Number of seizures by day",
              data: [
                1, 2, 0, 3, 5, 1, 0
              ],
              backgroundColor: `${PALETTE.color4}`,
              // backgroundColor: `#ab47bc`,
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
    </StyledBar >
  )
};

export default Diagram;