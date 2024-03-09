'use client';

import Head from 'next/head';
import '@/lib/env';

import { Banner } from '@/components/Banner';
import { Categories } from '@/components/Categories';
import { Grettings } from '@/components/Grettings';
import Header from '@/components/Header';
import { Shelf } from '@/components/Shelf';
import { TipBar } from '@/components/TipBar';

export default function HomePage() {
  return (
    <main>
      <Head>
        <title>The Dogs Lanchonete</title>
      </Head>
      <section className='bg-white container p-6'>
        <Header />
        <Grettings />
        <Banner />
        <TipBar />
        <Categories />
        <Shelf />
      </section>
    </main>
  );
}
