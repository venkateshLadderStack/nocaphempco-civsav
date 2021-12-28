// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Data = {
  message: string;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const data = req.body;
    try {
      const result = await axios.post(
        'https://connect.squareupsandbox.com/v2/payments',
        data,
        {
          headers: {
            Authorization: `Bearer ${process.env.SQUARE_BEARER_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
      res.status(200).json({ message: 'success', data: result.data });
    } catch (e: any) {
      console.log('---server error', e.response.data);
      res
        .status(421)
        .json({ message: 'error', data: e.response?.data?.errors[0] });
    }
  } else {
    // Handle any other HTTP method
  }
}
