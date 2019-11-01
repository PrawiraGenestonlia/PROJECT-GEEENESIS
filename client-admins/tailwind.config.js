module.exports = {
  theme: {
    extend: {
      colors: {
        divider: 'rgba(100,100,100,0.4)',
      },
    },
    maxHeight: {
      '3/4': '75%'
    },
    fontFamily: {
    },
    minWidth: {
      '2/12': '16.666667%'
    }
  },
  variants: {},
  plugins: [
    require('autoprefixer')
  ]
}
