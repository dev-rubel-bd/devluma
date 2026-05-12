/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
     fontFamily: {
  display: ['"Outfit"', 'sans-serif'],
  body:    ['"Outfit"', 'sans-serif'],
  mono:    ['"JetBrains Mono"', 'monospace'],
},
      colors: {
        dark: {
          950: '#03030f',
          900: '#06061a',
          800: '#0a0a24',
          700: '#10102e',
          600: '#1a1a40',
        },
        navy: {
          900: '#0d0c2e',
          800: '#131165',
          700: '#1e1b72',
          600: '#2d2a9e',
          500: '#3730a3',
          400: '#4f46e5',
          300: '#6366f1',
          200: '#818cf8',
          100: '#a5b4fc',
          50:  '#e0e7ff',
        },
      },
      animation: {
         'glow-pulse':      'glowPulse 3s ease-in-out infinite',
        'float':           'float 6s ease-in-out infinite',
        'gradient-shift':  'gradientShift 8s ease infinite',
       'marquee':         'marquee 20s linear infinite',
      },      
      keyframes: {
          marquee: {
                '0%':   { transform: 'translateX(0%)' },
                '100%': { transform: 'translateX(-50%)' },
              },              
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(30,27,114,0.3)' },
          '50%':      { boxShadow: '0 0 50px rgba(79,70,229,0.45)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        }
      },
    },
  },
  plugins: [],
};
