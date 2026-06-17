'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Assuming event is Friday, May 23, 2025 (picking a future Friday for the timer)
    const eventDate = new Date('2025-05-23T20:00:00+01:00'); // 8:00 PM WAT

    const timer = setInterval(() => {
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToRegister = () => {
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-[128px] animate-pulse" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-6 backdrop-blur-sm">
            Institute of Future Intelligence (IFI) & Nova Community
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-[1.1]">
            Launch of <br className="hidden sm:block" />
            <span className="text-gradient">Nova Tech Lab</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed px-4">
            Empowering Innovation, Intelligence and Sustainable Development.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 px-6">
            <Button size="lg" onClick={scrollToRegister} className="w-full sm:w-auto">Register Now</Button>
            <Button variant="outline" size="lg" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto">
              Learn More
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label} className="glass-card rounded-2xl p-4 flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {value.toString().padStart(2, '0')}
                </span>
                <span className="text-xs uppercase tracking-widest text-white/50">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-white/50 flex flex-col items-center">
            <p className="text-lg font-medium text-white/80">Friday | 8:00 PM (WAT)</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
