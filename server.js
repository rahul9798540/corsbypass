const cors_proxy = require('cors-anywhere');

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;

cors_proxy.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: [], // 🔹 FIXED: Removed required headers
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
    xfwd: false
  },
}).listen(port, host, function() {
  console.log(`✅ CORS Proxy Running on ${host}:${port}`);
});
