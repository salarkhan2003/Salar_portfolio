import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Award, Milestone, BadgeDollarSign } from 'lucide-react';
import TiltCard from './TiltCard';

interface TimelineItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  date: string;
  icon: React.ReactNode;
  details: string;
  color: 'blue' | 'purple' | 'orange' | 'pink';
}

export default function Timeline() {
  const items: TimelineItem[] = [
    {
      id: 'nasa',
      category: 'Global Hackathon Winner',
      title: 'NASA Space Apps Challenge 2025',
      subtitle: 'International Winner & Space Innovator',
      date: '2025',
      icon: <Award className="w-5 h-5 text-white" />,
      details: 'Won the NASA International Space Apps Challenge. Designed and built an open-source system utilizing Earth observation satellite data to trace micro-climate patterns, assisting wildfire risk modeling.',
      color: 'pink',
    },
    {
      id: 'grants',
      category: 'Government & Research Grants',
      title: 'AI-based Railway Inspector',
      subtitle: 'Secured INR 14 Lakhs National Funding',
      date: '2024 - 2025',
      icon: <BadgeDollarSign className="w-5 h-5 text-white" />,
      details: 'Awarded INR 14 Lakh total national research grants. Developed a real-time computer vision system deployed on autonomous rail track inspect-bots for detecting micro-fractures, improving railway transit safety.',
      color: 'orange',
    },
    {
      id: 'efftronics',
      category: 'Professional Experience',
      title: 'Efftronics Systems',
      subtitle: 'Railway Signalling Intern',
      date: '2024',
      icon: <Briefcase className="w-5 h-5 text-white" />,
      details: 'Analyzed railway signal network schemas and solid-state interlocking protocols. Created fail-safe telemetry scripts and assisted in testing industrial safety equipment.',
      color: 'blue',
    },
  ];

  const getBorderColor = (color: string) => {
    switch (color) {
      case 'blue': return 'border-ios-blue';
      case 'orange': return 'border-ios-orange';
      case 'pink': return 'border-ios-pink';
      default: return 'border-white/10';
    }
  };

  return (
    <section id="experience" className="relative w-full py-24 px-4 md:px-8 bg-ios-bg">
      {/* Background patterns */}
      <div className="absolute inset-0 w-full h-full grid-bg-dense opacity-[0.06] pointer-events-none" />
      <div className="glow-orb w-[500px] h-[500px] bg-ios-pink top-[15%] left-[-15%] opacity-5" />
      <div className="glow-orb w-[500px] h-[500px] bg-ios-orange bottom-[15%] right-[-15%] opacity-5" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4"
          >
            <Milestone className="w-4 h-4 text-ios-pink" />
            <span className="text-xs font-bold text-white/85 uppercase tracking-widest">Milestones</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tight"
          >
            Achievements & Experience
          </motion.h2>
        </div>

        {/* Timeline Path container */}
        <div className="relative border-l border-white/10 ml-4 md:ml-32 py-2 flex flex-col gap-16">
          
          {items.map((item, index) => (
            <div key={item.id} className="relative flex flex-col md:flex-row gap-8">
              
              {/* Date node (Visible only on desktop, positioned on the left of timeline line) */}
              <div className="hidden md:block absolute right-full mr-12 text-right w-24 pt-4">
                <span className="text-sm font-extrabold text-ios-subtext tracking-wider">{item.date}</span>
              </div>

              {/* Central Circle Node on Timeline Line */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: 'spring', stiffness: 200, delay: index * 0.1 }}
                style={{
                  background: item.color === 'blue' ? '#007AFF' : item.color === 'orange' ? '#FF9500' : '#FF2D55',
                  boxShadow: item.color === 'blue' ? '0 0 15px #007AFF' : item.color === 'orange' ? '0 0 15px #FF9500' : '0 0 15px #FF2D55',
                }}
                className="absolute left-[-9px] top-4 w-4 h-4 rounded-full border-2 border-ios-bg z-20"
              />

              {/* Timeline Card Content (slides in) */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] as any }}
                className="w-full pl-6 md:pl-0"
              >
                <TiltCard className="w-full">
                  <div className={`glass-panel p-8 rounded-2xl border-l-4 ${getBorderColor(item.color)} border-y-white/5 border-r-white/5 shadow-2xl`}>
                    
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-ios-subtext mb-1 block">
                          {item.category}
                        </span>
                        <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-sm font-bold text-white/80 mt-1">
                          {item.subtitle}
                        </p>
                      </div>
                      
                      {/* Interactive pill indicating year */}
                      <span className="md:hidden text-xs font-bold text-ios-subtext bg-white/5 rounded-full px-3 py-1 border border-white/5">
                        {item.date}
                      </span>
                    </div>

                    {/* Description Details */}
                    <p className="text-sm md:text-base font-semibold text-ios-subtext leading-relaxed">
                      {item.details}
                    </p>

                  </div>
                </TiltCard>
              </motion.div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
