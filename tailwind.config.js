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
          bg: "#FFFFFF",
          sidebar: "#F9F8F7",
          modal: "#FFFFFF",
          popover: "#FFFFFF",
          input: "rgba(242, 241, 238, 0.6)",
          border: "rgba(50, 48, 44, 0.1)",
          borderButton: "rgba(50, 48, 44, 0.15)",
          borderCell: "#E9E9E1",
          primary: "#2C2C2B",
          secondary: "#8E8B86",
          muted: "rgba(70, 68, 64, 0.45)",
          icon: "#A8A49C",
          iconPrimary: "#383836",
          iconSecondary: "#8E8B86",
          blue: "#2383E2",
          blueHover: "#0077D4",
          red: "#EB5757",
          orange: "#DAA340",
          calloutBg: "#F2F1EE",
          hoverBg: "rgba(50, 48, 44, 0.05)",
          selectBg: "rgba(50, 48, 44, 0.1)",
          // Notion Kit Pastel Badge Colors
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
          'sans-serif'
        ]
      },
      boxShadow: {
        'notion': '0 0 0 1px rgba(35, 131, 226, 0.57), 0 0 0 2px rgba(35, 131, 226, 0.35)',
        'notion-card': '0 1px 3px 0 rgba(15, 15, 15, 0.05), 0 0 0 1px rgba(50, 48, 44, 0.1)',
        'notion-card-hover': '0px 8px 12px 0px rgba(25, 25, 25, 0.04), 0px 2px 6px 0px rgba(25, 25, 25, 0.04), 0px 0px 0px 1px rgba(35, 131, 226, 0.4)'
      }
    },
  },
  plugins: [],
}
