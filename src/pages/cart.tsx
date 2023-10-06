import { useQuery } from 'react-query';
import { CartTable, Page } from '@/components';
import { fetchJson } from '@/lib/api';

export default function CartPage() {
  const query = useQuery('cartItems', () => fetchJson('/api/cart'));
  const cartItems = query.data;

  console.log('[CartPage] cartItems', cartItems);

  return (
    <Page title='Cart'>{cartItems && <CartTable cartItems={cartItems} />}</Page>
  );
}
