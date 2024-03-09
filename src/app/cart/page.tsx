'use client';

import '@/lib/env';
import { useMutation } from '@tanstack/react-query';
import { doc, setDoc } from 'firebase/firestore';
import { ChevronLeft, MapPin } from 'lucide-react';
import Head from 'next/head';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import Button from '@/components/buttons/Button';

import { useAuthContext } from '@/app/context/AuthContext';
import { DBS } from '@/network/dataManager';

export default function AddressFormPage() {

  const router = useRouter()

  return (
    <main>
      <Head>
        <title>Menu Eats - Carrinho de compras</title>
      </Head>
      <section className='bg-white'>
        <h1>meu carrinho </h1>
      </section>
    </main>
  );
}
