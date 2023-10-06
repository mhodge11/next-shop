// Option 1: fetch products on the server side (in getStaticProps)
import Head from 'next/head';
import Title from '@/components/Title';
import { Product } from '@/types';

interface HomePageProps {
  products: Product[];
}

export async function getStaticProps() {
  console.log('[HomePage] getStaticProps()');
  const response = await fetch('http://localhost:1337/products');
  const products = await response.json();
  return {
    props: {
      products,
    },
  };
}

function HomePage({ products }: HomePageProps) {
  console.log('[HomePage] render:', products);
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className='px-6 py-4'>
        <Title>Next Shop</Title>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default HomePage;
