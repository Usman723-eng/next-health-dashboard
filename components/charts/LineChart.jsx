'use client';

import { useEffect, useRef } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);


const LineChart = ({ data, color, labels, compact }) => {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        if (chartRef.current) chartRef.current.destroy();

        const xLabels =
            Array.isArray(labels) && labels.length === data.length
                ? labels
                : data.map((_, i) => i);

        const lineColor = color || '#DE2ED7';
        const pointFill = color || '#DE2ED7';

        chartRef.current = new Chart(canvasRef.current, {
            type: 'line',
            data: {
                labels: xLabels,
                datasets: [{
                    data: data,
                    borderColor: lineColor,
                    pointBackgroundColor: pointFill,
                    pointBorderColor: pointFill,
                    pointRadius: compact ? 2 : 3,
                    pointHoverRadius: 5,
                    borderWidth: compact ? 1.5 : 1.5,
                    tension: 0.3,
                    fill: false,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                scales: {
                    x: compact
                        ? {
                              display: true,
                              grid: { display: false },
                              border: { display: false },
                              ticks: {
                                  display: false,
                              },
                          }
                        : { display: false },
                    y: { display: false },
                },
            },
        });

        return () => chartRef.current?.destroy();
    }, [data, color, labels, compact]);
    return (
        <canvas ref={canvasRef} />
    )
}

export default LineChart
