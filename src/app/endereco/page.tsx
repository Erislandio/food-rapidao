'use client';

import '@/lib/env';
import { useMutation } from '@tanstack/react-query';
import { initializeApp } from 'firebase/app';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { MapPin } from 'lucide-react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Button from '@/components/buttons/Button';

import { useAuthContext } from '@/app/context/AuthContext';
import { firebaseConfig } from '@/firebase.config';

interface ViaCEPAddress {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
  error: any
}

export interface Address {
  label: string
  street: string
  neighborhood: string
  city: string
  state: string
  postalCode: string
  number: string
}

export const AddressForm = () => {

  const { user } = useAuthContext()
  const router = useRouter()
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);

  const [address, setAddress] = useState<Address>({
    city: '',
    label: '',
    neighborhood: '',
    postalCode: "",
    state: '',
    street: '',
    number: ''
  })

  const dbMutation = useMutation({
    mutationFn: async (newAddress: Address) => {
      const data = await setDoc(doc(db, 'address', new Date().getTime().toString()), {
        ...newAddress,
        email: user.email
      });

      return data
    },
    onSuccess() {
      toast.success('Endereço adicionado com sucesso!')
      router.push('/')
    },
    mutationKey: ['address'],
    retry: true,
    retryDelay: 1000,
  })

  const mutation = useMutation({
    networkMode: 'offlineFirst',
    mutationKey: ['postalcode'],
    mutationFn: async (postalCode: string): Promise<ViaCEPAddress> => {
      const data = await fetch(`https://viacep.com.br/ws/${postalCode}/json/`)
      const addressViaCep = await data.json()

      return addressViaCep
    },
    onSuccess(data) {
      if (data.error) {
        return toast.error('CEP do endereço inválido!')
      }

      setAddress({
        ...address,
        city: data.localidade,
        state: data.uf,
        neighborhood: data.bairro,
        street: data.localidade,
      })
    },
    onError() {
      toast.error('Não foi possível buscar o endereço no momento!')
    },
  })

  useEffect(() => {
    if (!user?.email) {
      router.push('/login')
    }
  }, [router, user])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      await dbMutation.mutate(address)
    } catch (error) {
      toast.error('Erro')
    }
  }

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

    if (event.target.name === 'postalCode') {
      if (event.target.value.length === 8) {
        mutation.mutate(event.target.value)
      }
    }

    setAddress({
      ...address,
      [event.target.name]: event.target.value
    })
  }

  return (
    <form className='container p-6' onSubmit={handleSubmit}>
      <h1 className='text-center uppercase'>ADICIONAR ENDEREÇO</h1>
      <section>
        <div className="relative">
          <MapPin className="absolute size-8 top-7 text-gray-400 inset-y-0 start-0 flex items-center ps-3 pointer-events-none" />
          <input value={address.postalCode} onChange={handleChange} type="search" id="default-search" className="pl-10 w-full rounded-lg bg-gray-100 border-none p-4 h-auto mt-4 placeholder:font-thin placeholder:text-sm outline-none focus:border-none" placeholder="CEP" required name="postalCode" disabled={mutation.isPending} />
        </div>
        <input value={address.street} onChange={handleChange} name="street" type="text" id="default-search" className="pl-5 w-full rounded-lg bg-gray-100 border-none p-4 h-auto mt-4 placeholder:font-thin placeholder:text-sm outline-none focus:border-none" placeholder="Endereço" required onFocus={() => {
          window.scrollTo({ top: 10000, behavior: 'smooth' })
        }} />
        <div className='flex items-center gap-2 flex-row'>
          <input value={address.neighborhood} onChange={handleChange} type="text" id="default-search" className="pl-5 w-full rounded-lg bg-gray-100 border-none p-4 h-auto mt-4 placeholder:font-thin placeholder:text-sm outline-none focus:border-none basis-1/1" placeholder="Bairro" required name="neighborhood" onFocus={() => {
            window.scrollTo({ top: 10000, behavior: 'smooth' })
          }} />

          <input value={address.number} onChange={handleChange} type="text" id="default-search" className="pl-5 w-full rounded-lg bg-gray-100 border-none p-4 h-auto mt-4 placeholder:font-thin placeholder:text-sm outline-none focus:border-none basis-1/4" placeholder="123" required name="number" onFocus={() => {
            window.scrollTo({ top: 10000, behavior: 'smooth' })
          }} />
        </div>
        <div className='flex items-center gap-2'>
          <input value={address.city} onChange={handleChange} type="text" id="default-search" className="pl-5 w-full rounded-lg bg-gray-100 border-none p-4 h-auto mt-4 placeholder:font-thin placeholder:text-sm outline-none focus:border-none" placeholder="Cidade" required onFocus={() => {
            window.scrollTo({ top: 10000, behavior: 'smooth' })
          }} name="city" />
          <input value={address.state} onChange={handleChange} type="text" id="default-search" className="pl-5 w-full rounded-lg bg-gray-100 border-none p-4 h-auto mt-4 placeholder:font-thin placeholder:text-sm outline-none focus:border-none" placeholder="Estado" required onFocus={() => {
            window.scrollTo({ top: 10000, behavior: 'smooth' })
          }} name="state" />
        </div>
      </section>
      <input value={address.label} onChange={handleChange} type="text" id="default-search" className="pl-5 w-full rounded-lg bg-gray-100 border-none p-4 h-auto mt-4 placeholder:font-thin placeholder:text-sm outline-none focus:border-none" placeholder="Identificação ex: Residencia..." required name="label" onFocus={() => {
        window.scrollTo({ top: 10000, behavior: 'smooth' })
      }} />
      <Button isLoading={dbMutation.isPending} type="submit" className="text-white bg-orange-500 h-auto focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex justify-center border-none hover:bg-orange-600 p-4 mt-6">CRIAR</Button>
    </form>
  )
}

export default function AddressFormPage() {

  return (
    <main>
      <Head>
        <title>Menu Eats - Endereço</title>
      </Head>
      <section className='bg-white'>
        <ToastContainer />
        <Image width={500} height={500} src="/images/logo.png" alt="Menu eats app" />
        <AddressForm />
      </section>
    </main>
  );
}
