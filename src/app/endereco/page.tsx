'use client';

import { ChevronLeft } from 'lucide-react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import '@/lib/env';

import { AddressForm } from '@/components/AddressForm';
import Button from '@/components/buttons/Button';



export default function AddressFormPage() {

  const router = useRouter()

  return (
    <main>
      <Head>
        <title>Menu Eats - Endereço</title>
      </Head>
      <section className='bg-white'>
        <ToastContainer />
        <div className='relative'>
          <Button onClick={() => router.back()} className="bg-gray-300 border-none rounded-full size-10 absolute left-4 top-4">
            <ChevronLeft className="text-black size-6" />
          </Button>
          <Image width={500} height={500} src="/images/logo.png" alt="Menu eats app" className='h-[300px] object-cover' />
        </div>
        <AddressForm />
      </section>
    </main>
  );
}
