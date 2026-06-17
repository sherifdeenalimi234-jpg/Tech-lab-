'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/Card';

const speakers = [
  {
    name: "Sherifdeen Titilope Alimi",
    role: "Founder, Nova Community & IFI",
    topic: "Building the Future: The Vision Behind Nova Tech Lab and the Institute of Future Intelligence",
  },
  {
    name: "Falade Paul",
    role: "AI Expert",
    topic: "Artificial Intelligence for Social Impact and Sustainable Development",
  },
  {
    name: "Anuoluwa Akinniyi",
    role: "Cybersecurity Expert",
    topic: "Cybersecurity and Digital Safety in the AI Era",
  },
  {
    name: "Samuel Adebisi",
    role: "Biotechnology Researcher",
    topic: "Biotechnology, Research and Innovation for a Sustainable Future",
  },
  {
    name: "Ogunrinola Islamia Busayo",
    role: "Tech & Nutritionist",
    topic: "Technology and Nutrition: Advancing Food Security for Sustainable Development",
  },
  {
    name: "Odutade Abisola Peace",
    role: "Digital Health Expert",
    topic: "Digital Health Innovations for Better Community Health",
  },
  {
    name: "Oniye Mary Oluwafunmilayo",
    role: "Public Health Specialist",
    topic: "Artificial Intelligence and the Future of Public Health",
  },
  {
    name: "Olusanjo Victoria",
    role: "Nutritionist",
    topic: "Nutrition, Technology and Community Development",
  },
];

export const Speakers = () => {
  return (
    <section className="py-24 bg-white/[0.02]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Meet Our <span className="text-gradient">Speakers</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Visionaries and experts leading the charge in technology, research, and innovation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {speakers.map((speaker, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <GlassCard className="h-full flex flex-col p-6 hover:border-brand-blue/30 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple mb-4 flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-transform">
                  {speaker.name.charAt(0)}
                </div>
                <h3 className="text-lg font-bold mb-1 group-hover:text-brand-blue transition-colors">{speaker.name}</h3>
                <p className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-4">{speaker.role}</p>
                <p className="text-sm text-white/60 italic leading-relaxed mt-auto border-t border-white/5 pt-4">
                  &ldquo;{speaker.topic}&rdquo;
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
