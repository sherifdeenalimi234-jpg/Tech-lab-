'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/Card';
import { MessageSquareQuote } from 'lucide-react';

export const PanelDiscussion = () => {
  const panelists = [
    "Falade Paul",
    "Anuoluwa Akinniyi",
    "Ogunrinola Islamia Busayo"
  ];

  return (
    <section className="py-24 bg-white/[0.02]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 italic">Panel <span className="text-gradient">Discussion</span></h2>
            <div className="glass-card p-6 border-l-4 border-brand-purple mb-8">
              <h3 className="text-xl font-bold text-white/90 mb-2">Theme:</h3>
              <p className="text-xl text-white leading-relaxed">
                &ldquo;Leveraging Technology and Innovation to Achieve the Sustainable Development Goals in Africa&rdquo;
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <GlassCard>
              <div className="flex items-center gap-3 mb-8 text-brand-blue">
                <MessageSquareQuote className="w-8 h-8" />
                <h3 className="text-2xl font-bold text-white">The Panel</h3>
              </div>

              <div className="space-y-8">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-4">Moderator</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-blue flex items-center justify-center font-bold shadow-lg shadow-brand-blue/20">SA</div>
                    <span className="text-lg md:text-xl font-semibold">Sherifdeen Titilope Alimi</span>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-4">Panelists</p>
                  <div className="grid grid-cols-1 gap-3">
                    {panelists.map((panelist, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5"
                      >
                        <div className="w-10 h-10 rounded-full bg-brand-purple/50 flex items-center justify-center font-bold text-sm">
                          {panelist.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium">{panelist}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};
