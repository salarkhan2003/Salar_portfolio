import { motion } from 'framer-motion';
import { BookOpen, MapPin, Cpu, Code, Zap, Database } from 'lucide-react';
import TiltCard from './TiltCard';
import MapView from './MapView';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="about" className="relative w-full min-h-screen py-24 px-4 md:px-8 bg-ios-bg">
      {/* Background Grid */}
      <div className="absolute inset-0 w-full h-full grid-bg opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4"
          >
            <Zap className="w-4 h-4 text-ios-orange" />
            <span className="text-xs font-bold text-white/80 uppercase tracking-widest">Biography</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tight"
          >
            About Me
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >

          {/* Card 1: Biography (2 cols) */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <TiltCard className="h-full">
              <div className="clay-card-dark p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center h-full min-h-[320px]">

                {/* Profile Photo */}
                <div className="w-full md:w-1/3 shrink-0 flex justify-center">
                  <div className="relative group">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-ios-blue via-ios-purple to-ios-pink opacity-50 blur-lg group-hover:opacity-85 transition-opacity duration-300" />
                    <div className="relative p-1 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl">
                      <img
                        src="/SALAR_PROFILE_IMAGE.png"
                        alt="Patan Salar Khan"
                        className="w-40 h-40 md:w-44 md:h-44 object-cover rounded-xl shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                </div>

                {/* Biography Text */}
                <div className="flex-1 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-10 h-10 rounded-xl clay-card-purple flex items-center justify-center shadow-clay-purple">
                        <Zap className="w-5 h-5 text-white" />
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-white">Engineering Vision</h3>
                    </div>

                    <p className="text-base font-semibold text-white/95 leading-relaxed mb-4">
                      I am a passionate engineer operating at the convergence of hardware systems and software intelligence. I construct production-grade SaaS platforms, AI-powered tools, and safety-critical automation solutions.
                    </p>

                    <p className="text-xs md:text-sm font-medium text-ios-subtext leading-relaxed">
                      By combining electrical engineering principles with modern full-stack web and mobile development architectures, I bridge the gap between cyber-physical hardware nodes and cloud interfaces.
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-bold bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-white">Full Stack</span>
                    <span className="text-[10px] font-bold bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-white">AI/ML Models</span>
                    <span className="text-[10px] font-bold bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-white">Cyber-Physical Systems</span>
                    <span className="text-[10px] font-bold bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-white">Embedded Systems</span>
                  </div>
                </div>

              </div>
            </TiltCard>
          </motion.div>

          {/* Card 2: Location + OSM Map */}
          <motion.div variants={itemVariants}>
            <TiltCard className="h-full">
              <div className="clay-card-dark p-8 flex flex-col justify-between h-full min-h-[320px]">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-10 h-10 rounded-xl clay-card-orange flex items-center justify-center shadow-clay-orange">
                      <MapPin className="w-5 h-5 text-white" />
                    </span>
                    <h3 className="text-xl font-black text-white">Location</h3>
                  </div>

                  <h4 className="text-lg font-extrabold text-white mb-2">Guntur, AP</h4>
                  <p className="text-sm font-semibold text-ios-subtext leading-relaxed mb-6">
                    Operating out of Guntur, Andhra Pradesh, India. Open to remote positions globally, research partnerships, and physical deployment opportunities in tech hubs.
                  </p>

                  {/* Real OpenStreetMap — no location permission needed */}
                  <MapView />

                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-2 h-2 rounded-full bg-ios-green animate-pulse" />
                    <span className="text-[10px] uppercase font-bold text-ios-green tracking-widest">Active Node</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Card 3: Education */}
          <motion.div variants={itemVariants}>
            <TiltCard className="h-full">
              <div className="clay-card-dark p-8 flex flex-col justify-between h-full min-h-[380px]">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-10 h-10 rounded-xl clay-card-blue flex items-center justify-center shadow-clay-blue">
                      <BookOpen className="w-5 h-5 text-white" />
                    </span>
                    <h3 className="text-xl font-black text-white">Education</h3>
                  </div>

                  <h4 className="text-lg font-extrabold text-white leading-snug mb-1">B.Tech in EEE</h4>
                  <p className="text-xs font-bold text-ios-blue mb-4">KL University</p>

                  <p className="text-sm font-semibold text-ios-subtext leading-relaxed">
                    Specialized in <strong className="text-white">AI Autonomous EV Systems &amp; Mobility</strong>. Focused studies on electric drivetrains, battery management systems (BMS), and computer vision applications for autonomy.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-ios-subtext font-bold">
                  <span>Graduation Major</span>
                  <span className="text-white">EEE + AI Autonomy</span>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Card 4: Expertise Core (2 cols) */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <TiltCard className="h-full">
              <div className="clay-card-dark p-8 md:p-10 h-full min-h-[380px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="w-10 h-10 rounded-xl clay-card-green flex items-center justify-center shadow-clay-green">
                      <Cpu className="w-5 h-5 text-white" />
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-white">Expertise Core</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Software Stack */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Code className="w-4 h-4 text-ios-blue" />
                        <span className="text-sm font-bold text-white uppercase tracking-wider">Software Engineering</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {['React / Next.js', 'AI Agent', 'Full Stack Developer', 'LLM Fine Tuning', 'Mobile Application Development', 'TypeScript', 'React Native & Expo', 'Node.js / Express', 'Supabase & SQL', 'Python / OpenCV', 'REST / GraphQL'].map((tech) => (
                          <span key={tech} className="text-xs font-semibold bg-white/5 border border-white/5 hover:border-ios-blue/40 rounded-lg px-2.5 py-1.5 text-white/90 transition-all duration-200">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hardware Stack */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Cpu className="w-4 h-4 text-ios-purple" />
                        <span className="text-sm font-bold text-white uppercase tracking-wider">Hardware &amp; Automation</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {['Autonomous EV Systems', 'YOLOv8 Vision Models', 'Embedded C / ESP32', 'CAN Bus protocols', 'IoT Mesh Architectures', 'PLC / Efftronics Signalling', 'PySide6 GUI Desktop'].map((tech) => (
                          <span key={tech} className="text-xs font-semibold bg-white/5 border border-white/5 hover:border-ios-purple/40 rounded-lg px-2.5 py-1.5 text-white/90 transition-all duration-200">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-3">
                  <Database className="w-4 h-4 text-ios-subtext" />
                  <span className="text-xs font-semibold text-ios-subtext">Capable of constructing edge nodes, gateway devices, databases, and client dashboards.</span>
                </div>
              </div>
            </TiltCard>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
