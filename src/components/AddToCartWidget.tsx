import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import Button from '@/components/Button';
import { fetchJson } from '@/lib/api';

interface AddToCartWidgetProps {
  productId: number;
}

export default function AddToCartWidget({ productId }: AddToCartWidgetProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const mutation = useMutation(() =>
    fetchJson('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity }),
    })
  );

  const handleClick = async () => {
    await mutation.mutateAsync();
    router.push('/cart');
  };

  return (
    <div className='py-2'>
      <input
        type='number'
        min='1'
        className='border rounded px-3 py-1 mr-2 w-16 text-right'
        value={quantity.toString()}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />
      {mutation.isLoading ? (
        <p>Loading...</p>
      ) : (
        <Button onClick={handleClick}>Add to Cart</Button>
      )}
    </div>
  );
}
