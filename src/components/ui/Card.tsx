import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div className={cn('bg-white/5 border border-white/10 rounded-2xl p-6', className)}>
      {children}
    </div>
  );
};

export const GlassCard = ({ children, className }: CardProps) => {
  return (
    <div className={cn('glass-card rounded-3xl p-8 overflow-hidden relative group', className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
