module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      keyframes: {
        borderBlink: {
          '50%': { 'border-left' : '2px solid transparent'}
        }
      },
      animation: {
        borderBlink: 'borderBlink 1s infinite'
      }
    },
  },
  plugins: [],
}
