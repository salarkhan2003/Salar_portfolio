/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ios: {
          bg: "#0A0A0C",
          card: "rgba(22, 22, 26, 0.7)",
          cardBorder: "rgba(255, 255, 255, 0.08)",
          text: "#F5F5F7",
          subtext: "#86868B",
          blue: "#007AFF",
          green: "#34C759",
          purple: "#AF52DE",
          orange: "#FF9500",
          pink: "#FF2D55",
        },
        clay: {
          dark: "#1A1A22",
          surface: "#252530",
          accent: "#2A2A3A",
        }
      },
      boxShadow: {
        // Claymorphism: outer shadow + inner highlight + inner depth shadow
        'clay-dark': '0 20px 40px rgba(0,0,0,0.6), inset 0 3px 6px rgba(255,255,255,0.08), inset 0 -8px 16px rgba(0,0,0,0.6)',
        'clay-blue': '0 20px 40px rgba(0,122,255,0.25), inset 0 3px 6px rgba(255,255,255,0.3), inset 0 -8px 16px rgba(0,50,150,0.6)',
        'clay-purple': '0 20px 40px rgba(175,82,222,0.25), inset 0 3px 6px rgba(255,255,255,0.3), inset 0 -8px 16px rgba(80,10,120,0.6)',
        'clay-orange': '0 20px 40px rgba(255,149,0,0.25), inset 0 3px 6px rgba(255,255,255,0.4), inset 0 -8px 16px rgba(150,60,0,0.6)',
        'clay-green': '0 20px 40px rgba(52,199,89,0.25), inset 0 3px 6px rgba(255,255,255,0.3), inset 0 -8px 16px rgba(10,100,30,0.6)',
        
        // Tactile card shadows
        'ios-card': '0 10px 30px rgba(0,0,0,0.4), 0 1px 2px rgba(255,255,255,0.1)',
        'ios-btn': '0 4px 12px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.2)',
        
        // Neon glow shadows for 3D vibes
        'glow-blue': '0 0 20px rgba(0, 122, 255, 0.4)',
        'glow-purple': '0 0 20px rgba(175, 82, 222, 0.4)',
      },
      fontFamily: {
        sans: [
          'SF Pro Display', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          'Inter', 
          'sans-serif'
        ],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-fast': 'float 3.5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'scroll-down': 'scrollDown 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(1deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        scrollDown: {
          '0%': { transform: 'translate(-50%, 0) scaleY(0)', transformOrigin: 'top', opacity: 0 },
          '50%': { transform: 'translate(-50%, 0) scaleY(1)', transformOrigin: 'top', opacity: 1 },
          '51%': { transform: 'translate(-50%, 0) scaleY(1)', transformOrigin: 'bottom', opacity: 1 },
          '100%': { transform: 'translate(-50%, 0) scaleY(0)', transformOrigin: 'bottom', opacity: 0 },
        }
      }
    },
  },
  plugins: [],
}
