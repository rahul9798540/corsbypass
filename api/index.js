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

// Main function to handle requests
module.exports = (req, res) => {
  let targetUrl = req.url.slice(1); // Remove leading `/`
  
  if (!targetUrl.startsWith("http")) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    return res.end("Error: Provide a valid URL after the domain (e.g., /https://example.com)");
  }

  console.log("Proxying request to:", targetUrl);

  // Set request URL to match CORS Anywhere's expected format
  req.url = "/" + targetUrl;

  // Ensure response headers allow CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");

  proxy.emit("request", req, res);
};


