'use client';

interface AlertConfigProps {
  tempThreshold: number;
  airQualityThreshold: number;
  onTempChange: (value: number) => void;
  onAirQualityChange: (value: number) => void;
}

export default function AlertConfig({
  tempThreshold,
  airQualityThreshold,
  onTempChange,
  onAirQualityChange
}: AlertConfigProps) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">⚙️</span>
        <h3 className="text-white font-semibold">Alert Thresholds</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-slate-400 text-sm block mb-2">
            Temperature Alert: <span className="text-orange-400 font-bold">{tempThreshold}°C</span>
          </label>
          <input
            type="range"
            min="20"
            max="50"
            value={tempThreshold}
            onChange={(e) => onTempChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>
        
        <div>
          <label className="text-slate-400 text-sm block mb-2">
            Air Quality Alert: <span className="text-purple-400 font-bold">{airQualityThreshold} AQI</span>
          </label>
          <input
            type="range"
            min="50"
            max="300"
            value={airQualityThreshold}
            onChange={(e) => onAirQualityChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>
      </div>
    </div>
  );
}
