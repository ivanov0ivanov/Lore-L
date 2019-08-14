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
          // @/ это псевдоним к каталогу src/ поэтому предполагается,
          // что у вас в проекте есть файл `src/variables.scss`
          data: `@import "~@/assets/scss/variables.scss";`
        }
      }
    }
  }
