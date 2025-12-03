'use client';

interface SensorSpec {
  sensor: string;
  measurement: string;
  accuracy: string;
  status: 'excellent' | 'good' | 'warning' | 'error';
  notes?: string;
}

export default function SensorAccuracy() {
  const sensorSpecs: SensorSpec[] = [
    {
      sensor: 'BME280',
      measurement: 'Humidity',
      accuracy: '±3% RH',
      status: 'good',
      notes: 'Typical accuracy at 25°C'
    },
    {
      sensor: 'BME280',
      measurement: 'Pressure',
      accuracy: '±1 hPa',
      status: 'excellent',
      notes: 'Absolute accuracy'
    },
    {
      sensor: 'BME280',
      measurement: 'Temperature',
      accuracy: '±1.0°C',
      status: 'good',
      notes: 'Full temperature range'
    },
    {
      sensor: 'DS18B20',
      measurement: 'Temperature',
      accuracy: '±0.5°C',
      status: 'excellent',
      notes: 'Best accuracy of the list'
    },
    {
      sensor: 'MQ-135',
      measurement: 'Gases (CO₂, etc.)',
      accuracy: 'Variable',
      status: 'warning',
      notes: 'Depends heavily on calibration'
    },
    {
      sensor: 'DS3231',
      measurement: 'Time',
      accuracy: '±2 ppm',
      status: 'excellent',
      notes: '~1 min/year drift'
    },
    {
      sensor: 'DS3231',
      measurement: 'Temperature',
      accuracy: '±3°C',
      status: 'warning',
      notes: 'Internal auxiliary sensor'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-400 bg-green-900/30 border-green-600/50';
      case 'good': return 'text-blue-400 bg-blue-900/30 border-blue-600/50';
      case 'warning': return 'text-yellow-400 bg-yellow-900/30 border-yellow-600/50';
      case 'error': return 'text-red-400 bg-red-900/30 border-red-600/50';
      default: return 'text-slate-400 bg-slate-900/30 border-slate-600/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return '✓';
      case 'good': return '✓';
      case 'warning': return '⚠';
      case 'error': return '✗';
      default: return '•';
    }
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          <h3 className="text-white font-semibold">Sensor Accuracy & Error Margins</h3>
        </div>
        <div className="text-xs text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full">
          Manufacturer Specifications
        </div>
      </div>

      <div className="text-xs text-slate-400 mb-4">
        Understanding measurement precision and potential error ranges for each sensor component
      </div>

      {/* Accuracy Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left text-slate-400 font-medium py-3 px-4">Sensor</th>
              <th className="text-left text-slate-400 font-medium py-3 px-4">Measurement</th>
              <th className="text-left text-slate-400 font-medium py-3 px-4">Accuracy / Error</th>
              <th className="text-left text-slate-400 font-medium py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {sensorSpecs.map((spec, index) => (
              <tr 
                key={index} 
                className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="text-white font-medium">{spec.sensor}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-slate-300">{spec.measurement}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-slate-200 font-mono">{spec.accuracy}</div>
                  {spec.notes && (
                    <div className="text-xs text-slate-500 mt-1">{spec.notes}</div>
                  )}
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs border ${getStatusColor(spec.status)}`}>
                    {getStatusIcon(spec.status)} {spec.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Error Analysis */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Known Issues */}
        <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
          <div className="flex items-start gap-2 mb-3">
            <span className="text-xl">⚠️</span>
            <div>
              <div className="text-yellow-400 font-medium mb-1">Known Limitations</div>
              <div className="text-yellow-200/70 text-xs leading-relaxed space-y-2">
                <div>• <strong>MQ-135:</strong> Requires 24-48h preheat time and regular calibration for accurate readings</div>
                <div>• <strong>BME280:</strong> Temperature readings affected by self-heating (~1-2°C offset possible)</div>
                <div>• <strong>DS3231:</strong> Internal temp sensor less accurate, used only for RTC compensation</div>
              </div>
            </div>
          </div>
        </div>

        {/* Calibration Status */}
        <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
          <div className="flex items-start gap-2 mb-3">
            <span className="text-xl">🔧</span>
            <div>
              <div className="text-blue-400 font-medium mb-1">Calibration Status</div>
              <div className="text-blue-200/70 text-xs leading-relaxed space-y-2">
                <div>• <strong>Temperature:</strong> Cross-validated between BME280 and DS18B20</div>
                <div>• <strong>Pressure:</strong> Factory calibrated, no user adjustment needed</div>
                <div>• <strong>Air Quality:</strong> Baseline established after 48h continuous operation</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Propagation Info */}
      <div className="mt-4 p-4 bg-slate-700/30 border border-slate-600/30 rounded-lg">
        <div className="flex items-start gap-2">
          <span className="text-lg">📊</span>
          <div className="flex-1">
            <div className="text-slate-300 text-sm font-medium mb-2">
              Error Propagation & Data Quality
            </div>
            <div className="text-slate-400 text-xs leading-relaxed">
              The dashboard displays raw sensor readings with known error margins. For critical applications, 
              consider the cumulative uncertainty when combining multiple measurements. The DS18B20 provides 
              the most accurate temperature reference (±0.5°C), while the BME280 offers good all-around 
              environmental sensing. Air quality readings should be treated as relative indicators rather 
              than absolute values without proper calibration.
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span className="text-slate-400">Excellent (&lt;1% error)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-blue-500"></span>
          <span className="text-slate-400">Good (1-3% error)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="text-slate-400">Warning (variable/needs calibration)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="text-slate-400">Error (sensor failure)</span>
        </div>
      </div>
    </div>
  );
}
