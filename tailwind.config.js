/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        notion: {
          bg: "#FAFAFA",
          surface: "#FFFFFF",
          sidebar: "#F7F7F5",
          sidebarHover: "#EFEFEF",
          border: "#E9E9E7",
          divider: "#EBECED",
          text: "#37352F",
          textMuted: "#787774",
          textLight: "#9B9A97",
          calloutBg: "#F1F1EF",
          hoverBg: "rgba(55, 53, 47, 0.04)",
          selectBg: "rgba(55, 53, 47, 0.08)",
          // Pastel Tag Colors (Notion style)
          badge: {
            grayBg: "#F1F1EF",
            grayText: "#37352F",
            brownBg: "#F4EEEE",
            brownText: "#603B2C",
            orangeBg: "#FBECDD",
            orangeText: "#854C1D",
            yellowBg: "#FBF3DB",
            yellowText: "#89632A",
            greenBg: "#EDF3EC",
            greenText: "#2B593F",
            blueBg: "#E7F3F8",
            blueText: "#28456C",
            purpleBg: "#F4F0F7",
            purpleText: "#492970",
            pinkBg: "#F9F0F5",
            pinkText: "#69314C",
            redBg: "#FDEBEC",
            redText: "#6E2929",
          }
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'sans-serif'
        ]
      },
      boxShadow: {
        'notion': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'notion-card': '0 1px 3px 0 rgba(15, 15, 15, 0.05), 0 0 0 1px rgba(15, 15, 15, 0.08)',
        'notion-card-hover': '0 4px 12px 0 rgba(15, 15, 15, 0.08), 0 0 0 1px rgba(15, 15, 15, 0.12)'
      }
    },
  },
  plugins: [],
}
