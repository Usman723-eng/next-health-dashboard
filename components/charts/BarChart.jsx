'use client';

import { useEffect, useRef } from 'react';
import { Chart, BarController, BarElement, LinearScale, CategoryScale } from 'chart.js';

Chart.register(BarController, BarElement, LinearScale, CategoryScale);

const BarChart = ({ data, color, barColors, compact }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    const maxVal = data.length ? Math.max(...data) : 0;
    const useCustomColors =
      Array.isArray(barColors) && barColors.length === data.length;

    const backgroundColor = useCustomColors
      ? barColors
      : data.map((v) => (v === maxVal ? '#FF4000' : '#BDBDBD'));

    const borderRadius = compact
      ? { topLeft: 4, topRight: 4, bottomLeft: 0, bottomRight: 0 }
      : 3;

    const dataMax = maxVal || 1;
    const ySuggestedMax = compact ? Math.max(dataMax * 2.1, 100) : undefined;

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: data.map((_, i) => i),
        datasets: [
          {
            data,
            backgroundColor,
            borderRadius,
            borderSkipped: false,
            ...(compact
              ? {
                  barThickness: 6,
                  maxBarThickness: 6,
                }
              : {}),
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
          x: {
            display: false,
            ...(compact
              ? {
                  categoryPercentage: 0.55,
                  barPercentage: 0.85,
                }
              : {}),
          },
          y: {
            display: false,
            beginAtZero: true,
            ...(compact && ySuggestedMax != null ? { suggestedMax: ySuggestedMax } : {}),
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [data, color, barColors, compact]);

  return <canvas ref={canvasRef} />;
};

export default BarChart;
