import { GetStaticProps } from 'next';
import { Page, ProductCard } from '@/components';
import { getProducts } from '@/lib/products';
import { ClientSideProduct } from '@/types';

interface HomePageProps {
  products: ClientSideProduct[];
}

export const getStaticProps: GetStaticProps = async () => {
  console.log('[HomePage] getStaticProps()');
  const products = await getProducts();
  return { props: { products } };
};

export default function HomePage({ products }: HomePageProps) {
  console.log('[HomePage] render:', products);
  return (
    <Page title='Indoor Plants'>
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </Page>
  );
}
