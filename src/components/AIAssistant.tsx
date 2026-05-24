import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

// Curated knowledge base of Patan Salar Khan
const SALAR_KNOWLEDGE = {
  name: "Patan Salar Khan",
  title: "Electrical Engineer | Full-Stack Software Developer & AI/IoT Specialist",
  major: "B.Tech in Electrical & Electronics Engineering, KL University (Specialized in AI Autonomous EV Systems & Mobility)",
  location: "Guntur, Andhra Pradesh, India",
  email: "psalarkhan22@gmail.com",
  phone: "+91 7993547438",
  linkedin: "https://www.linkedin.com/in/salarkhan-patan-75365a230",
  github: "https://github.com/salarkhan2003",
  resume: "https://drive.google.com/file/d/1b5D3_DwILzpCAce5fbNlSHB_hc0cE8BJ/view?usp=sharing",
  grants: "Secured INR 14 Lakh total national grants for an AI-based Railway Inspector.",
  awards: "Winner of the NASA International Space Apps Challenge 2025.",
  experience: "Former Railway Signalling Intern at Efftronics Systems (worked on automated signalling systems).",
  skills: {
    software: "React, Next.js, TypeScript, React Native, Expo, Node.js, Express, Supabase, SQL, Python, OpenCV, REST, GraphQL.",
    hardware: "Autonomous EV Systems, Embedded C, ESP32, CAN Bus protocols, IoT Mesh, PLC, Efftronics Signalling, PySide6 GUI desktop."
  },
  projects: [
    { name: "Roamio", tech: "React Native, Expo, node-edge graph architecture", desc: "AI-powered multi-city travel planner." },
    { name: "KL One", tech: "Supabase, Cashfree UPI, role-based dashboards", desc: "Full-stack campus food ordering super app." },
    { name: "AI Vehicle Safety Surveillance", tech: "YOLOv8, PySide6, OpenCV", desc: "Live dashboard driver fatigue monitoring system." },
    { name: "Orbit Live", tech: "ML analytics, GPS tracking", desc: "Real-time GPS fleet tracking for public transport with machine learning arrival analytics." }
  ]
};

import { PRELOADED_QUESTIONS } from '../data/preloaded_questions';
// Use preloaded questions for suggestion chips
const SUGGESTIONS = PRELOADED_QUESTIONS;


