'use client'

import { useQuery } from "@tanstack/react-query"
import { createContext } from "react"

export interface Item {
  id: string
  name: string
  price: number
}

export interface ICartContext {
  id: string
  items: Item[]
}

const CartContextProvider = createContext<ICartContext & { isLoading: boolean }>({
  id: '',
  items: [],
  isLoading: false
})

export const CartContext = ({ children }: { children: React.ReactNode }) => {
  const { data: cart, isLoading } = useQuery<ICartContext>({
    queryKey: ['cart'],
    retryOnMount: true,
    queryFn: async () => {
      const data = await fetch('/api/cart')
      const response = await data.json()

      return response as ICartContext
    },
    retry: 3,
    retryDelay: 500,
  })

  return (
    <CartContextProvider.Provider value={{
      ...cart as ICartContext,
      isLoading,
    }}>{children}</CartContextProvider.Provider>
  )
}
