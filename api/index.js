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
    "total-route-time",
  ],
  redirectSameOrigin: true,
  httpProxyOptions: {
    xfwd: false,
    changeOrigin: true,
  },
  checkRequest: function (origin, url, callback) {
    if (!/^https?:\/\//.test(url)) {
      return callback(new Error("Invalid host: " + url));
    }
    callback(null, url);
  },
});

module.exports = (req, res) => {
  req.url = req.url.replace(/^\/api/, ""); // Remove `/api` prefix
  proxy.emit("request", req, res);
};
