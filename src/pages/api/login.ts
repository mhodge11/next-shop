import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { fetchJson } from '@/lib/api';

const { CMS_URL } = process.env;

export default async function handleLogin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body as { email: string; password: string };

  try {
    const { jwt, user } = await fetchJson(`${CMS_URL}/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: email, password }),
    });

    res
      .status(200)
      .setHeader(
        'Set-Cookie',
        cookie.serialize('jwt', jwt, { path: '/api', httpOnly: true })
      )
      .json({ id: user.id, name: user.username });
  } catch (err) {
    console.log('login error:', err);
    res.status(401).end();
  }
}
