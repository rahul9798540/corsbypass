var cors_proxy = require('cors-anywhere');

var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 8080;

var originBlacklist = process.env.CORSANYWHERE_BLACKLIST ? process.env.CORSANYWHERE_BLACKLIST.split(',') : [];
var originWhitelist = process.env.CORSANYWHERE_WHITELIST ? process.env.CORSANYWHERE_WHITELIST.split(',') : ['*'];

cors_proxy.createServer({
  originBlacklist: originBlacklist,
  originWhitelist: originWhitelist,

  // ✅ Fix: Allow requests without "Origin" header
  requireHeader: null,  

  removeHeaders: [
    'cookie', 'cookie2', 'x-request-start', 'x-request-id', 'via', 
    'connect-time', 'total-route-time'
  ],
  redirectSameOrigin: true,
  httpProxyOptions: { xfwd: false },

}).listen(port, host, function() {
  console.log(`✅ CORS Proxy Running on ${host}:${port}`);
});
