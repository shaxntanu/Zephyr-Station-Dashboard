'use client';

import { useEffect, useRef } from 'react';

interface AlertBannerProps {
  isActive: boolean;
  message: string;
}

export default function AlertBanner({ isActive, message }: AlertBannerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isActive && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 alert-flash">
      <div className="bg-red-600 text-white py-3 px-4 flex items-center justify-center gap-3 shadow-lg">
        <span className="text-2xl">🔔</span>
        <span className="font-bold text-lg">{message}</span>
        <span className="text-2xl">⚠️</span>
      </div>
      {/* Simulated buzzer sound - using Web Audio API beep */}
      <audio ref={audioRef} preload="auto">
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleQYAHIHO8NyQJwAALYjeli0AAA==" type="audio/wav" />
      </audio>
    </div>
  );
}
