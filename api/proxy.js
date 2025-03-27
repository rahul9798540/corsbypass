export default async function handler(req, res) {
  const targetUrl = "https://linearjitp-playback.astro.com.my/dash-wv/linear/2504/default_ott.mpd";
  const proxyUrl = "http://103.3.64.1:8080"; // Change this to a working SG proxy

  try {
    const response = await fetch(targetUrl, {
      method: "GET",
      agent: new require("https-proxy-agent")(proxyUrl), // Ensure requests use the proxy
      headers: {
        "X-Forwarded-For": "103.3.64.1",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; SM-G977N)",
        "Referer": "https://astro.com.my/"
      }
    });

    if (!response.ok) {
      return res.status(404).send("Failed to fetch MPD");
    }

    const data = await response.text();
    res.setHeader("Content-Type", "application/dash+xml");
    res.send(data);
  } catch (error) {
    res.status(500).send("Server Error: " + error.message);
  }
}
