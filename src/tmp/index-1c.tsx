// Option 1: fetch products on the server side (in getStaticProps)
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Title from '@/components/Title';
import { getProducts } from '@/lib/products';
import { Product } from '@/types';

interface HomePageProps {
  products: Product[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  console.log('[HomePage] getServerSideProps()');
  const products = await getProducts();
  return { props: { products }, revalidate: 30 };
};

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
