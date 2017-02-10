module.exports = {
  plugins: [
    require('autoprefixer')({ /* ...options */ }),
    require('css-mqpacker')({ /* ...options */ }),
    require('cssnano')({ /* ...options */ })
  ]
}
