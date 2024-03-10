/* eslint-disable @next/next/no-img-element */
'use client'

import { ChevronLeft, ChevronRight, HelpCircle, LayoutList, LogOut, Map, Settings, ShoppingBag, User } from "lucide-react"
import { useRouter } from "next/navigation"

import Button from "@/components/buttons/Button"
import { ConditionalChildren } from "@/components/ConditionalChildren"

import { useStoreActions } from "@/app/context/StoreActionsContext"
import { useUserContext } from "@/app/context/UserContext"
import { auth } from "@/services/fisebase"
import { toast } from "react-toastify"

export const SideBar = () => {

  const { openSideBar, toggleSideBar } = useStoreActions()

  const { user } = useUserContext()
  const router = useRouter()

  return <section onClick={toggleSideBar} className={`fixed top-0 w-full h-full bg-black z-40 bg-opacity-65 ${openSideBar ? 'left-0' : '-left-full'}`}>
    <aside className={`overflow-scroll transition-all fixed top-0 p-6 w-80 max-w-80 bg-white shadow-xl h-full z-50 ${openSideBar ? 'left-0' : '-left-80'}`}>
      <div className="flex items-center">
        <Button className="bg-gray-300 border-none rounded-full size-10">
          <ChevronLeft className="text-black size-6" />
        </Button>
        <span className="block capitalize ml-4">Voltar</span>
      </div>
      <div className="mt-8 mb-8 flex items-center">
        <ConditionalChildren conditional={Boolean(user.picture)}>
          <img src={user.picture} alt={user.email} className="rounded-full" />
        </ConditionalChildren>
        <ConditionalChildren conditional={Boolean(user.picture) === false}>
          <span className="size-20 rounded-full bg-gray-100 flex items-center justify-center text-4xl uppercase">
            {user.email.substring(0, 1)}
          </span>
        </ConditionalChildren>
        <h2 className="ml-5">{user.name}</h2>
      </div>
      <Button className="bg-gray-100 border-none rounded-xl flex items-center justify-between w-full p-2 rounded-b-none">
        <div className="flex items-center">
          <span className="size-10 bg-white rounded-full flex items-center justify-center">
            <User className="text-orange-500 size-4" /></span>
          <span className="block ml-4 text-black">Informações pessoais</span>
        </div>
        <ChevronRight className="text-gray-600 size-4" />
      </Button>
      <Button onClick={() => router.push('/enderecos')} className="bg-gray-100 border-none rounded-xl flex items-center justify-between w-full p-2 rounded-t-none">
        <div className="flex items-center">
          <span className="size-10 bg-white rounded-full flex items-center justify-center">
            <Map className="text-blue-500 size-4" />
          </span>
          <span className="block ml-4 text-black">Endereços</span>
        </div>
        <ChevronRight className="text-gray-600 size-4" />
      </Button>
      <Button className="bg-gray-100 border-none rounded-xl flex items-center justify-between w-full p-2 rounded-b-none mt-4">
        <div className="flex items-center">
          <span className="size-10 bg-white rounded-full flex items-center justify-center">
            <ShoppingBag className="text-blue-300 size-4" /></span>
          <span className="block ml-4 text-black">Carrinho</span>
        </div>
        <ChevronRight className="text-gray-600 size-4" />
      </Button>
      <Button className="bg-gray-100 border-none rounded-xl flex items-center justify-between w-full p-2 rounded-t-none">
        <div className="flex items-center">
          <span className="size-10 bg-white rounded-full flex items-center justify-center">
            <ShoppingBag className="text-purple-500 size-4" />
          </span>
          <span className="block ml-4 text-black">Favoritos</span>
        </div>
        <ChevronRight className="text-gray-600 size-4" />
      </Button>

      <Button className="bg-gray-100 border-none rounded-xl flex items-center justify-between w-full p-2 rounded-b-none mt-4">
        <div className="flex items-center">
          <span className="size-10 bg-white rounded-full flex items-center justify-center">
            <LayoutList className="text-blue-300 size-4" /></span>
          <span className="block ml-4 text-black">Pedidos</span>
        </div>
        <ChevronRight className="text-gray-600 size-4" />
      </Button>
      <Button className="bg-gray-100 border-none rounded-xl flex items-center justify-between w-full p-2 rounded-t-none">
        <div className="flex items-center">
          <span className="size-10 bg-white rounded-full flex items-center justify-center">
            <HelpCircle className="text-orange-300 size-4" />
          </span>
          <span className="block ml-4 text-black">FAQ</span>
        </div>
        <ChevronRight className="text-gray-600 size-4" />
      </Button>
      <Button className="bg-gray-100 border-none rounded-xl flex items-center justify-between w-full p-2 rounded-t-none">
        <div className="flex items-center">
          <span className="size-10 bg-white rounded-full flex items-center justify-center">
            <Settings className="text-blue-800 size-4" />
          </span>
          <span className="block ml-4 text-black">Configurações</span>
        </div>
        <ChevronRight className="text-gray-600 size-4" />
      </Button>

      <Button onClick={() => {
        try {
          auth.signOut()
          toggleSideBar()
          router.push('/')
          toast.success('Logout feito com sucesso!')
        } catch {
          toast.success('Não foi possível fazer o logout no momento!')
        }
      }} className="bg-gray-100 border-none rounded-xl mt-4 flex items-center justify-between w-full p-2">
        <div className="flex items-center">
          <span className="size-10 bg-white rounded-full flex items-center justify-center"><LogOut className="text-red-500 size-4" /></span>
          <span className="block ml-4 text-black">Sair</span>
        </div>
        <ChevronRight className="text-gray-600 size-4" />
      </Button>
    </aside>
  </section>
}
