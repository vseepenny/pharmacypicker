/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Navy Blue (DHS/ICE Branding)
        'vsee-primary': '#003366',
        'vsee-primary-dark': '#002244',
        'vsee-primary-light': '#004488',

        // DHS/ICE Branding
        'dhs-blue': '#003366',
        'ice-blue': '#005288',

        // Neutral Colors (from Figma)
        'neutral-white': '#FFFFFF',
        'neutral-gray-100': '#F5F5F5',
        'neutral-gray-200': '#E3E5E8',
        'neutral-gray-300': '#BBBBBB',
        'neutral-gray-400': '#A1A1A1',
        'neutral-gray-500': '#888888',
        'neutral-gray-600': '#666666',
        'neutral-gray-700': '#333333',
        'neutral-black': '#000000',

        // Status Colors
        'status-success': '#4CAF50',
        'status-warning': '#FF9800',
        'status-error': '#F44336',
        'status-info': '#2196F3',

        // Risk Level Colors (for AI features)
        'risk-high': '#D32F2F',
        'risk-medium': '#FFA000',
        'risk-low': '#388E3C',

        // Module Colors
        'module-ehr': '#003366',
        'module-pharmacy': '#7B1FA2',
        'module-mar': '#1976D2',
        'module-dental': '#00ACC1',
        'module-referral': '#FB8C00',
        'module-claims': '#5E35B1',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        'card-hover': '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
        'header': '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'card': '8px',
      },
    },
  },
  plugins: [],
}
