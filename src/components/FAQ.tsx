import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: "Who is Patan Salar Khan?",
    a: "I'm a passionate engineer working at the intersection of hardware and software — building full-stack SaaS platforms, AI-powered tools, and safety-critical embedded automation systems.",
  },
  {
    q: "What technologies do you work with?",
    a: "On the software side: React, Next.js, TypeScript, React Native, Node.js, Supabase, Python, and OpenCV. On the hardware side: Embedded C, ESP32, CAN Bus, IoT Mesh Architectures, PLC systems, and Autonomous EV systems.",
  },
  {
    q: "What is your educational background?",
    a: "I hold a B.Tech in Electrical & Electronics Engineering (EEE) from KL University, specializing in AI Autonomous EV Systems & Mobility — covering electric drivetrains, BMS, and computer vision for autonomy.",
  },
  {
    q: "Where are you based and are you open to remote work?",
    a: "I'm based in Guntur, Andhra Pradesh, India. I'm fully open to remote positions globally, research partnerships, and physical deployment opportunities in tech hubs worldwide.",
  },
  {
    q: "What kind of projects have you built?",
    a: "I've built production-grade SaaS dashboards, AI-powered document & analytics tools, React Native mobile apps, autonomous vehicle control systems, IoT edge-node architectures, and real-time computer vision pipelines using YOLOv8.",
  },
  {
    q: "How can I contact you?",
    a: "You can reach me by email at psalarkhan22@gmail.com, call/WhatsApp at +91 7993547438, connect on LinkedIn, or use the contact form on this site.",
  },
  {
    q: "Are you available for freelance or contract work?",
    a: "Yes! I'm open to freelance projects, short-term contracts, and long-term collaborations — especially in AI systems, full-stack web/mobile apps, and embedded IoT solutions.",
  },
  {
    q: "What makes you different from other developers?",
    a: "I uniquely bridge hardware and software — I can design an embedded microcontroller system AND build its cloud dashboard and mobile app. This end-to-end ability across cyber-physical systems is rare.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="relative w-full py-24 px-4 md:px-8 bg-ios-bg">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full grid-bg opacity-[0.06] pointer-events-none" />
      <div className="glow-orb w-[500px] h-[500px] bg-ios-purple top-[-10%] right-[-10%] opacity-[0.08]" />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Heading */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4"
          >
            <HelpCircle className="w-4 h-4 text-ios-blue" />
            <span className="text-xs font-bold text-white/80 uppercase tracking-widest">FAQ</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tight"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-4 text-sm md:text-base font-semibold text-ios-subtext"
          >
            Quick answers about who I am, what I do, and how we can work together.
          </motion.p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full text-left clay-card-dark rounded-2xl px-6 py-5 flex items-center justify-between gap-4 group hover:bg-white/[0.04] transition-all duration-200 border border-white/5"
              >
                <span className="text-sm md:text-base font-bold text-white group-hover:text-ios-blue transition-colors duration-200">
                  {item.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0 w-7 h-7 rounded-full bg-white/5 flex items-center justify-center"
                >
                  <ChevronDown className="w-4 h-4 text-ios-subtext" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pt-3 pb-5 text-sm font-medium text-ios-subtext leading-relaxed border-x border-b border-white/5 rounded-b-2xl -mt-2 bg-white/[0.02]">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
