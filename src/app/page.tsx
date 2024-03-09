'use client';

import Head from 'next/head';
import '@/lib/env';

import { AllCategories } from '@/components/AllCategories';
import { Grettings } from '@/components/Grettings';
import Header from '@/components/Header';
import { OpenedAtMoment } from '@/components/OpenedAtMoment';
import { SearchBar } from '@/components/SearchBar';


export default function HomePage() {
  return (
    <main>
      <Head>
        <title>Menu Eats</title>
      </Head>
      <section className='bg-white container p-6'>
        <Header />
        <Grettings />
        <SearchBar />
        <AllCategories />
        <OpenedAtMoment />
      </section>
    </main>
  );
}
