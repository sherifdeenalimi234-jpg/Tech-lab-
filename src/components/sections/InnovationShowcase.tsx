'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Lightbulb, Rocket, FlaskConical, Users, Globe } from 'lucide-react';

export const InnovationShowcase = () => {
  const categories = [
    { name: "Innovative Projects", icon: <Rocket className="w-5 h-5" /> },
    { name: "Research Ideas", icon: <FlaskConical className="w-5 h-5" /> },
    { name: "Startup Concepts", icon: <Lightbulb className="w-5 h-5" /> },
    { name: "Community Solutions", icon: <Users className="w-5 h-5" /> },
    { name: "Technology-Driven SDG Initiatives", icon: <Globe className="w-5 h-5" /> },
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-brand-blue/10 via-brand-purple/10 to-brand-gold/10 p-1 rounded-3xl"
          >
            <div className="bg-[#050505] rounded-[calc(1.5rem-1px)] p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Innovation <span className="text-gradient">Showcase</span></h2>
                  <p className="text-white/60">Duration: 30 Minutes</p>
                </div>
                <div className="px-6 py-3 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold font-bold">
                  Call for Submissions
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {categories.map((cat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="flex items-center gap-4 hover:border-brand-blue/50 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-brand-blue">
                        {cat.icon}
                      </div>
                      <span className="font-medium text-white/90">{cat.name}</span>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
