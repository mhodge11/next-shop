import { fetchJson } from '@/lib/api';
import { ClientSideProduct, Product } from '@/types';

const { CMS_URL } = process.env;

export async function getProduct(id: string): Promise<ClientSideProduct> {
  const product = await fetchJson(`${CMS_URL}/products/${id}`);
  return stripProduct(product);
}

export async function getProducts(): Promise<ClientSideProduct[]> {
  const products = await fetchJson(`${CMS_URL}/products`);
  return products.map(stripProduct);
}

function stripProduct(product: Product) {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: `$${product.price.toFixed(2)}`,
    pictureUrl: `${CMS_URL}${product.picture.url}`,
  };
}
