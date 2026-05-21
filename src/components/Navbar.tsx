import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Menu, X } from 'lucide-react';

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

interface NavbarProps {
  linkedinUrl: string;
  githubUrl: string;
  resumeUrl: string;
}

export default function Navbar({ linkedinUrl, githubUrl, resumeUrl }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 md:px-8 py-4 ${
        scrolled ? 'bg-ios-bg/40 backdrop-blur-md border-b border-ios-cardBorder/30 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Name / Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-lg clay-card-blue flex items-center justify-center font-bold text-white text-sm shadow-clay-blue group-hover:scale-105 transition-transform duration-300">
            S
          </span>
          <span className="font-extrabold tracking-tight text-white group-hover:text-ios-blue transition-colors duration-300">
            Salar Khan
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/5 rounded-full p-1.5 backdrop-blur-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-5 py-1.5 rounded-full text-sm font-medium text-ios-subtext hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Social / External Action Icons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full glass-panel-interactive flex items-center justify-center text-ios-subtext hover:text-ios-blue"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-4.5 h-4.5" />
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full glass-panel-interactive flex items-center justify-center text-ios-subtext hover:text-white"
            title="GitHub"
          >
            <GithubIcon className="w-4.5 h-4.5" />
          </a>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-5 rounded-full clay-button flex items-center justify-center text-xs font-semibold text-white gap-2"
          >
            <FileText className="w-4 h-4" />
            Resume
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-10 h-10 rounded-full glass-panel-interactive flex items-center justify-center text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer (iOS 18 Overlay style) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden w-full mt-4 glass-panel rounded-2xl overflow-hidden shadow-2xl border border-ios-cardBorder"
          >
            <div className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl hover:bg-white/5 text-base font-semibold text-ios-subtext hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-white/5 my-2" />
              <div className="flex items-center justify-between mt-2 px-2">
                <div className="flex gap-2">
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl glass-panel-interactive flex items-center justify-center text-ios-subtext hover:text-ios-blue"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl glass-panel-interactive flex items-center justify-center text-ios-subtext hover:text-white"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                </div>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-5 rounded-xl clay-button-blue flex items-center justify-center text-sm font-semibold text-white gap-2 shadow-clay-blue"
                >
                  <FileText className="w-4 h-4" />
                  Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
