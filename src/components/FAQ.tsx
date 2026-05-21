import { useState } from 'react';
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
    <section id="faq" className="relative w-full py-20 px-4 md:px-8 bg-ios-bg">
      <div className="max-w-3xl mx-auto">

        {/* Heading — simple, no scroll animation to reduce paint cost */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
            <HelpCircle className="w-4 h-4 text-ios-blue" />
            <span className="text-xs font-bold text-white/80 uppercase tracking-widest">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm font-semibold text-ios-subtext">
            Quick answers about who I am, what I do, and how we can work together.
          </p>
        </div>

        {/* Accordion — pure CSS transitions, no Framer Motion */}
        <div className="flex flex-col gap-2">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden"
              >
                {/* Question button */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm md:text-base font-bold text-white">
                    {item.q}
                  </span>
                  <span
                    className="shrink-0 w-7 h-7 rounded-full bg-white/5 flex items-center justify-center"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                    }}
                  >
                    <ChevronDown className="w-4 h-4 text-ios-subtext" />
                  </span>
                </button>

                {/* Answer — CSS max-height transition for zero-jank collapse */}
                <div
                  style={{
                    maxHeight: isOpen ? '300px' : '0px',
                    opacity: isOpen ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease, opacity 0.25s ease',
                  }}
                >
                  <p className="px-5 pb-5 text-sm font-medium text-ios-subtext leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
