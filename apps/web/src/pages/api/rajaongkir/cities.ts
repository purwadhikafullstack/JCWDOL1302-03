import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { province } = req.query;

  try {
    const response = await axios.get(
      `https://api.rajaongkir.com/starter/city?province=${province}`,
      {
        headers: {
          key: '16d626286a3207a4bfdddf5d0dfac90c',
        },
      },
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
