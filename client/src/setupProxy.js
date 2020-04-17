const proxy = require('http-proxy-middleware');
require('dotenv').config();

module.exports = (app) => {
  app.use(proxy('/api', {
    target: `http://${process.env.SERVER_NAME}:${process.env.SERVER_PORT}`,
    pathRewrite: (path, req) => path.replace('/api', '') ,
  }));
}; 