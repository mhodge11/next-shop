import { ReactNode } from 'react';
import Head from 'next/head';
import NavBar from '@/components/NavBar';
import Title from '@/components/Title';

interface PageProps {
  title: string;
  children: ReactNode;
}

export default function Page({ title, children }: PageProps) {
  return (
    <>
      <Head>
        <title>{title} - Next Shop</title>
      </Head>
      <header>
        <NavBar />
      </header>
      <main className='px-6 py-4'>
        <Title>{title}</Title>
        {children}
      </main>
    </>
  );
}
