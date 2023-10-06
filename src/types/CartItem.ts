import type Product from '@/types/Product';

export default interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}
