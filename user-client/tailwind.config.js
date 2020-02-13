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
    },
    maxWidth: {
      'screen': '100vw'
    }
  },
  variants: {
    flexDirection: ['responsive'],
    flexWrap: ['responsive'],
  },
  plugins: [
    require('autoprefixer')
  ]
}
