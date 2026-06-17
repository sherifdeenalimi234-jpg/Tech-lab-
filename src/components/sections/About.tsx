'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/Card';
import { Target, Lightbulb, Users, Cpu, Rocket, Globe, Zap } from 'lucide-react';

export const About = () => {
  const objectives = [
    { icon: <Zap className="w-6 h-6 text-brand-blue" />, text: "Foster innovation and creativity" },
    { icon: <Cpu className="w-6 h-6 text-brand-purple" />, text: "Build future-ready technology skills" },
    { icon: <Target className="w-6 h-6 text-brand-gold" />, text: "Promote AI and emerging technologies" },
    { icon: <Lightbulb className="w-6 h-6 text-brand-blue" />, text: "Support research and development" },
    { icon: <Rocket className="w-6 h-6 text-brand-purple" />, text: "Encourage entrepreneurship" },
    { icon: <Globe className="w-6 h-6 text-brand-gold" />, text: "Advance the Sustainable Development Goals" },
    { icon: <Users className="w-6 h-6 text-brand-blue" />, text: "Connect students, researchers and innovators" },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">About <span className="text-gradient">Nova Tech Lab</span></h2>
            <div className="space-y-6 text-white/70 text-lg leading-relaxed">
              <p>
                Nova Tech Lab is a pioneering initiative by the <span className="text-white font-semibold">Institute of Future Intelligence (IFI)</span> and <span className="text-white font-semibold">Nova Community</span>.
              </p>
              <div className="glass-card p-6 border-l-4 border-l-brand-blue">
                <h3 className="text-white font-bold mb-2">Our Mission</h3>
                <p>Creating a thriving ecosystem where innovation, research, technology and leadership converge to solve real-world challenges and advance sustainable development.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard>
              <h3 className="text-2xl font-bold mb-8">Core Objectives</h3>
              <div className="grid gap-6">
                {objectives.map((obj, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {obj.icon}
                    </div>
                    <span className="text-white/80 group-hover:text-white transition-colors">{obj.text}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
