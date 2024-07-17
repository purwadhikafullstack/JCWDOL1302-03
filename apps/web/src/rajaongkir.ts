import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 8000;
const API_KEY = 'dfd9e26838af341d0c52c9360c1468eb'; // Ganti dengan API key Anda dari Raja Ongkir

// Endpoint untuk mendapatkan daftar provinsi dari Raja Ongkir
app.get('/api/provinces', async (req, res) => {
  try {
    const response = await axios.get('https://api.rajaongkir.com/starter/province', {
      headers: {
        'key': API_KEY,
      }
    });
    res.json(response.data.rajaongkir.results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch provinces' });
  }
});

// Endpoint untuk mendapatkan daftar kota berdasarkan provinsi dari Raja Ongkir
app.get('/api/cities', async (req, res) => {
  const { province } = req.query;
  if (!province) {
    return res.status(400).json({ error: 'Province parameter is required' });
  }
  try {
    const response = await axios.get('https://api.rajaongkir.com/starter/city', {
      params: { province: province },
      headers: {
        'key': API_KEY,
      }
    });
    res.json(response.data.rajaongkir.results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
