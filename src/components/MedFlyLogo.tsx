import React from 'react';

interface MedFlyLogoProps {
  className?: string;
  circleOnly?: boolean;
}

export const MedFlyLogo: React.FC<MedFlyLogoProps> = ({ className = "w-10 h-10", circleOnly = false }) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MedFly Circle With Wings Emblem"
    >
      <defs>
        <linearGradient id="medfly-circle-grad" x1="18" y1="18" x2="46" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="45%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="medfly-wing-left" x1="4" y1="18" x2="30" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="60%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
        <linearGradient id="medfly-wing-right" x1="60" y1="18" x2="34" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="60%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
        <filter id="medfly-glow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#0284c7" floodOpacity="0.4" />
        </filter>
      </defs>

      {!circleOnly && (
        <>
          {/* Left Wing (Sweeping aerodynamic medical flight feathers) */}
          <g filter="url(#medfly-glow)">
            {/* Top Primary Feather */}
            <path
              d="M26 27 C21 22 13 17 4.5 18 C 3 18.2 3.4 20.4 5.2 21 C 11.2 23.2 16.5 26.5 24 32 Z"
              fill="url(#medfly-wing-left)"
            />
            {/* Middle Feather */}
            <path
              d="M23.5 31 C18.5 27.5 11.5 24 6.5 26 C 5.3 26.5 5.8 28.2 7.2 28.6 C 12 30.2 16.5 33 22.5 36.5 Z"
              fill="url(#medfly-wing-left)"
              fillOpacity="0.9"
            />
            {/* Lower Feather */}
            <path
              d="M22 36 C18 34 12.5 32 9 34.5 C 8 35.1 8.6 36.6 9.8 36.8 C 13.5 37.5 17 39 22 41.5 Z"
              fill="url(#medfly-wing-left)"
              fillOpacity="0.8"
            />
          </g>

          {/* Right Wing (Symmetrical sweeping aerodynamic feathers) */}
          <g filter="url(#medfly-glow)">
            {/* Top Primary Feather */}
            <path
              d="M38 27 C43 22 51 17 59.5 18 C 61 18.2 60.6 20.4 58.8 21 C 52.8 23.2 47.5 26.5 40 32 Z"
              fill="url(#medfly-wing-right)"
            />
            {/* Middle Feather */}
            <path
              d="M40.5 31 C45.5 27.5 52.5 24 57.5 26 C 58.7 26.5 58.2 28.2 56.8 28.6 C 52 30.2 47.5 33 41.5 36.5 Z"
              fill="url(#medfly-wing-right)"
              fillOpacity="0.9"
            />
            {/* Lower Feather */}
            <path
              d="M42 36 C46 34 51.5 32 55 34.5 C 56 35.1 55.4 36.6 54.2 36.8 C 50.5 37.5 47 39 42 41.5 Z"
              fill="url(#medfly-wing-right)"
              fillOpacity="0.8"
            />
          </g>
        </>
      )}

      {/* Concentric Precision Orbit Ring */}
      <circle
        cx="32"
        cy="32"
        r="15"
        stroke="#38bdf8"
        strokeWidth="1.2"
        strokeDasharray="3 2"
        strokeOpacity="0.8"
      />

      {/* Central Solid Circle with Radiant Glow */}
      <circle
        cx="32"
        cy="32"
        r="12"
        fill="url(#medfly-circle-grad)"
        stroke="#ffffff"
        strokeWidth="2"
        filter="url(#medfly-glow)"
      />

      {/* Pristine Medical Cross inside the circle */}
      <path
        d="M32 25.5 V38.5 M25.5 32 H38.5"
        stroke="#ffffff"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Central Aviation Cyan Core Pip */}
      <circle cx="32" cy="32" r="1.8" fill="#38bdf8" />
    </svg>
  );
};
