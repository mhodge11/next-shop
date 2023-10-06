import type Picture from '@/types/Picture';

export default interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  picture: Picture;
}
