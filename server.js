// Import required modules
var cors_proxy = require('cors-anywhere');

// Set server host and port (default to 0.0.0.0:8080)
var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 8080;

// Define whitelist and blacklist (empty to allow all origins)
var originBlacklist = [];
var originWhitelist = [];

// Create and start CORS proxy server
cors_proxy.createServer({
  originBlacklist: originBlacklist,
  originWhitelist: originWhitelist,

  // ✅ Fix: Remove required headers to avoid "Missing required request header" error
  requireHeader: [],  

  // ✅ Improved security: Remove unwanted headers that might cause issues
  removeHeaders: [
    'cookie',
    'cookie2',
    'x-request-start',
    'x-request-id',
    'via',
    'connect-time',
    'total-route-time'
  ],

  // ✅ Allow same-origin redirects
  redirectSameOrigin: true,

  // ✅ Disable adding "X-Forwarded-For" headers to avoid detection by websites
  httpProxyOptions: {
    xfwd: false
  },

}).listen(port, host, function() {
  console.log(`✅ CORS Anywhere Running on ${host}:${port}`);
});
