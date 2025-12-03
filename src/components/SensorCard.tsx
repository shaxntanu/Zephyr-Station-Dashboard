'use client';

interface SensorCardProps {
  title: string;
  value: number | string;
  unit: string;
  icon: string;
  color: string;
  secondaryValue?: number | string;
  secondaryLabel?: string;
  isAlert?: boolean;
  isError?: boolean;
}

export default function SensorCard({
  title,
  value,
  unit,
  icon,
  color,
  secondaryValue,
  secondaryLabel,
  isAlert,
  isError
}: SensorCardProps) {
  const bgColor = isAlert ? 'bg-red-900/50 border-red-500' : 'bg-slate-800/50 border-slate-700';
  const alertClass = isAlert ? 'alert-flash' : '';

  return (
    <div className={`${bgColor} ${alertClass} border rounded-xl p-5 backdrop-blur-sm transition-all duration-300`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-slate-400 text-sm font-medium">{title}</span>
        <span className="text-2xl">{icon}</span>
      </div>
      
      <div className="flex items-baseline gap-2">
        {isError ? (
          <span className="text-3xl font-bold text-red-500">ERROR</span>
        ) : (
          <>
            <span className={`text-4xl font-bold ${color}`}>
              {typeof value === 'number' ? value.toFixed(1) : value}
            </span>
            <span className="text-slate-400 text-lg">{unit}</span>
          </>
        )}
      </div>

      {secondaryValue !== undefined && (
        <div className="mt-3 pt-3 border-t border-slate-700">
          <span className="text-slate-500 text-xs">{secondaryLabel}: </span>
          <span className={`text-sm font-medium ${isError ? 'text-green-400' : 'text-slate-300'}`}>
            {typeof secondaryValue === 'number' ? secondaryValue.toFixed(1) : secondaryValue}{unit}
            {isError && <span className="text-xs text-green-500 ml-2">(Backup Active)</span>}
          </span>
        </div>
      )}
    </div>
  );
}
