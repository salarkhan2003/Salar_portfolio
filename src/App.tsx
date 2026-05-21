import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
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

      {/* Main Interactive Hero Section */}
      <Hero />

      {/* About Me Bento Grid */}
      <About />

      {/* Interactive Projects Showcase */}
      <Projects />

      {/* Experience & Achievements Timeline */}
      <Timeline />

      {/* Contact Form */}
      <Contact
        linkedinUrl={linkedinUrl}
        githubUrl={githubUrl}
        resumeUrl={resumeUrl}
      />

      {/* Frequently Asked Questions — last section */}
      <FAQ />

      {/* Floating AI Conversation Agent */}
      <AIAssistant />
    </div>
  );
}
