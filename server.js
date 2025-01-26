const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/get-country', async (req, res) => {
  const { ip } = req.body;
  if (!ip) {
    return res.status(400).json({ error: 'IP address is required' });
  }

  try {
    const geoResponse = await fetch(`http://ip-api.com/json/${ip}`);
    const geoData = await geoResponse.json();

    if (geoData.status === 'success') {
      res.json({ country: geoData.country });
    } else {
      res.status(500).json({ error: 'Failed to fetch geolocation data' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
