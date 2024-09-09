import React, { useEffect, useRef } from 'react'
import { Chart } from 'chart.js/auto'

const LineChart = () => {

  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d")

    chartInstance.current = new Chart (myChartRef, {
      type: 'line',
      data: {
        labels: ["Senin", 'Selasa', 'Rabu', 'Kamis', 'Jumat'],
        datasets: [
          {
            label: 'Statistik Kehadiran Siswa', 
            data: [10, 40, 20, 60, 70],
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1,
            tension: 0.3,
          }
        ]
      },
      options: {
        maintainAspectRatio: false
      }
    })
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    }
  }, [])

  return (
    <canvas ref={chartRef}/>
  )
}

export default LineChart
