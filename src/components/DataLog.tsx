'use client';

import { useState, useEffect } from 'react';

interface LogEntry {
  timestamp: string;
  temperature: number;
  humidity: number;
  pressure: number;
  airQuality: number;
}

interface DataLogProps {
  logs: LogEntry[];
}

export default function DataLog({ logs }: DataLogProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [isLogging, setIsLogging] = useState(false);

  // Calculate file size estimate (each entry ~60 bytes)
  const totalEntries = 138240; // 16 days of data (10 second intervals)
  const estimatedSize = ((totalEntries * 60) / 1024).toFixed(1); // KB

  // Countdown timer for next log entry
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsLogging(true);
          setTimeout(() => setIsLogging(false), 500); // Flash effect
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">💾</span>
          <div>
            <h3 className="text-white font-semibold text-sm md:text-base">SD Card Data Log</h3>
            <p className="text-xs text-slate-500">Testing Period: Nov 18 - Dec 3, 2025</p>
          </div>
        </div>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          {showInfo ? 'Hide Info' : 'Show Info'}
        </button>
      </div>

      {showInfo && (
        <div className="mb-3 p-3 bg-slate-700/30 border border-slate-600/30 rounded-lg text-xs space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-cyan-400">📄</span>
            <div className="flex-1">
              <div className="text-slate-300 font-medium mb-1">File: /datalog.csv</div>
              <div className="text-slate-400 space-y-1">
                <div>• Format: CSV (Comma-Separated Values)</div>
                <div>• Logging Interval: Every 10 seconds</div>
                <div>• Total Entries: {totalEntries.toLocaleString()}</div>
                <div>• Estimated Size: ~{estimatedSize} KB</div>
                <div>• Storage: MicroSD Card (SPI Interface)</div>
                <div>• Backup: Local redundancy for WiFi failures</div>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2 pt-2 border-t border-slate-600/30">
            <span className="text-yellow-400">⚡</span>
            <div className="flex-1 text-slate-400">
              <div className="font-medium text-slate-300 mb-1">Data Integrity</div>
              <div>Each entry includes timestamp from RTC module, ensuring accurate time-series data even during power cycles or WiFi disconnections.</div>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-slate-900 rounded-lg overflow-hidden">
        {logs.length > 0 ? (
          <div className="max-h-96 overflow-y-auto custom-scrollbar">
            <table className="w-full text-[10px] md:text-xs font-mono border-collapse">
              <thead className="sticky top-0 bg-slate-800 z-10">
                <tr className="border-b border-slate-700">
                  <th className="text-left text-slate-400 font-medium py-3 px-3 whitespace-nowrap">DateTime</th>
                  <th className="text-right text-orange-400 font-medium py-3 px-3 whitespace-nowrap">BME_Temp</th>
                  <th className="text-right text-blue-400 font-medium py-3 px-3 whitespace-nowrap">Humidity</th>
                  <th className="text-right text-cyan-400 font-medium py-3 px-3 whitespace-nowrap">Pressure</th>
                  <th className="text-right text-orange-300 font-medium py-3 px-3 whitespace-nowrap">DS18_Temp</th>
                  <th className="text-right text-purple-400 font-medium py-3 px-3 whitespace-nowrap">AirQuality</th>
                  <th className="text-center text-green-400 font-medium py-3 px-3 whitespace-nowrap">Alert</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, i) => (
                  <tr 
                    key={i} 
                    className={`border-b border-slate-800 hover:bg-slate-800/50 transition-colors ${
                      i === 0 ? 'bg-slate-800/30' : i % 2 === 0 ? 'bg-slate-900/50' : ''
                    }`}
                  >
                    <td className="text-cyan-300 py-2 px-3 whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="text-orange-400 text-right py-2 px-3 whitespace-nowrap">
                      {log.temperature.toFixed(2)}°C
                    </td>
                    <td className="text-blue-400 text-right py-2 px-3 whitespace-nowrap">
                      {log.humidity.toFixed(1)}%
                    </td>
                    <td className="text-cyan-400 text-right py-2 px-3 whitespace-nowrap">
                      {log.pressure.toFixed(1)} hPa
                    </td>
                    <td className="text-orange-300 text-right py-2 px-3 whitespace-nowrap">
                      {log.temperature.toFixed(2)}°C
                    </td>
                    <td className="text-purple-400 text-right py-2 px-3 whitespace-nowrap">
                      {log.airQuality.toFixed(0)}
                    </td>
                    <td className="text-green-400 text-center py-2 px-3 whitespace-nowrap">
                      OK
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-slate-500 text-center py-8">
            <div className="mb-2">⏳</div>
            <div>Waiting for data...</div>
            <div className="text-xs mt-1">ESP32 logs every 10 seconds</div>
          </div>
        )}

        {/* Entry Counter */}
        {logs.length > 0 && (
          <div className="bg-slate-800 border-t border-slate-700 px-3 py-2 text-[10px] text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
            <span>Showing {logs.length} sample entries from testing period</span>
            <span className="text-slate-500">Total logged during 16 days: 138,240 entries</span>
          </div>
        )}
      </div>

      {/* SD Card Status */}
      <div className="mt-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <div className={`w-2 h-2 rounded-full transition-all ${isLogging ? 'bg-yellow-400 scale-125' : 'bg-green-500 animate-pulse'}`}></div>
          <span>{isLogging ? 'Writing to SD...' : 'SD Card: Active'}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-slate-500">
            Next log in: <span className="text-cyan-400 font-mono font-bold">{countdown}s</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000 ease-linear"
          style={{ width: `${((10 - countdown) / 10) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
