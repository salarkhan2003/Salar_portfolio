import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import AIAssistant from './components/AIAssistant';

export default function App() {
  const linkedinUrl = "https://www.linkedin.com/in/salarkhan-patan-75365a230";
  const githubUrl = "https://github.com/salarkhan2003";
  const resumeUrl = "https://drive.google.com/file/d/1b5D3_DwILzpCAce5fbNlSHB_hc0cE8BJ/view?usp=sharing";

  return (
    <div className="min-h-screen bg-ios-bg text-ios-text relative overflow-x-hidden selection:bg-ios-blue selection:text-white">
      {/* Dynamic iOS 18 Dock Navigation Bar */}
      <Navbar 
        linkedinUrl={linkedinUrl} 
        githubUrl={githubUrl} 
        resumeUrl={resumeUrl} 
      />

      {/* Main Interactive Hero Section (renders 3D Canvas) */}
      <Hero />

      {/* About Me Bento Grid */}
      <About />

      {/* Interactive Horizontal Scroll 3D Showcase */}
      <Projects />

      {/* Tactile Experience & Achievements Timeline */}
      <Timeline />

      {/* Frequently Asked Questions */}
      <FAQ />

      {/* Contact Form with Confetti Feedback */}
      <Contact 
        linkedinUrl={linkedinUrl} 
        githubUrl={githubUrl} 
        resumeUrl={resumeUrl} 
      />

      {/* Floating AI Conversation Agent */}
      <AIAssistant />
    </div>
  );
}
