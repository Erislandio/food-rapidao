'use client';

import '@/lib/env';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { doc, setDoc } from 'firebase/firestore';
import { ChevronLeft, MapPin } from 'lucide-react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import Button from '@/components/buttons/Button';

import { useAuthContext } from '@/app/context/AuthContext';
import { db } from '@/services/fisebase';
import { DBS, getAddresses, getDocById } from '@/network/dataManager';
import { useUserContext } from '../context/UserContext';

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
  id: string
}

interface AddressFormProps {
  addressId?: string
}

export const AddressForm = ({ addressId }: AddressFormProps) => {

  const { user } = useAuthContext()
  const router = useRouter()
  const { refetch } = useUserContext()
  const { data: firebaseAddress } = useQuery({
    queryKey: ['edit-address'],
    enabled: !!addressId,
    queryFn: () => getDocById<Address>(String(addressId), DBS.address)
  })

  const [address, setAddress] = useState<Address>({
    city: '',
    label: 'Residencia',
    neighborhood: '',
    postalCode: "",
    state: '',
    street: '',
    number: '',
    id: ''
  })

  useEffect(() => {
    if (firebaseAddress) {
      setAddress(firebaseAddress)
    }
  }, [firebaseAddress])

  const dbMutation = useMutation({
    mutationFn: async ({ editAddressId, newAddress }: { newAddress: Address, editAddressId?: string }) => {
      const id = editAddressId ? editAddressId : new Date().getTime().toString()
      const data = await setDoc(doc(db, DBS.address, id), {
        ...newAddress,
        id,
        email: user.email
      });

      return data
    },
    onSuccess: async () => {
      toast.success(`Endereço ${addressId ? 'editado' : 'adicionado'} com sucesso!`)
      refetch()
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
      dbMutation.mutate({
        newAddress: address,
        editAddressId: addressId
      })
    } catch (error) {
      toast.error('Erro')
    }
  }

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

    if (event.target.name === 'postalCode') {
      if (event.target.value.replace(/\D/g, '').length === 8) {
        mutation.mutate(event.target.value.replace(/\D/g, ''))
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
          <input autoFocus onFocus={() => {
            window.scrollTo({ top: 1000, behavior: 'smooth' })
          }} value={address.postalCode} onChange={handleChange} type="search" id="default-search" className="pl-10 w-full rounded-lg bg-gray-100 border-none p-4 h-auto mt-4 placeholder:font-thin placeholder:text-sm outline-none focus:border-none" placeholder="CEP" required name="postalCode" disabled={mutation.isPending} />
        </div>
        <input value={address.street} onChange={handleChange} name="street" type="text" className="pl-5 w-full rounded-lg bg-gray-100 border-none p-4 h-auto mt-4 placeholder:font-thin placeholder:text-sm outline-none focus:border-none" placeholder="Endereço" required onFocus={() => {
          window.scrollTo({ top: 10000, behavior: 'smooth' })
        }} />
        <div className='flex items-center gap-2 flex-row'>
          <input value={address.neighborhood} onChange={handleChange} type="text" className="pl-5 w-full rounded-lg bg-gray-100 border-none p-4 h-auto mt-4 placeholder:font-thin placeholder:text-sm outline-none focus:border-none basis-1/1" placeholder="Bairro" required name="neighborhood" onFocus={() => {
            window.scrollTo({ top: 10000, behavior: 'smooth' })
          }} />

          <input value={address.number} onChange={handleChange} type="text" className="pl-5 w-full rounded-lg bg-gray-100 border-none p-4 h-auto mt-4 placeholder:font-thin placeholder:text-sm outline-none focus:border-none basis-1/4" placeholder="123" required name="number" onFocus={() => {
            window.scrollTo({ top: 10000, behavior: 'smooth' })
          }} />
        </div>
        <div className='flex items-center gap-2'>
          <input value={address.city} onChange={handleChange} type="text" className="pl-5 w-full rounded-lg bg-gray-100 border-none p-4 h-auto mt-4 placeholder:font-thin placeholder:text-sm outline-none focus:border-none" placeholder="Cidade" required onFocus={() => {
            window.scrollTo({ top: 10000, behavior: 'smooth' })
          }} name="city" />
          <input value={address.state} onChange={handleChange} type="text" className="pl-5 w-full rounded-lg bg-gray-100 border-none p-4 h-auto mt-4 placeholder:font-thin placeholder:text-sm outline-none focus:border-none" placeholder="Estado" required onFocus={() => {
            window.scrollTo({ top: 10000, behavior: 'smooth' })
          }} name="state" />
        </div>
      </section>
      <select className='l-5 w-full rounded-lg bg-gray-100 border-none p-4 h-auto mt-4 placeholder:font-thin placeholder:text-sm outline-none focus:border-none' onChange={(event) => setAddress({ ...address, label: event.target.value })}>
        <option selected={address.label === 'Residencia'} defaultChecked={address.label === 'Residencia'} value="Residencia">Residencia</option>
        <option selected={address.label !== 'Residencia'} defaultChecked={address.label !== 'Residencia'} value="Trabalho">Trabalho</option>
      </select>
      <Button isLoading={dbMutation.isPending} type="submit" className="text-white bg-orange-500 h-auto focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex justify-center border-none hover:bg-orange-600 p-4 mt-6">{addressId ? 'EDITAR' : 'CRIAR'}</Button>
    </form>
  )
}

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
