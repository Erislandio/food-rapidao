'use client';

import '@/lib/env';
import Head from 'next/head';

import { AllCategories } from '@/app/components/AllCategories';
import { Grettings } from '@/app/components/Grettings';
import Header from '@/app/components/Header';
import { OpenedAtMoment } from '@/app/components/OpenedAtMoment';
import { SearchBar } from '@/app/components/SearchBar';
import { useAuthContext } from '@/app/context/AuthContext';


export default function HomePage() {

  const { user } = useAuthContext()
  console.log(user)

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
