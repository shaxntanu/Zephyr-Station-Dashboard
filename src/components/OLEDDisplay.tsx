'use client';

import { useState, useEffect } from 'react';

interface OLEDDisplayProps {
  temperature: number;
  humidity: number;
  pressure: number;
  airQuality: number;
}

export default function OLEDDisplay({ temperature, humidity, pressure, airQuality }: OLEDDisplayProps) {
  const [screen, setScreen] = useState(0);
  const screens = ['current', 'averages', 'stats'];

  // Historical averages from 16-day testing period (Nov 18 - Dec 3, 2025)
  const historicalAverages = {
    tempHigh: 24.3,
    tempLow: 19.4,
    humidity: 66.8,
    pressure: 1015.6,
    dataPoints: 138240
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setScreen(prev => (prev + 1) % screens.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const renderScreen = () => {
    switch (screens[screen]) {
      case 'current':
        return (
          <>
            <div className="text-[8px] text-cyan-400 mb-0.5">CURRENT READINGS</div>
            <div className="text-xs text-white space-y-0.5">
              <div>T: {temperature.toFixed(1)}°C</div>
              <div>H: {humidity.toFixed(0)}% P: {pressure.toFixed(0)}</div>
            </div>
          </>
        );
      case 'averages':
        return (
          <>
            <div className="text-[8px] text-cyan-400 mb-0.5">16-DAY AVERAGES</div>
            <div className="text-xs text-white space-y-0.5">
              <div>Hi: {historicalAverages.tempHigh}°C Lo: {historicalAverages.tempLow}°C</div>
              <div>H: {historicalAverages.humidity.toFixed(1)}% P: {historicalAverages.pressure.toFixed(0)}</div>
            </div>
          </>
        );
      case 'stats':
        return (
          <>
            <div className="text-[8px] text-cyan-400 mb-0.5">TESTING STATS</div>
            <div className="text-xs text-white space-y-0.5">
              <div>Duration: 16 days</div>
              <div>Data: {(historicalAverages.dataPoints / 1000).toFixed(0)}k points</div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="oled-display w-48 h-24 flex flex-col items-center justify-center p-3 select-none">
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        {renderScreen()}
      </div>
      <div className="flex gap-1 mt-2">
        {screens.map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === screen ? 'bg-cyan-400' : 'bg-slate-600'}`} />
        ))}
      </div>
    </div>
  );
}
