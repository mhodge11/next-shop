import type { NextApiRequest, NextApiResponse } from 'next';
import { getProducts } from '@/lib/products';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('[api/products] req:', req);
  const products = await getProducts();
  res.status(200).json(products);
}
