import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';

const StyledGraph = styled('div')(() => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  zIndex: 100,
}));

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  annotationPlugin,
);

const data = {
  labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgb(75, 192, 192, 0.2)',
      tension: 0.3,
    },
  ],
};

export const TrendChart = (props: any) => {
  const options: any = {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {},
    },
  };
  const graphData = {
    labels: props.data.x,
    datasets: [
      {
        label: 'test graph',
        data: props.data.y,
        borderColor: '#055aaf',
        tension: 0.3,
      },
    ],
  };

  return (
    <div
      style={{
        width: '1000px',
        height: '500px',
        marginTop: '30px',
        marginBottom: '30px',
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
};
