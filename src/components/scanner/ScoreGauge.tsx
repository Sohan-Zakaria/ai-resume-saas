'use client';

import React from 'react';
import { getScoreColor } from '@/lib/utils';

interface ScoreGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}

export default function ScoreGauge({
  score,
  size = 180,
  strokeWidth = 14,
  showLabel = true,
}: ScoreGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(100, Math.max(0, score));
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const theme = getScoreColor(score);

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-slate-100 dark:text-slate-800"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={theme.color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center content */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            {score}
          </span>
          <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            out of 100
          </span>
        </div>
      </div>

      {showLabel && (
        <div className="mt-3 flex flex-col items-center">
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${theme.bg} ${theme.border} ${theme.text} border`}
          >
            {theme.label}
          </span>
        </div>
      )}
    </div>
  );
}
