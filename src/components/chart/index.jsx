import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const LineChart = ({ presenceData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");

    const labels = presenceData.map(item => item.tanggal);
    const dataTepat = presenceData.map(item => parseInt(item.tepat, 10));
    const dataTelat = presenceData.map(item => parseInt(item.telat, 10));
    const dataIzin = presenceData.map(item => parseInt(item.izin, 10));
    const dataSakit = presenceData.map(item => parseInt(item.sakit, 10));
    const dataTanpaKeterangan = presenceData.map(item => parseInt(item.tanpa_keterangan, 10));
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    chartInstance.current = new Chart(myChartRef, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Tepat Waktu',
            data: dataTepat,
            fill: true,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.3,
            borderWidth: 1
          },
          {
            label: 'Telat',
            data: dataTelat,
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.3,
            borderWidth: 1
          },
          {
            label: 'Izin',
            data: dataIzin,
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            tension: 0.3,
            borderWidth: 1
          },
          {
            label: 'Sakit',
            data: dataSakit,
            fill: true,
            backgroundColor: 'rgba(255, 205, 86, 0.2)',
            borderColor: 'rgb(255, 205, 86)',
            tension: 0.3,
            borderWidth: 1
          },
          {
            label: 'Tanpa Keterangan',
            data: dataTanpaKeterangan,
            fill: true,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgb(153, 102, 255)',
            tension: 0.3,
            borderWidth: 1
          },
        ]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          },
          x: {
            ticks: {
              maxRotation: isMobile ? 1 : 0,
              minRotation: isMobile ? 1 : 0,
              callback: function(value) {
                const label = this.getLabelForValue(value);
                return isMobile && label.length > 3 ? label.substring(0, 3) + '...' : label;
              }
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [presenceData]);

  return <canvas ref={chartRef} />;
};

export default LineChart;
