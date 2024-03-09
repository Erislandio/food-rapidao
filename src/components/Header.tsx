'use client'

import { ChevronRight, Menu, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

import Button from "@/components/buttons/Button";
import { ConditionalChildren } from "@/components/ConditionalChildren";

import { useAuthContext } from "@/app/context/AuthContext";
import { useStoreActions } from "@/app/context/StoreActionsContext";
import { useUserContext } from "@/app/context/UserContext";

export default function Header() {

  const { toggleSideBar } = useStoreActions()
  const router = useRouter()
  const { selectedAddress } = useUserContext()
  const { user } = useAuthContext()

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-start">
        <ConditionalChildren conditional={!!user.email}>
          <Button onClick={toggleSideBar} className="rounded-full bg-gray-200 border-none w-11 h-11 hover:bg-gray-300">
            <Menu className="text-black" />
          </Button>
        </ConditionalChildren>
        <ConditionalChildren conditional={!user.email}>
          <Button onClick={() => router.push('/login')} className="rounded-full bg-gray-200 border-none w-11 h-11 hover:bg-gray-300">
            <Menu className="text-black" />
          </Button>
        </ConditionalChildren>
        <div className="ml-4 flex flex-col">
          <span className="text-orange-500 font-bold text-sm uppercase">
            ENTREGAR EM
          </span>
          <button onClick={() => {
            if (user.email) {
              router.push('/enderecos')
            } else {
              router.push('/login')
            }
          }} className="font-thin flex items-center body p-0 bg-transparent border-none shadow-none">
            {selectedAddress ? `${selectedAddress.street}, ${selectedAddress.number}...` : 'Adicionar endereço'}
            <ChevronRight className="rotate-90 w-4 ml-2" />
          </button>
        </div>
      </div>
      <Button onClick={() => router.push('/cart')} className="bg-neutral-900 rounded-full size-11 relative">
        <span className="size-5 absolute -top-2 bg-orange-500 block rounded-full right-0">0</span>
        <ShoppingBag />
      </Button>
    </header>
  )
}
