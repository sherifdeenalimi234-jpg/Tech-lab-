import React from 'react';

export const IFILogo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" />
    <path d="M30 70V30H40V70H30Z" fill="currentColor" />
    <path d="M45 70V30H65V40H55V45H65V55H55V70H45Z" fill="currentColor" />
    <path d="M70 70V30H80V70H70Z" fill="currentColor" />
    <circle cx="50" cy="50" r="2" fill="currentColor" className="animate-pulse" />
  </svg>
);

export const NovaLogo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 80L50 20L80 80H70L50 40L30 80H20Z" fill="currentColor" />
    <path d="M50 50L60 70H40L50 50Z" fill="currentColor" />
    <circle cx="50" cy="20" r="5" fill="#ff9d00" />
  </svg>
);
