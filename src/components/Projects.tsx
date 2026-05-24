import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Compass, Shield, MapPin, ShoppingBag } from 'lucide-react';
import TiltCard from './TiltCard';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  github?: string;
  live?: string;
  color: 'blue' | 'purple' | 'orange' | 'green';
}

export default function Projects() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: 'roamio',
      title: 'Roamio',
      subtitle: 'AI Multi-City Travel Planner',
      description: 'An AI-powered multi-city itinerary planner using React Native, Expo, and a node-edge graph architecture. Computes optimal routes, custom schedules, and matches user travel styles using semantic models.',
      icon: <Compass className="w-6 h-6 text-white" />,
      tags: ['React Native', 'Expo', 'Node-Edge Graph', 'AI Engine', 'TypeScript'],
      github: 'https://github.com/salarkhan2003',
      color: 'blue'
    },
    {
      id: 'klone',
      title: 'KL One',
      subtitle: 'Campus Food Ordering Super App',
      description: 'Full-stack campus food ordering application featuring Supabase backend, Cashfree UPI payment gateway integration, and role-based real-time dashboards for vendors, drivers, and students.',
      icon: <ShoppingBag className="w-6 h-6 text-white" />,
      tags: ['React / Next.js', 'Supabase', 'Cashfree UPI', 'Real-time WebSockets', 'PostgreSQL'],
      github: 'https://github.com/salarkhan2003',
      color: 'green'
    },
    {
      id: 'aisafety',
      title: 'AI Vehicle Surveillance',
      subtitle: 'Live Fatigue & Safety Monitor',
      description: 'Safety-critical live surveillance dashboard built using YOLOv8, PySide6, and OpenCV. Monitors driver fatigue (eye closure/yawning) and gauges road threats, providing instant audio alerts.',
      icon: <Shield className="w-6 h-6 text-white" />,
      tags: ['Python', 'YOLOv8', 'PySide6 GUI', 'OpenCV', 'AI Object Detection'],
      github: 'https://github.com/salarkhan2003',
      color: 'purple'
    },
    {
      id: 'orbitlive',
      title: 'Orbit Live',
      subtitle: 'Real-Time GPS Fleet Tracker',
      description: 'High-precision fleet tracking system for public transport utilizing real-time GPS telemetry combined with Machine Learning models for predictive route delays and bus arrivals.',
      icon: <MapPin className="w-6 h-6 text-white" />,
      tags: ['React', 'Node.js', 'Machine Learning', 'GPS Telemetry', 'Maps APIs'],
      github: 'https://github.com/salarkhan2003',
      color: 'orange'
    }
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 420; // Width of cards + margin
    const container = scrollContainerRef.current;
    
    container.scrollTo({
      left: container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
      behavior: 'smooth'
    });
  };

  const getClayColor = (color: string) => {
    switch (color) {
      case 'blue': return 'clay-card-blue';
      case 'purple': return 'clay-card-purple';
      case 'orange': return 'clay-card-orange';
      case 'green': return 'clay-card-blue'; // Reused standard layouts
      default: return 'clay-card-dark';
    }
  };

  const getShadowColor = (color: string) => {
    switch (color) {
      case 'blue': return 'shadow-clay-blue text-ios-blue';
      case 'purple': return 'shadow-clay-purple text-ios-purple';
      case 'orange': return 'shadow-clay-orange text-ios-orange';
      case 'green': return 'shadow-clay-blue text-ios-green';
      default: return 'shadow-ios-card text-white';
    }
  };

  return (
    <section id="projects" className="relative w-full py-24 px-4 md:px-8 bg-[#050508]">
      {/* Background grid */}
      <div className="absolute inset-0 w-full h-full grid-bg opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4"
            >
              <Compass className="w-4 h-4 text-ios-blue" />
              <span className="text-xs font-bold text-white/85 uppercase tracking-widest">Showcase</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-black text-white tracking-tight"
            >
              Featured Projects
            </motion.h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-3 mt-6 md:mt-0">
            <button
              onClick={() => handleScroll('left')}
              className="w-12 h-12 rounded-full glass-panel-interactive flex items-center justify-center text-white border border-ios-cardBorder/30"
              title="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="w-12 h-12 rounded-full glass-panel-interactive flex items-center justify-center text-white border border-ios-cardBorder/30"
              title="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-4 px-2 no-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="w-[340px] md:w-[400px] shrink-0 snap-start"
            >
              <TiltCard className="w-full h-full">
                <div className="glass-panel p-8 rounded-[28px] border border-ios-cardBorder/40 h-full flex flex-col justify-between min-h-[480px]">
                  
                  <div>
                    {/* Project Header (Icon + Title) */}
                    <div className="flex items-center justify-between mb-8">
                      <div className={`w-12 h-12 rounded-2xl ${getClayColor(project.color)} ${getShadowColor(project.color)} flex items-center justify-center`}>
                        {project.icon}
                      </div>
                      
                      {/* Interactive tag */}
                      <span className="text-[10px] uppercase font-black text-ios-subtext bg-white/5 border border-white/10 rounded-full px-3 py-1">
                        Active Build
                      </span>
                    </div>

                    {/* Titles */}
                    <h3 className="text-2xl font-black text-white leading-tight mb-1">
                      {project.title}
                    </h3>
                    <p className={`text-xs font-bold ${getShadowColor(project.color)} uppercase tracking-wider mb-5`}>
                      {project.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-sm font-semibold text-ios-subtext leading-relaxed mb-8">
                      {project.description}
                    </p>
                  </div>

                  {/* Footing section */}
                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="text-[10px] font-bold text-white/80 bg-white/5 border border-white/5 rounded-md px-2 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 h-11 rounded-xl clay-button flex items-center justify-center text-xs font-semibold text-white gap-2"
                        >
                          <GithubIcon className="w-4 h-4" />
                          Codebase
                        </a>
                      )}
                      <a
                        href="https://github.com/salarkhan2003"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-xl glass-panel-interactive flex items-center justify-center text-white"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
