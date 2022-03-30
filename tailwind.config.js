module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      keyframes: {
        blink: {
          '50%': { 'border-left' : '2px solid transparent'}
        }
      },
      animation: {
        blink: 'blink 1s infinite'
      }
    },
  },
  plugins: [],
}
