'use client';

interface GaugeChartProps {
  value: number;
  min: number;
  max: number;
  label: string;
  unit: string;
  color: string;
  threshold?: number;
}

export default function GaugeChart({ value, min, max, label, unit, color, threshold }: GaugeChartProps) {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference * 0.75;
  const isOverThreshold = threshold !== undefined && value > threshold;
  
  // Adjust font size based on value length
  const valueStr = value.toFixed(1);
  const fontSize = valueStr.length > 4 ? '16px' : '20px';

  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="110" viewBox="0 0 140 110">
        {/* Background arc */}
        <path
          d="M 20 90 A 50 50 0 1 1 120 90"
          fill="none"
          stroke="#334155"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Value arc */}
        <path
          d="M 20 90 A 50 50 0 1 1 120 90"
          fill="none"
          stroke={isOverThreshold ? '#ef4444' : color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference * 0.75}
          strokeDashoffset={strokeDashoffset}
          className="gauge-ring"
        />
        {/* Value text - centered lower in the gauge */}
        <text 
          x="70" 
          y="72" 
          textAnchor="middle" 
          dominantBaseline="middle"
          className="fill-white font-bold"
          style={{ fontSize }}
        >
          {valueStr}
        </text>
        <text 
          x="70" 
          y="88" 
          textAnchor="middle" 
          dominantBaseline="middle"
          className="fill-slate-400"
          style={{ fontSize: '11px' }}
        >
          {unit}
        </text>
      </svg>
      <span className="text-slate-400 text-xs mt-3 text-center">{label}</span>
    </div>
  );
}
