const fetch = require("node-fetch");

export default async function handler(req, res) {
  const proxyUrl = "http://103.3.64.1:8080"; // Use a working SG proxy

  const response = await fetch(proxyUrl, {
    method: "GET",
    headers: {
      "X-Forwarded-For": "103.3.64.1",  
      "User-Agent": "Mozilla/5.0 (Linux; Android 10; SM-G977N)",
      "Referer": "https://astro.com.my/"
    }
  });

  const data = await response.text();
  res.setHeader("Content-Type", "application/dash+xml");
  res.send(data);
}
