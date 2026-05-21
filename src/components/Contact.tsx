import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, FileText, CheckCircle2, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';
import TiltCard from './TiltCard';

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

interface ContactProps {
  linkedinUrl: string;
  githubUrl: string;
  resumeUrl: string;
}

export default function Contact({ linkedinUrl, githubUrl, resumeUrl }: ContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Confetti pops from left and right
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formspree.io/f/xpqndawr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitted(true);
        triggerConfetti();
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert("Oops! There was a problem submitting your form. Please try again.");
      }
    } catch (error) {
      alert("Oops! There was a network issue. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative w-full py-24 px-4 md:px-8 bg-[#050508]">
      {/* Background Grids */}
      <div className="absolute inset-0 w-full h-full grid-bg opacity-15 pointer-events-none" />
      <div className="glow-orb w-[600px] h-[600px] bg-ios-blue bottom-[-10%] left-[-10%] opacity-15" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4"
          >
            <Mail className="w-4 h-4 text-ios-blue" />
            <span className="text-xs font-bold text-white/85 uppercase tracking-widest">Connect</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tight"
          >
            Get In Touch
          </motion.h2>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          
          {/* Left panel: Info & Social links (2 Cols) */}
          <div className="lg:col-span-2 flex flex-col justify-between gap-6 h-full">
            <TiltCard className="h-full">
              <div className="clay-card-dark p-8 md:p-10 flex flex-col justify-between h-full min-h-[380px]">
                
                <div>
                  <h3 className="text-2xl font-black text-white mb-4">Let's Build Something</h3>
                  <p className="text-sm md:text-base font-semibold text-ios-subtext leading-relaxed mb-8">
                    Whether you want to discuss AI pipelines, autonomous hardware, edge IoT nodes, full stack web apps, or just want to connect, feel free to drop a message or reach out via socials.
                  </p>

                  <div className="flex flex-col gap-5">
                    {/* Direct Mail */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 shadow-inner">
                        <Mail className="w-4.5 h-4.5 text-ios-blue" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-ios-subtext uppercase block">Direct Mail</span>
                        <a href="mailto:psalarkhan22@gmail.com" className="text-sm font-extrabold text-white hover:text-ios-blue transition-colors">
                          psalarkhan22@gmail.com
                        </a>
                      </div>
                    </div>

                    {/* Mobile Number */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 shadow-inner">
                        <Phone className="w-4.5 h-4.5 text-ios-purple" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-ios-subtext uppercase block">Mobile Call</span>
                        <a href="tel:+917993547438" className="text-sm font-extrabold text-white hover:text-ios-purple transition-colors">
                          +91 7993547438
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h4 className="text-xs font-bold text-ios-subtext uppercase tracking-widest mb-4">Digital Nodes</h4>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 px-5 rounded-xl glass-panel-interactive flex items-center justify-center text-sm font-bold text-white gap-2"
                    >
                      <LinkedinIcon className="w-4 h-4 text-ios-blue" />
                      LinkedIn
                    </a>
                    
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 px-5 rounded-xl glass-panel-interactive flex items-center justify-center text-sm font-bold text-white gap-2"
                    >
                      <GithubIcon className="w-4 h-4" />
                      GitHub
                    </a>
                    
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 px-5 rounded-xl clay-button flex items-center justify-center text-sm font-bold text-white gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Resume
                    </a>
                  </div>
                </div>

              </div>
            </TiltCard>
          </div>

          {/* Right panel: Contact Form (3 Cols) */}
          <div className="lg:col-span-3">
            <TiltCard className="h-full">
              <div className="glass-panel p-8 md:p-10 rounded-[28px] border border-ios-cardBorder/40 h-full flex flex-col justify-center">
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 flex flex-col items-center justify-center"
                  >
                    <div className="w-16 h-16 rounded-full clay-card-blue shadow-clay-blue flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">Message Transmitted!</h3>
                    <p className="text-sm font-semibold text-ios-subtext max-w-sm mb-8 leading-relaxed">
                      Thank you for reaching out. I have received your packet and will establish a connection shortly.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-3 rounded-xl clay-button text-xs font-bold text-white"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name input */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-xs font-bold text-ios-subtext uppercase tracking-wider">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Patan Salar Khan"
                          className="glass-input h-12 px-4 rounded-xl text-sm font-semibold"
                        />
                      </div>

                      {/* Email input */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-xs font-bold text-ios-subtext uppercase tracking-wider">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="salarkhan@domain.com"
                          className="glass-input h-12 px-4 rounded-xl text-sm font-semibold"
                        />
                      </div>
                    </div>

                    {/* Message input */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-xs font-bold text-ios-subtext uppercase tracking-wider">
                        Message Content
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Detail your request or proposal here..."
                        className="glass-input p-4 rounded-xl text-sm font-semibold resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-14 mt-2 rounded-xl clay-button-blue text-sm font-bold text-white shadow-clay-blue flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          Broadcasting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Transmit Message
                        </>
                      )}
                    </button>
                  </form>
                )}

              </div>
            </TiltCard>
          </div>

        </div>

        {/* Footer info tag */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ios-subtext font-semibold">
          <span>&copy; {new Date().getFullYear()} Patan Salar Khan. All Rights Reserved.</span>
          
        </div>

      </div>
    </section>
  );
}
