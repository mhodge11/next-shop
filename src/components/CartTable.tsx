import { ClientSideCartItem } from '@/types';

interface CartTableProps {
  cartItems: ClientSideCartItem[];
}

function formatCurrency(amount: number) {
  return `$${amount.toFixed(2)}`;
}

function buildCart(cartItems: ClientSideCartItem[]) {
  let total = 0;
  const items = cartItems.map((cartItem) => {
    const itemTotal = cartItem.product.price * cartItem.quantity;
    total += itemTotal;
    return { ...cartItem, total: itemTotal };
  });
  return { items, total };
}

export default function CartTable({ cartItems }: CartTableProps) {
  const cart = buildCart(cartItems);

  return (
    <table>
      <thead>
        <tr>
          <th className='px-4 py-2'>Product</th>
          <th className='px-4 py-2'>Price</th>
          <th className='px-4 py-2'>Quantity</th>
          <th className='px-4 py-2'>Total</th>
        </tr>
      </thead>
      <tbody>
        {cart.items.map((cartItem) => (
          <tr key={cartItem.id}>
            <td className='px-4 py-2'>{cartItem.product.title}</td>
            <td className='px-4 py-2 text-right'>
              {formatCurrency(cartItem.product.price)}
            </td>
            <td className='px-4 py-2 text-right'>{cartItem.quantity}</td>
            <td className='px-4 py-2 text-right'>
              {formatCurrency(cartItem.total)}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th className='px-4 py-2 text-left'>Total</th>
          <th />
          <th />
          <th className='px-4 py-2 text-right'>{formatCurrency(cart.total)}</th>
        </tr>
      </tfoot>
    </table>
  );
}
