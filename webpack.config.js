const path = require('path')

module.exports = {
  resolve: {
    alias: {
      app: path.resolve(__dirname, 'src/app'),
      components: path.resolve(__dirname, 'src/components'),
      layout: path.resolve(__dirname, 'src/layout'),
      screens: path.resolve(__dirname, 'src/screens'),
      'style-guide': path.resolve(__dirname, 'src/style-guide'),
      utilities: path.resolve(__dirname, 'src/utilities')
    },
    extensions: ['.js', '.jsx', '.json']
  }
}
