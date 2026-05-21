import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import Scene3D from './Scene3D';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* 3D R3F Canvas and Background particles */}
      <Scene3D />

      {/* Subtle radial ambient glows */}
      <div className="glow-orb w-[600px] h-[600px] bg-ios-purple top-[10%] left-[-10%]" />
      <div className="glow-orb w-[600px] h-[600px] bg-ios-blue bottom-[10%] right-[-10%]" />

      {/* Background Grid */}
      <div className="absolute inset-0 w-full h-full grid-bg opacity-40 pointer-events-none z-[1]" />
      <div className="absolute inset-0 w-full h-full grid-bg-dense opacity-20 pointer-events-none z-[1]" />

      {/* Content Layout */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 relative z-[2]">
        
        {/* Left Side: Headline & Bio Info */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-left">
          {/* iOS 18 Micro-Pill Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as any }}
            className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-ios-card"
          >
            <Sparkles className="w-4 h-4 text-ios-purple" />
            <span className="text-xs font-semibold text-white/90 tracking-wide">3D INTERACTIVE SYSTEM</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as any }}
            className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none mb-4"
          >
            Patan Salar <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ios-blue via-ios-purple to-ios-pink">
              Khan
            </span>
          </motion.h1>

          {/* Subheadline (Large, readable, glass-backed) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] as any }}
            className="glass-panel p-6 rounded-2xl border border-ios-cardBorder/40 mb-8 max-w-xl shadow-2xl"
          >
            <p className="text-lg md:text-xl font-bold text-white mb-2 leading-relaxed">
              Electrical Engineer
            </p>
            <p className="text-sm md:text-base font-semibold text-ios-subtext leading-relaxed">
              Full-Stack Software Developer & AI/IoT Specialist. Specialized in building cyber-physical systems, autonomous intelligence, and scalable cloud SaaS.
            </p>
          </motion.div>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] as any }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="px-8 py-4 rounded-2xl clay-button-blue text-sm font-bold text-white shadow-clay-blue flex items-center gap-2 group transition-all duration-300"
            >
              Explore Projects
              <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a
              href="#contact"
              className="px-8 py-4 rounded-2xl glass-panel-interactive text-sm font-bold text-white border border-ios-cardBorder/40 flex items-center gap-2"
            >
              <MessageSquare className="w-4.5 h-4.5 text-ios-subtext" />
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Right Side: Virtual Interactive Canvas Space indicator */}
        <div className="w-full lg:w-1/2 h-[400px] lg:h-[550px] relative pointer-events-none select-none">
          {/* Circular glow behind the 3D model */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-ios-blue/10 blur-[80px]" />
          
          {/* Subtle instruction text overlay for 3D model */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-panel px-4 py-2 rounded-full border border-ios-cardBorder/30 text-[10px] uppercase tracking-widest text-white/50 text-center font-bold"
          >
            Click & Drag 3D Model
          </motion.div>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] hidden md:block">
        <a href="#about" className="flex flex-col items-center gap-2 text-white/40 hover:text-white transition-colors duration-200">
          <span className="text-[10px] font-bold tracking-widest uppercase">Scroll Down</span>
          <div className="w-5 h-8 border border-white/20 rounded-full relative">
            <div className="w-1.5 h-1.5 bg-ios-purple rounded-full absolute top-1.5 left-1/2 -translate-x-1/2 animate-scroll-down" />
          </div>
        </a>
      </div>
    </section>
  );
}
