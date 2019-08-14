var proxy = require('http-proxy-middleware')

var options = {
  target: 'http://5.200.53.83',
  changeOrigin: true,
  ws: true,
  pathRewrite: {
    '^/open_project': '/api/v3/', // rewrite path
  },
}

// create the proxy (without context)
module.exports = proxy(options)


