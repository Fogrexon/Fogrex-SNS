const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(proxy('/api/*', {
    target: `http://sns-server:${process.env.SERVER_PORT}`,
    pathRewrite: {
      '^/api': ''
    }
  }));
}; 