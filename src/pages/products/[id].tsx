import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { AddToCartWidget, Page } from '@/components';
import { useUser } from '@/hooks';
import { getProduct, getProducts } from '@/lib/products';
import { ClientSideProduct } from '@/types';

interface ProductPageProps {
  product: ClientSideProduct;
}

export const getStaticPaths: GetStaticPaths = async () => {
  console.log('[HomePage] getStaticPaths()');
  const products = await getProducts();
  const paths = products.map(({ id }) => ({
    params: { id: id.toString() },
  }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({
  params: { id },
}: any) => {
  console.log('[HomePage] getStaticProps()');
  try {
    const product = await getProduct(id);
    return { props: { product } };
  } catch (err: any) {
    if (err.status === 404) return { notFound: true };
    throw err;
  }
};

export default function ProductPage({ product }: ProductPageProps) {
  const user = useUser();

  return (
    <Page title={product.title}>
      <div className='flex flex-col lg:flex-row'>
        <div>
          <Image src={product.pictureUrl} alt='' width={640} height={480} />
        </div>
        <div className='flex-1 mt-2 lg:mt-0 lg:ml-4'>
          <p className='text-sm'>{product.description}</p>
          <p className='text-lg font-bold mt-2'>{product.price}</p>
          {user && <AddToCartWidget productId={product.id} />}
        </div>
      </div>
    </Page>
  );
}