export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hi! I'm Salar's AI Agent. Ask me anything about his engineering work, software development skills, autonomous systems major, projects, or contact details!",
      timestamp: new Date()
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll messages
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Smart local responder
  const getLocalResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    if (q.includes("project") || q.includes("roamio") || q.includes("kl one") || q.includes("fatigue") || q.includes("safety") || q.includes("surveillance") || q.includes("orbit")) {
      return `Salar has built several high-impact software and hardware projects:
• **Roamio:** AI-powered multi-city travel planner using React Native, Expo, and a node-edge graph architecture.
• **KL One:** Full-stack campus food ordering super app running on Supabase, Cashfree UPI, and role-based client/merchant dashboards.
• **AI Vehicle Safety Surveillance:** Live driver fatigue surveillance dashboard powered by YOLOv8, PySide6, and OpenCV.
• **Orbit Live:** Real-time GPS fleet telemetry tracking with ML arrival analytics.

Which project would you like to explore further?`;
    }

    if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("code") || q.includes("language") || q.includes("program")) {
      return `Salar operates at the convergence of hardware systems and software intelligence:
• **Software Engineering:** ${SALAR_KNOWLEDGE.skills.software}
• **Hardware & Automation:** ${SALAR_KNOWLEDGE.skills.hardware}`;
    }

    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("mail") || q.includes("mobile") || q.includes("reach") || q.includes("number")) {
      return `You can reach Patan Salar Khan directly via:
• **Email:** psalarkhan22@gmail.com
• **Phone:** +91 7993547438
• **LinkedIn:** [salarkhan-patan-75365a230](${SALAR_KNOWLEDGE.linkedin})
• **GitHub:** [@salarkhan2003](${SALAR_KNOWLEDGE.github})
• **Resume:** [Google Drive Link](${SALAR_KNOWLEDGE.resume})`;
    }

    if (q.includes("education") || q.includes("university") || q.includes("college") || q.includes("b.tech") || q.includes("eee") || q.includes("major")) {
      return `Salar completed his **B.Tech in Electrical & Electronics Engineering (EEE)** at **KL University**. He major-specialized in **AI Autonomous EV Systems & Mobility**, studying electric drivetrains, battery management systems, and computer vision systems.`;
    }

    if (q.includes("experience") || q.includes("work") || q.includes("job") || q.includes("intern") || q.includes("efftronics")) {
      return `Salar is a former **Railway Signalling Intern** at **Efftronics Systems**, where he worked on safety-critical signaling logic and automation. He has extensive experience building embedded systems (ESP32/CAN Bus) and React/React Native software architectures.`;
    }

    if (q.includes("grant") || q.includes("award") || q.includes("nasa") || q.includes("money") || q.includes("prize") || q.includes("won")) {
      return `Salar has secured major achievements:
• **National Grants:** Secured a total of **INR 14 Lakh** in national grants to develop an AI-based Railway Inspector.
• **Hackathons:** Winner of the **NASA International Space Apps Challenge 2025**.`;
    }

    return `I can tell you all about Salar's projects (Roamio, KL One, fatigue tracking), his skills in Web/Mobile/Hardware, his EEE specialization, Efftronics signaling internship, or how to contact him.

Feel free to ask or pick one of the suggestions below!`;
  };

  // Generate response using local knowledge only
  const generateResponse = async (userQuery: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const localReply = getLocalResponse(userQuery);
      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        sender: 'bot',
        text: localReply,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 500);
  };

  const handleSendMessage = (e?: React.FormEvent, textOverride?: string) => {
    if (e) e.preventDefault();
    const query = textOverride || inputVal;
    if (!query.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    // Generate bot reply
    generateResponse(query);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      
      {/* Floating Chat Box Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="w-[360px] sm:w-[400px] h-[550px] rounded-3xl glass-panel border border-white/10 shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-10 h-10 rounded-xl clay-card-purple flex items-center justify-center shadow-clay-purple animate-pulse">
                  <Sparkles className="w-5 h-5 text-white" />
                </span>
                <div>
                  <h4 className="text-sm font-black text-white leading-tight">Salar's AI Agent</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-ios-green" />
                    <span className="text-[10px] font-bold text-ios-subtext uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 text-white/50 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Main Body */}
            <div className="flex-1 overflow-hidden relative flex flex-col">
              
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 no-scrollbar">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[80%] ${
                      msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                    }`}
                  >
                    <div
                      className={`px-4 py-3 rounded-2xl text-xs md:text-sm font-semibold leading-relaxed ${
                        msg.sender === 'user'
                          ? 'clay-button-blue text-white rounded-tr-none shadow-clay-blue'
                          : 'glass-panel text-white/95 rounded-tl-none border-white/5'
                      }`}
                    >
                      {/* Render line breaks or simple formatting */}
                      <span className="whitespace-pre-wrap">{msg.text}</span>
                    </div>
                    <span className="text-[9px] text-ios-subtext mt-1.5 px-1 block uppercase font-bold tracking-widest">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="self-start max-w-[80%] flex flex-col items-start">
                    <div className="px-4 py-3 rounded-2xl rounded-tl-none glass-panel border-white/5 flex items-center gap-1.5 h-[38px]">
                      <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                
                <div ref={chatEndRef} />
              </div>

              {/* Preloaded suggestion chips */}
              <div className="p-3 border-t border-white/5 overflow-x-auto flex gap-2 shrink-0 no-scrollbar bg-white/[0.01]">
                {SUGGESTIONS.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(undefined, sug)}
                    className="h-8 px-3 rounded-full border border-white/5 hover:border-ios-purple/40 bg-white/5 hover:bg-white/10 shrink-0 text-xs font-semibold text-white/90 hover:text-white transition-all duration-200"
                  >
                    {sug}
                  </button>
                ))}
              </div>

            </div>

            {/* Footer Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/5 bg-white/5 flex gap-2 items-center">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask about Salar's skills or projects..."
                className="flex-1 h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-xs text-white focus:outline-none focus:border-ios-purple transition-colors"
              />
              <button
                type="submit"
                className="w-11 h-11 rounded-xl clay-button-blue shadow-clay-blue flex items-center justify-center text-white"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-2xl clay-button-blue flex items-center justify-center text-white active:scale-95 transition-transform"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

    </div>
  );
}
