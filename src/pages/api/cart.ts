import { fetchJson } from '@/lib/api';
import { CartItem } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';

const { CMS_URL } = process.env;

function stripCartItem(cartItem: CartItem) {
  return {
    id: cartItem.id,
    product: {
      id: cartItem.product.id,
      title: cartItem.product.title,
      price: cartItem.product.price,
    },
    quantity: cartItem.quantity,
  };
}

async function handleGetCart(req: NextApiRequest, res: NextApiResponse) {
  const { jwt } = req.cookies;
  if (!jwt) return res.status(401).end();

  try {
    const cartItems = await fetchJson(`${CMS_URL}/cart-items`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    res.status(200).json(cartItems.map(stripCartItem));
  } catch (err) {
    console.log('error fetching cart items', err);
    res.status(401).end();
  }
}

async function handlePostCart(req: NextApiRequest, res: NextApiResponse) {
  const { jwt } = req.cookies;
  if (!jwt) return res.status(401).end();

  const { productId, quantity } = req.body;
  try {
    const cartItem = await fetchJson(`${CMS_URL}/cart-items`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product: productId, quantity }),
    });
    res.status(200).json({});
  } catch (err) {
    console.log('error adding cart item', err);
    res.status(401).end();
  }
}

export default async function handleCart(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return handleGetCart(req, res);
    case 'POST':
      return handlePostCart(req, res);
    default:
      return res.status(405).end();
  }
}
