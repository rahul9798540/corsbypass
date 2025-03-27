export default async function handler(req, res) {
  const url = "https://linearjitp-playback.astro.com.my/dash-wv/linear/2504/default_ott.mpd";

  try {
    const response = await fetch(url, {
      headers: {
        "X-Forwarded-For": "103.3.64.1",  // Fake SG IP
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; SM-G977N)",
        "Referer": "https://astro.com.my/"
      }
    });

    if (!response.ok) {
      return res.status(response.status).send("Failed to fetch MPD");
    }

    const data = await response.text();
    res.setHeader("Content-Type", "application/dash+xml");
    res.send(data);
  } catch (error) {
    res.status(500).send("Server Error");
  }
}
