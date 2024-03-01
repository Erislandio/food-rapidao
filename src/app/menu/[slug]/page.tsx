'use client';

import '@/lib/env';
import Head from 'next/head';

import { Banner } from '@/app/components/Banner';
import { Categories } from '@/app/components/Categories';
import { Grettings } from '@/app/components/Grettings';
import Header from '@/app/components/Header';
import { Shelf } from '@/app/components/Shelf';
import { TipBar } from '@/app/components/TipBar';

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
