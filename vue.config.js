module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://5.200.53.83',
          ws: true,
          changeOrigin: true
        }
      }
    },
    css: {
      loaderOptions: {
        // передача настроек в sass-loader
        sass: {
          data: `@import "~@/assets/scss/variables.scss";`
        }
      }
    }
  }
