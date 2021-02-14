const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/duedate',
    createProxyMiddleware({
      target: `${process.env.REACT_APP_URI}`,
      changeOrigin: true,
    })
  );
}
