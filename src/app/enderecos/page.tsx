'use client'

import { Briefcase, ChevronLeft, FilePen, Home, Trash2 } from "lucide-react";
import Head from "next/head";

import Button from "@/components/buttons/Button";
import { ConditionalChildren } from "@/components/ConditionalChildren";
import { useUserContext } from "../context/UserContext";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import IconButton from "@/components/buttons/IconButton";
import { getAddresses, removeDocumentById } from "@/network/dataManager";

export default function AddressList() {

  const router = useRouter()
  const [remove, setRemove] = useState('')
  const { addresses, selectedAddress, refetch, setSelectedAddress } = useUserContext()
  const { user } = useUserContext()

  useEffect(() => {
    if (!user?.email) {
      router.push('/login')
    }
  }, [user, router])

  return (
    <main>
      <Head>
        <title>Menu Eats - Lista de Endereços</title>
      </Head>
      <section className='bg-white pt-4 pl-4 pr-4 pb-4'>
        <div className="flex items-center">
          <Button onClick={() => router.back()} className="bg-gray-300 border-none rounded-full size-10">
            <ChevronLeft className="text-black size-6" />
          </Button>
          <span className="block capitalize ml-4">Meus Endereços</span>
        </div>
        <section>
          <ul>
            {addresses?.map((address, index) => {
              return (
                <li onClick={() => setSelectedAddress(address)} key={`${address.postalCode}--${index}`} className={`border border-solid w-full bg-gray-100 p-4 pb-6 pt-6 rounded-2xl mt-4 flex items-center flex-row ${selectedAddress?.id === address.id ? 'border-orange-500' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-center flex-row bg-white rounded-full size-10">
                    <ConditionalChildren conditional={address.label === 'Residencia'}>
                      <Home className="text-blue-200" />
                    </ConditionalChildren>
                    <ConditionalChildren conditional={address.label !== 'Residencia'}>
                      <Briefcase className="text-purple-300" />
                    </ConditionalChildren>
                  </div>
                  <div className="ml-4 w-full">
                    <h4 className="flex items-center justify-between mb-3">{address.label}
                      <div className="gap-1 flex">
                        <IconButton className="bg-white border-none p-0 text-orange-500" onClick={() => router.push(`/endereco/${address.id}`)} icon={FilePen} />
                        <IconButton className="bg-white border-none p-0 text-red-500" onClick={() => setRemove(address.id)} icon={Trash2} />
                      </div>
                    </h4>
                    <span className="font-thin text-gray-400">
                      {address.street}, {address.number} - {address.city}/{address.state}
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      </section>
      <footer className="p-4 w-full">
        <Button onClick={() => router.push('/endereco')} className='w-full text-center flex justify-center p-4 bg-orange-500 text-white uppercase border-none'>
          Adicionar Novo
        </Button>
      </footer>

      {
        remove ? (
          <div id="deleteModal" tabIndex={-1} aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
              <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <button type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                <p className="mb-4 text-gray-500 dark:text-gray-300">Quer realmente remover esse endereço?</p>
                <div className="flex justify-center items-center space-x-4">
                  <button onClick={() => setRemove('')} data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                    Cancelar
                  </button>
                  <button onClick={() => {
                    removeDocumentById(remove)
                    refetch()
                    setRemove('')
                  }} type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                    Remover
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null
      }
    </main>
  );
}