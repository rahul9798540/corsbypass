const corsAnywhere = require("cors-anywhere");

const proxy = corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: [],
  removeHeaders: [
    "cookie",
    "cookie2",
    "x-request-start",
    "x-request-id",
    "via",
    "connect-time",
    "total-route-time"
  ],
  redirectSameOrigin: true,
  httpProxyOptions: {
    xfwd: false,
    changeOrigin: true
  }
});

module.exports = (req, res) => {
  req.url = req.url.replace(/^\/api/, ""); // Adjust path for Vercel API
  req.headers["x-forwarded-for"] = req.connection.remoteAddress; // Improve proxy behavior
  proxy.emit("request", req, res);
};
