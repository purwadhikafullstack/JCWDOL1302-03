import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch('https://api.rajaongkir.com/starter/province', {
    headers: {
      key: process.env.RAJAONGKIR_API_KEY || '16d626286a3207a4bfdddf5d0dfac90c', // Pastikan Anda telah menambahkan RAJAONGKIR_API_KEY di file .env.local
    },
  });
  const data = await response.json();
  res.status(response.status).json(data);
};

export default handler;
