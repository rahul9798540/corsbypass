const corsAnywhere = require("cors-anywhere");

const proxy = corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: [], // No restrictions
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
  const targetUrl = req.url.slice(1); // Remove leading `/`
  
  if (!targetUrl.startsWith("http")) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    return res.end("Error: Provide a valid URL after the domain (e.g., /https://example.com)");
  }

  console.log("Proxying request to:", targetUrl);
  req.url = "/" + targetUrl; // Fix request format for CORS Anywhere
  proxy.emit("request", req, res);
};

