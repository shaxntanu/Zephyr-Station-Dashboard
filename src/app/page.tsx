'use client';

import { useState, useEffect, useCallback } from 'react';
import SensorCard from '@/components/SensorCard';
import OLEDDisplay from '@/components/OLEDDisplay';
import GaugeChart from '@/components/GaugeChart';
import DataLog from '@/components/DataLog';
import AlertConfig from '@/components/AlertConfig';
import AlertBanner from '@/components/AlertBanner';
import WeatherForecast from '@/components/WeatherForecast';
import SensorAccuracy from '@/components/SensorAccuracy';

interface SensorData {
  tempBME280: number;
  tempDS18B20: number;
  humidity: number;
  pressure: number;
  airQuality: number;
}

interface LogEntry {
  timestamp: string;
  temperature: number;
  humidity: number;
  pressure: number;
  airQuality: number;
}

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [sensorData, setSensorData] = useState<SensorData>({
    tempBME280: 24.5,
    tempDS18B20: 24.3,
    humidity: 45,
    pressure: 1013,
    airQuality: 85
  });
  // Initialize with sample data from 16-day testing period
  const [logs, setLogs] = useState<LogEntry[]>([
    { timestamp: '2025-12-03 14:30:00', temperature: 15, humidity: 72, pressure: 1018.4, airQuality: 155 },
    { timestamp: '2025-12-03 14:20:00', temperature: 15, humidity: 72, pressure: 1018.4, airQuality: 158 },
    { timestamp: '2025-12-03 14:10:00', temperature: 15, humidity: 73, pressure: 1018.3, airQuality: 152 },
    { timestamp: '2025-12-03 14:00:00', temperature: 15, humidity: 72, pressure: 1018.4, airQuality: 155 },
    { timestamp: '2025-12-02 18:30:00', temperature: 16, humidity: 78, pressure: 1018.4, airQuality: 240 },
    { timestamp: '2025-12-02 18:20:00', temperature: 16, humidity: 78, pressure: 1018.4, airQuality: 242 },
    { timestamp: '2025-12-02 18:10:00', temperature: 16, humidity: 79, pressure: 1018.3, airQuality: 238 },
    { timestamp: '2025-12-01 12:30:00', temperature: 16, humidity: 82, pressure: 1021.4, airQuality: 262 },
    { timestamp: '2025-12-01 12:20:00', temperature: 16, humidity: 82, pressure: 1021.4, airQuality: 265 },
    { timestamp: '2025-12-01 12:10:00', temperature: 16, humidity: 81, pressure: 1021.5, airQuality: 260 },
    { timestamp: '2025-11-30 18:30:00', temperature: 16, humidity: 82, pressure: 1021.4, airQuality: 253 },
    { timestamp: '2025-11-30 18:20:00', temperature: 16, humidity: 82, pressure: 1021.4, airQuality: 255 },
    { timestamp: '2025-11-29 14:30:00', temperature: 16, humidity: 82, pressure: 1019.7, airQuality: 265 },
    { timestamp: '2025-11-29 14:20:00', temperature: 16, humidity: 82, pressure: 1019.7, airQuality: 268 },
    { timestamp: '2025-11-28 12:30:00', temperature: 16, humidity: 82, pressure: 1019.7, airQuality: 268 },
    { timestamp: '2025-11-28 12:20:00', temperature: 16, humidity: 82, pressure: 1019.7, airQuality: 270 },
    { timestamp: '2025-11-27 14:30:00', temperature: 16, humidity: 82, pressure: 1019.7, airQuality: 274 },
    { timestamp: '2025-11-27 14:20:00', temperature: 16, humidity: 82, pressure: 1019.7, airQuality: 276 },
    { timestamp: '2025-11-26 12:30:00', temperature: 16, humidity: 82, pressure: 1019.7, airQuality: 282 },
    { timestamp: '2025-11-26 12:20:00', temperature: 16, humidity: 82, pressure: 1019.7, airQuality: 280 },
    { timestamp: '2025-11-25 14:30:00', temperature: 17, humidity: 80, pressure: 1017.0, airQuality: 271 },
    { timestamp: '2025-11-25 14:20:00', temperature: 17, humidity: 80, pressure: 1017.0, airQuality: 273 },
    { timestamp: '2025-11-24 18:30:00', temperature: 17, humidity: 80, pressure: 1017.0, airQuality: 274 },
    { timestamp: '2025-11-24 18:20:00', temperature: 17, humidity: 80, pressure: 1017.0, airQuality: 276 },
    { timestamp: '2025-11-23 14:30:00', temperature: 17, humidity: 80, pressure: 1017.0, airQuality: 279 },
    { timestamp: '2025-11-23 14:20:00', temperature: 17, humidity: 80, pressure: 1017.0, airQuality: 281 },
    { timestamp: '2025-11-22 12:30:00', temperature: 17, humidity: 80, pressure: 1017.0, airQuality: 268 },
    { timestamp: '2025-11-22 12:20:00', temperature: 17, humidity: 80, pressure: 1017.0, airQuality: 270 },
    { timestamp: '2025-11-21 14:30:00', temperature: 18, humidity: 78, pressure: 1018.4, airQuality: 251 },
    { timestamp: '2025-11-21 14:20:00', temperature: 18, humidity: 78, pressure: 1018.4, airQuality: 253 },
    { timestamp: '2025-11-20 12:30:00', temperature: 18, humidity: 78, pressure: 1018.4, airQuality: 251 },
    { timestamp: '2025-11-20 12:20:00', temperature: 18, humidity: 78, pressure: 1018.4, airQuality: 249 },
    { timestamp: '2025-11-19 14:30:00', temperature: 18, humidity: 78, pressure: 1018.4, airQuality: 247 },
    { timestamp: '2025-11-19 14:20:00', temperature: 18, humidity: 78, pressure: 1018.4, airQuality: 245 },
    { timestamp: '2025-11-18 12:30:00', temperature: 18, humidity: 84, pressure: 1018.4, airQuality: 244 },
    { timestamp: '2025-11-18 12:20:00', temperature: 18, humidity: 84, pressure: 1018.4, airQuality: 246 },
  ]);
  const [tempThreshold, setTempThreshold] = useState(30);
  const [airQualityThreshold, setAirQualityThreshold] = useState(150);
  const [bme280Failed, setBme280Failed] = useState(false);

  // Mount check and RTC Clock sync
  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch real sensor data from ESP32
  const fetchSensorData = useCallback(async () => {
    try {
      const response = await fetch('/api/sensor-data');
      if (response.ok) {
        const data = await response.json();
        setSensorData({
          tempBME280: data.tempBME280 || 0,
          tempDS18B20: data.tempDS18B20 || 0,
          humidity: data.humidity || 0,
          pressure: data.pressure || 0,
          airQuality: data.airQuality || 0
        });
        // Auto-detect BME280 failure
        if (data.tempBME280 === 0 && data.tempDS18B20 > 0) {
          setBme280Failed(true);
        } else if (data.tempBME280 > 0) {
          setBme280Failed(false);
        }
      }
    } catch (error) {
      console.error('Failed to fetch sensor data:', error);
      // Use cached data when ESP32 not connected
    }
  }, []);

  useEffect(() => {
    fetchSensorData(); // Initial fetch
    const interval = setInterval(fetchSensorData, 3000); // Fetch every 3 seconds
    return () => clearInterval(interval);
  }, [fetchSensorData]);

  // Log entries from SD card (every 10 seconds)
  useEffect(() => {
    if (!currentTime) return;
    // Historical data already loaded - no need to add more entries
  }, [currentTime]);

  const activeTemp = bme280Failed ? sensorData.tempDS18B20 : sensorData.tempBME280;
  const isTempAlert = activeTemp > tempThreshold;
  const isAirAlert = sensorData.airQuality > airQualityThreshold;
  const isAnyAlert = isTempAlert || isAirAlert;

  const alertMessage = isTempAlert && isAirAlert
    ? `⚠️ CRITICAL: Temperature (${activeTemp.toFixed(1)}°C) & Air Quality (${sensorData.airQuality.toFixed(0)} AQI) exceeded!`
    : isTempAlert
    ? `🌡️ Temperature Alert: ${activeTemp.toFixed(1)}°C exceeds ${tempThreshold}°C threshold!`
    : `💨 Air Quality Alert: ${sensorData.airQuality.toFixed(0)} AQI exceeds ${airQualityThreshold} threshold!`;

  return (
    <div className="min-h-screen p-4 md:p-6 select-none">
      <AlertBanner isActive={isAnyAlert} message={alertMessage} />
      
      {/* Header */}
      <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 md:mb-8 gap-4">
        <div className="flex-shrink-0">
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2 md:gap-3">
            <span className="text-3xl md:text-4xl">🌡️</span>
            Zephyr Station
          </h1>
          <p className="text-slate-400 mt-1 text-sm md:text-base">
            Smart Room Monitoring - Testing Phase Dashboard
          </p>
          <p className="text-cyan-400 font-bold text-xs md:text-sm mt-1">
            SIMULATION DEMO
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full lg:w-auto">
          <OLEDDisplay
            temperature={activeTemp}
            humidity={sensorData.humidity}
            pressure={sensorData.pressure}
            airQuality={sensorData.airQuality}
          />
          
          <div className="text-left sm:text-right">
            <div className="text-slate-400 text-sm">RTC Module</div>
            <div className="text-xl md:text-2xl font-mono text-cyan-400" suppressHydrationWarning>
              {currentTime ? currentTime.toLocaleTimeString() : '--:--:--'}
            </div>
            <div className="text-slate-500 text-sm" suppressHydrationWarning>
              {currentTime ? currentTime.toLocaleDateString() : '--/--/----'}
            </div>
          </div>
        </div>
      </header>

      {/* 16-Day Average Statistics with Gauges */}
      <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 md:p-6 mb-4 md:mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <h3 className="text-white font-semibold text-sm md:text-base">16-Day Testing Period Averages</h3>
          </div>
          <div className="text-xs text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full">
            Nov 18 - Dec 3, 2025
          </div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Temperature Average */}
          <div className="bg-slate-700/30 border border-slate-600/30 rounded-lg p-4 flex flex-col items-center">
            <div className="text-3xl mb-2">🌡️</div>
            <GaugeChart
              value={16.7}
              min={0}
              max={50}
              label="Avg Temperature"
              unit="°C"
              color="#f97316"
            />
            <div className="mt-3 text-center">
              <div className="text-xs text-slate-400">Range</div>
              <div className="text-sm text-slate-300">15°C - 18°C</div>
            </div>
          </div>

          {/* Humidity Average */}
          <div className="bg-slate-700/30 border border-slate-600/30 rounded-lg p-4 flex flex-col items-center">
            <div className="text-3xl mb-2">💧</div>
            <GaugeChart
              value={80}
              min={0}
              max={100}
              label="Avg Humidity"
              unit="%"
              color="#3b82f6"
            />
            <div className="mt-3 text-center">
              <div className="text-xs text-slate-400">Range</div>
              <div className="text-sm text-slate-300">72% - 84%</div>
            </div>
          </div>

          {/* Pressure Average */}
          <div className="bg-slate-700/30 border border-slate-600/30 rounded-lg p-4 flex flex-col items-center">
            <div className="text-3xl mb-2">🌀</div>
            <GaugeChart
              value={1015.6}
              min={950}
              max={1050}
              label="Avg Pressure"
              unit="hPa"
              color="#06b6d4"
            />
            <div className="mt-3 text-center">
              <div className="text-xs text-slate-400">Range</div>
              <div className="text-sm text-slate-300">1013 - 1020 hPa</div>
            </div>
          </div>

          {/* Air Quality Average */}
          <div className="bg-slate-700/30 border border-slate-600/30 rounded-lg p-4 flex flex-col items-center">
            <div className="text-3xl mb-2">💨</div>
            <GaugeChart
              value={255.2}
              min={0}
              max={400}
              label="Avg Air Quality"
              unit="AQI"
              color="#a855f7"
            />
            <div className="mt-3 text-center">
              <div className="text-xs text-slate-400">Range</div>
              <div className="text-sm text-slate-300">155 - 282 AQI</div>
            </div>
          </div>
        </div>

        {/* Statistics Summary */}
        <div className="mt-4 p-4 bg-gradient-to-r from-slate-700/40 to-slate-600/40 border border-slate-600/30 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-slate-400 text-xs mb-1">Total Days</div>
              <div className="text-white text-xl font-bold">16</div>
            </div>
            <div>
              <div className="text-slate-400 text-xs mb-1">Data Points</div>
              <div className="text-white text-xl font-bold">138,240</div>
            </div>
            <div>
              <div className="text-slate-400 text-xs mb-1">Sampling Rate</div>
              <div className="text-white text-xl font-bold">10s</div>
            </div>
            <div>
              <div className="text-slate-400 text-xs mb-1">Uptime</div>
              <div className="text-white text-xl font-bold">99.8%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Forecast Section */}
      <div className="mb-4 md:mb-6">
        <WeatherForecast />
      </div>

      {/* Sensor Accuracy Section */}
      <div className="mb-4 md:mb-6">
        <SensorAccuracy />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Alert Configuration */}
        <AlertConfig
          tempThreshold={tempThreshold}
          airQualityThreshold={airQualityThreshold}
          onTempChange={setTempThreshold}
          onAirQualityChange={setAirQualityThreshold}
        />

        {/* Fault Tolerance Control */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🔧</span>
            <h3 className="text-white font-semibold">Fault Tolerance Demo</h3>
          </div>
          
          <div className="space-y-4">
            <p className="text-slate-400 text-sm">
              Test BME280 sensor failure to demonstrate graceful degradation and backup sensor activation.
            </p>
            
            <button
              onClick={() => setBme280Failed(!bme280Failed)}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                bme280Failed
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}
            >
              {bme280Failed ? '🔴 BME280 Failed - Click to Restore' : '⚡ Test BME280 Failure'}
            </button>

            {bme280Failed && (
              <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-3 text-sm">
                <p className="text-yellow-400 font-medium">⚠️ Fault Tolerance Active</p>
                <p className="text-yellow-200/70 mt-1">
                  Primary BME280 sensor offline. Temperature readings now using DS18B20 backup sensor.
                  Humidity and Pressure data unavailable.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Data Log */}
        <DataLog logs={logs} />
      </div>

      {/* Footer */}
      <footer className="mt-6 md:mt-8 text-center text-slate-500 text-xs md:text-sm px-4">
        <p className="mb-1">Zephyr Station Environmental Monitor • Real-time Data & Historical Analysis</p>
        <p className="text-xs mt-1">BME280 + DS18B20 + MQ-135 + RTC Module + SD Card Logging</p>
        <p className="text-xs mt-1 text-slate-600">Testing Period: Nov 18 - Dec 3, 2025 • 138,240 data points collected</p>
        
        {/* GitHub Link */}
        <div className="mt-4 flex items-center justify-center">
          <a
            href="https://github.com/shaxntanu/Zephyr-Station-Dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600 rounded-lg transition-all hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-slate-400"
            >
              <path d="M12.001 2c-5.525 0-10 4.475-10 10a9.99 9.99 0 0 0 6.837 9.488c.5.087.688-.213.688-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.337 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.687c-.1-.25-.45-1.275.1-2.65c0 0 .837-.263 2.75 1.024a9.3 9.3 0 0 1 2.5-.337c.85 0 1.7.112 2.5.337c1.913-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.02 10.02 0 0 0 22 12c0-5.525-4.475-10-10-10" />
            </svg>
            <span className="text-slate-300 text-sm">View on GitHub</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
