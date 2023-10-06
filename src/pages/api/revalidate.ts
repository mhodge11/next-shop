import { NextApiRequest, NextApiResponse } from 'next';

export default async function handleRevalidate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('[/api/revalidate] received:', req.body);

  const event = req.body;

  if (event.model === 'product') {
    const { id } = event.entry;
    await Promise.all([res.revalidate('/'), res.revalidate(`/products/${id}`)]);
    console.log(`revalidated product ${id}`);
  }

  res.status(204).end();
}
