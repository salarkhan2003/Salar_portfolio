import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Static gradient background — no blur, no 3D */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050508] via-[#0a0a14] to-[#050508] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-ios-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-ios-purple/5 blur-[120px] pointer-events-none" />

      {/* Background Grid */}
      <div className="absolute inset-0 w-full h-full grid-bg opacity-30 pointer-events-none z-[1]" />

      {/* Content Layout */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-[2]">

        {/* Left Side: Headline & Bio Info */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-left">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <Sparkles className="w-4 h-4 text-ios-purple" />
            <span className="text-xs font-semibold text-white/90 tracking-wide">FULL-STACK & AI/IOT ENGINEER</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none mb-4"
          >
            Patan Salar <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ios-blue via-ios-purple to-ios-pink">
              Khan
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-8 max-w-xl"
          >
            <p className="text-lg md:text-xl font-bold text-white mb-2 leading-relaxed">
              Electrical Engineer
            </p>
            <p className="text-sm md:text-base font-semibold text-ios-subtext leading-relaxed">
              Full-Stack Software Developer & AI/IoT Specialist. Specialized in building cyber-physical systems, autonomous intelligence, and scalable cloud SaaS.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="px-8 py-4 rounded-2xl bg-ios-blue text-sm font-bold text-white flex items-center gap-2 group transition-all duration-200 hover:bg-blue-500 active:scale-95"
            >
              Explore Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#contact"
              className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-white flex items-center gap-2 hover:bg-white/10 transition-all duration-200 active:scale-95"
            >
              <MessageSquare className="w-4 h-4 text-ios-subtext" />
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Right Side: Profile image + stats */}
        <div className="w-full lg:w-1/2 flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-ios-blue via-ios-purple to-ios-pink opacity-30 blur-xl" />
            <div className="relative p-1 rounded-3xl bg-white/10 border border-white/20">
              <img
                src="/SALAR_PROFILE_IMAGE.png"
                alt="Patan Salar Khan"
                className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-2xl"
                loading="eager"
              />
            </div>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-3 gap-3 w-full max-w-sm"
          >
            {[
              { label: 'Projects', value: '4+' },
              { label: 'Grants', value: '₹14L' },
              { label: 'Awards', value: 'NASA' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <div className="text-xl font-black text-white">{stat.value}</div>
                <div className="text-[10px] font-bold text-ios-subtext uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] hidden md:block">
        <a href="#about" className="flex flex-col items-center gap-2 text-white/40 hover:text-white transition-colors duration-200">
          <span className="text-[10px] font-bold tracking-widest uppercase">Scroll Down</span>
          <div className="w-5 h-8 border border-white/20 rounded-full relative">
            <div className="w-1.5 h-1.5 bg-ios-purple rounded-full absolute top-1.5 left-1/2 -translate-x-1/2 animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
}
