const corsAnywhere = require("cors-anywhere");

// Configure CORS Anywhere
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
  // Extract the actual target URL from the request
  const targetUrl = req.url.replace(/^\/api\//, ""); // Fix extra prefix issue

  if (!/^https?:\/\//.test(targetUrl)) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    return res.end("Error: Provide a valid URL after the domain (e.g., /https://example.com)");
  }

  console.log("Proxying request to:", targetUrl);

  // Correct the request format for CORS Anywhere
  req.url = "/" + targetUrl;
  proxy.emit("request", req, res);
};



