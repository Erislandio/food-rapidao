'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import { useUserContext } from "../context/UserContext"
import { ToastContainer, toast } from 'react-toastify';
import Button from "@/components/buttons/Button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { addDocument, DBS, getAddresses } from "@/network/dataManager";

interface User {
  name: string
  email: string
  phone: string
}

export default function Profle() {

  const [user, setUser] = useState<User>({
    email: '',
    name: '',
    phone: ''
  })

  const { user: currentUser } = useUserContext()
  const router = useRouter()

  useEffect(() => {
    setUser((lastState) => ({
      ...lastState,
      email: currentUser.email,
      name: currentUser.name,
      phone: currentUser.phone
    }))
  }, [currentUser])

  const mutation = useMutation({
    mutationKey: ['new-user'],
    mutationFn: async (newUser: User) => await addDocument({
      dbName: DBS.users,
      id: user.email,
      payload: newUser
    }),
    onSuccess: async () => {
      const addresses = await getAddresses(user.email)

      if (!addresses.length) {
        router.push('/endereco')
      } else {
        router.push('/')
      }
    },
    onError() {
      toast.error('Não foi possível criar uma conta no momento!')
    },
  })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    mutation.mutate(user)
  }

  return (
    <main className='pb-6'>
      <ToastContainer />
      <Image width={500} height={500} src="/images/logo.png" alt="Menu eats app" className='max-h-[300px] object-cover' />
      <form onSubmit={handleSubmit} className="p-6 mx-auto relative -top-12 bg-white rounded-t-3xl">
        <h1 className='text-center uppercase'>Criar conta</h1>
        <div className="mb-5 mt-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">E-mail</label>
          <input onChange={(event) => setUser(newUser => ({
            ...newUser,
            email: event.target.value
          }))} value={user.email} disabled required type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-4" placeholder="E-email" />
        </div>
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nome</label>
          <input onChange={(event) => setUser(newUser => ({
            ...newUser,
            name: event.target.value
          }))} required onFocus={() => {
            window.scrollTo({ top: 10000, behavior: 'smooth' })
          }} value={user.name} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-4" placeholder='Nome' />
        </div>
        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Telefone</label>
          <input onChange={(event) => setUser(newUser => ({
            ...newUser,
            phone: event.target.value
          }))} required onFocus={() => {
            window.scrollTo({ top: 10000, behavior: 'smooth' })
          }} value={user.phone} type="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-4" placeholder='Telefone' />
        </div>
        <Button isLoading={mutation.isPending} type="submit" className="text-white bg-orange-500 h-auto focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex justify-center border-none hover:bg-orange-600 p-4">CRIAR</Button>
      </form>
    </main >
  )
}
