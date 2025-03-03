const cors_proxy = require('cors-anywhere');

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;

cors_proxy.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: [], 
  removeHeaders: [
    'cookie',
    'cookie2',
    'x-request-start',
    'x-request-id',
    'via',
    'connect-time',
    'total-route-time'
  ],
  redirectSameOrigin: true,
  httpProxyOptions: {
    xfwd: false,
    changeOrigin: true
  },
  checkRequest: function(origin, url, callback) {
    if (!/^https?:\/\//.test(url)) {
      return callback(new Error('Invalid host: ' + url));
    }
    callback(null, url);
  }
}).listen(port, host, function() {
  console.log(`Running CORS Anywhere on ${host}:${port}`);
});
