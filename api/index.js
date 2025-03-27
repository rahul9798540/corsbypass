const corsAnywhere = require("cors-anywhere");

// CORS Anywhere Options
const proxy = corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: [], // No header restrictions
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

// Vercel API Handler
module.exports = (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, Content-Type"
    });
    return res.end();
  }

  // Ensure request URL is correct
  if (!req.url.startsWith("/http")) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    return res.end("Error: Provide a valid URL after the domain (e.g., /https://example.com)");
  }

  console.log("Proxying request to:", req.url);
  proxy.emit("request", req, res);
};
