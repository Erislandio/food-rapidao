'use client'

import { useQuery } from "@tanstack/react-query"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import React, { createContext, Dispatch, useContext, useEffect, useState } from "react"

import { useAuthContext } from "@/app/context/AuthContext"
import { Address } from "@/app/endereco/page"
import { db } from "@/services/fisebase"
import { getAddresses, getUserAccount } from "@/network/dataManager"

interface User {
  user: {
    email: string,
    phone: string,
    picture: string
    name: string
  },
  addresses: Address[],
  refetch: () => void
  selectedAddress?: Address
  setSelectedAddress: Dispatch<Address>
}

const UserContextProvider = createContext<User>({
  user: {
    email: '',
    phone: '',
    picture: '',
    name: ''
  },
  refetch: () => null,
  addresses: [],
  selectedAddress: undefined,
  setSelectedAddress: () => null
})

export default function UserContext({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext()
  const [selectedAddress, setSelectedAddress] = useState<Address | undefined>()
  const { refetch, data: addresses } = useQuery<Address[]>({
    queryKey: ['addresses'],
    refetchOnMount: false,
    queryFn: async () => getAddresses(user.email)
  })

  useEffect(() => {
    if (addresses?.length) {
      const [defaultSelected] = addresses
      setSelectedAddress(defaultSelected)
    } else {
      setSelectedAddress(undefined)
    }
  }, [addresses])

  const { data: userAccount } = useQuery({
    queryKey: ['userAccount', user.email],
    queryFn: async () => {
      const response = await getUserAccount(user.email)
      return response
    },
    enabled: !!user.email,
    retryOnMount: true,
  })

  return <UserContextProvider.Provider value={{
    user: {
      email: user?.email,
      picture: user?.photoURL,
      phone: userAccount ? userAccount?.phone : user?.phone,
      name: userAccount ? userAccount?.name : user?.name,
    },
    refetch,
    addresses: addresses ?? [],
    selectedAddress,
    setSelectedAddress
  }}>{children}</UserContextProvider.Provider>
}

export const useUserContext = () => {
  const context = useContext(UserContextProvider)
  if (!context) {
    throw new Error('useUserContext')
  }

  return context
}
