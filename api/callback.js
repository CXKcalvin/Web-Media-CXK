export default async function handler(req, res) {
  const code = req.query.code

  if (!code) {
    return res.status(400).json({ error: "Code tidak ada" })
  }

  try {
    const tokenRes = await fetch("https://open-api.tiktok.com/oauth/access_token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_key: process.env.TIKTOK_CLIENT_KEY,
        client_secret: process.env.TIKTOK_CLIENT_SECRET,
        code,
        grant_type: "authorization_code"
      })
    })

    const tokenData = await tokenRes.json()

    res.json(tokenData)
  } catch (err) {
    res.status(500).json({ error: "OAuth gagal" })
  }
}
