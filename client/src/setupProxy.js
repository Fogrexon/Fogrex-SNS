const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(proxy('/api/*', {
    target: 'http://sns-server:4000',
    pathRewrite: {
      '^/api': ''
    }
  }));
};