'use client';

import { useEffect, useRef } from 'react';
import { Chart, BarController, BarElement, LinearScale, CategoryScale } from 'chart.js';

Chart.register(BarController, BarElement, LinearScale, CategoryScale);

const BarChart = ({ data, color }) => {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        if (chartRef.current) chartRef.current.destroy();

        const maxVal = Math.max(...data);

        chartRef.current = new Chart(canvasRef.current, {
            type: 'bar',
            data: {
                labels: data.map((_, i) => i),
                datasets: [{
                    data: data,
                    backgroundColor: data.map(v =>
                        v === maxVal ? '#FF4000' : '#BDBDBD'
                    ),
                    borderRadius: 3,
                    borderSkipped: false,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                scales: {
                    x: { display: false },
                    y: { display: false },
                },
            },
        });

        return () => chartRef.current?.destroy();
    }, [data, color]);
    return (
        <canvas ref={canvasRef} />
    )
}

export default BarChart
