'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface HistoricalDataPoint {
  date: string;
  aqi: number;
  temperature: number;
  humidity: number;
  pressure: number;
  icon: string;
}

export default function WeatherForecast() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);
  
  // Toggle states for chart lines
  const [showTemperature, setShowTemperature] = useState(true);
  const [showAverage, setShowAverage] = useState(true);
  const [showHumidity, setShowHumidity] = useState(true);

  // EXACT data from your testing period screenshot
  const historicalData: HistoricalDataPoint[] = [
    { date: 'Nov-18', aqi: 244, temperature: 18, humidity: 84, pressure: 30.07, icon: '☁️' },
    { date: 'Nov-19', aqi: 247, temperature: 18, humidity: 78, pressure: 30.07, icon: '⛅' },
    { date: 'Nov-20', aqi: 251, temperature: 18, humidity: 78, pressure: 30.07, icon: '⛅' },
    { date: 'Nov-21', aqi: 251, temperature: 18, humidity: 78, pressure: 30.07, icon: '⛅' },
    { date: 'Nov-22', aqi: 268, temperature: 17, humidity: 80, pressure: 30.03, icon: '☁️' },
    { date: 'Nov-23', aqi: 279, temperature: 17, humidity: 80, pressure: 30.03, icon: '☁️' },
    { date: 'Nov-24', aqi: 274, temperature: 17, humidity: 80, pressure: 30.03, icon: '☁️' },
    { date: 'Nov-25', aqi: 271, temperature: 17, humidity: 80, pressure: 30.03, icon: '☁️' },
    { date: 'Nov-26', aqi: 282, temperature: 16, humidity: 82, pressure: 30.08, icon: '☁️' },
    { date: 'Nov-27', aqi: 274, temperature: 16, humidity: 82, pressure: 30.08, icon: '☁️' },
    { date: 'Nov-28', aqi: 268, temperature: 16, humidity: 82, pressure: 30.08, icon: '☁️' },
    { date: 'Nov-29', aqi: 265, temperature: 16, humidity: 82, pressure: 30.08, icon: '☁️' },
    { date: 'Nov-30', aqi: 253, temperature: 16, humidity: 82, pressure: 30.16, icon: '🌙' },
    { date: 'Dec-01', aqi: 262, temperature: 16, humidity: 82, pressure: 30.16, icon: '☀️' },
    { date: 'Dec-02', aqi: 240, temperature: 16, humidity: 78, pressure: 30.07, icon: '⛅' },
    { date: 'Dec-03', aqi: 155, temperature: 15, humidity: 72, pressure: 30.07, icon: '⛅' },
  ];

  // Calculate averages from your data
  const avgTemp = 16.7; // From your screenshot
  const avgHumidity = 80; // From your screenshot

  // Update chart visibility when toggles change
  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.data.datasets[0].hidden = !showTemperature;
      chartInstanceRef.current.data.datasets[1].hidden = !showAverage;
      chartInstanceRef.current.data.datasets[2].hidden = !showHumidity;
      chartInstanceRef.current.update();
    }
  }, [showTemperature, showAverage, showHumidity]);

  // Initialize chart only once
  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    chartInstanceRef.current = new ChartJS(ctx, {
      type: 'line',
      data: {
        labels: historicalData.map((d) => d.date),
        datasets: [
          {
            label: 'Temperature (°C)',
            data: historicalData.map((d) => d.temperature),
            borderColor: '#f97316',
            backgroundColor: 'rgba(249, 115, 22, 0.1)',
            borderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 7,
            tension: 0.3,
            fill: false,
            hidden: false
          },
          {
            label: `Average (${avgTemp}°C)`,
            data: Array(historicalData.length).fill(avgTemp),
            borderColor: '#ef4444',
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderDash: [5, 5],
            pointRadius: 0,
            pointHoverRadius: 0,
            tension: 0,
            fill: false,
            hidden: false
          },
          {
            label: 'Humidity (%)',
            data: historicalData.map((d) => d.humidity),
            borderColor: '#06b6d4',
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.3,
            fill: false,
            yAxisID: 'y1',
            hidden: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 400
        },
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            titleColor: '#cbd5e1',
            bodyColor: '#cbd5e1',
            borderColor: '#475569',
            borderWidth: 1,
            padding: 12,
            displayColors: true
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(71, 85, 105, 0.3)' },
            ticks: { color: '#94a3b8', maxRotation: 45, minRotation: 45, font: { size: 10 } }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: { display: true, text: 'Temperature (°C)', color: '#cbd5e1', font: { size: 11 } },
            grid: { color: 'rgba(71, 85, 105, 0.3)' },
            ticks: { color: '#94a3b8', font: { size: 10 } },
            min: 12,
            max: 22
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: { display: true, text: 'Humidity (%)', color: '#cbd5e1', font: { size: 11 } },
            grid: { drawOnChartArea: false },
            ticks: { color: '#94a3b8', font: { size: 10 } },
            min: 65,
            max: 90
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []); // Only run once on mount

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 md:p-6 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xl md:text-2xl">📈</span>
          <h3 className="text-white font-semibold text-sm md:text-base">Sensor Data Graph</h3>
        </div>
        <div className="text-xs text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full">
          Nov 18 - Dec 3, 2025
        </div>
      </div>

      <div className="text-xs text-slate-400 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        16 days of continuous monitoring • 138,240 data points
      </div>

      {/* Toggle Controls */}
      <div className="flex flex-wrap gap-4 mb-4 p-3 bg-slate-900/50 rounded-lg">
        <label className="cyberpunk-checkbox-label">
          <input
            type="checkbox"
            className="cyberpunk-checkbox orange"
            checked={showTemperature}
            onChange={(e) => setShowTemperature(e.target.checked)}
          />
          <span className="text-orange-400">Temperature</span>
        </label>
        <label className="cyberpunk-checkbox-label">
          <input
            type="checkbox"
            className="cyberpunk-checkbox red"
            checked={showAverage}
            onChange={(e) => setShowAverage(e.target.checked)}
          />
          <span className="text-red-400">Average Line</span>
        </label>
        <label className="cyberpunk-checkbox-label">
          <input
            type="checkbox"
            className="cyberpunk-checkbox cyan"
            checked={showHumidity}
            onChange={(e) => setShowHumidity(e.target.checked)}
          />
          <span className="text-cyan-400">Humidity</span>
        </label>
      </div>

      {/* Chart */}
      <div className="bg-slate-900/50 rounded-lg p-2 md:p-4 mb-4 overflow-x-auto custom-scrollbar">
        <div className="min-w-[600px] md:min-w-[800px]" style={{ height: '300px' }}>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>

      {/* Weather Icons Timeline */}
      <div className="bg-slate-900/50 rounded-lg p-3 md:p-4 mb-4 overflow-x-auto custom-scrollbar">
        <div className="flex gap-2 min-w-max">
          {historicalData.map((d, i) => (
            <div
              key={i}
              className="flex-shrink-0 text-center p-2 bg-slate-800/50 rounded border border-slate-700/30"
              style={{ width: '70px' }}
            >
              <div className="text-[10px] text-slate-400 mb-1">{d.date}</div>
              <div className="text-xl mb-1">{d.icon}</div>
              <div className="text-[10px] text-orange-400 font-medium">{d.temperature}°C</div>
              <div className="text-[10px] text-cyan-400">H:{d.humidity}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-3 p-3 bg-gradient-to-r from-teal-900/40 to-cyan-900/40 border border-teal-600/30 rounded-lg">
        <div className="text-center">
          <div className="text-slate-400 text-[10px] md:text-xs">Avg Temperature</div>
          <div className="text-orange-400 font-bold text-sm md:text-base">{avgTemp}°C</div>
        </div>
        <div className="text-center">
          <div className="text-slate-400 text-[10px] md:text-xs">Avg Humidity</div>
          <div className="text-cyan-400 font-bold text-sm md:text-base">{avgHumidity}%</div>
        </div>
        <div className="text-center">
          <div className="text-slate-400 text-[10px] md:text-xs">Data Points</div>
          <div className="text-green-400 font-bold text-sm md:text-base">138,240</div>
        </div>
      </div>
    </div>
  );
}
