'use client'

import { useQuery } from "@tanstack/react-query"
import { initializeApp } from "firebase/app"
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore"
import React, { createContext, useContext } from "react"

import { useAuthContext } from "@/app/context/AuthContext"
import { Address } from "@/app/endereco/page"
import { firebaseConfig } from "@/firebase.config"

interface User {
  user: {
    email: string,
    phone: string,
  },
  isLoading: boolean
  address?: Address[],
  defaultAddress?: Address
}

const UserContextProvider = createContext<User>({
  user: {
    email: '',
    phone: ''
  },
  isLoading: false,
  address: [],
  defaultAddress: undefined
})

async function getAddresses(email: string): Promise<Array<Address>> {
  const app = initializeApp(firebaseConfig)

  const db = getFirestore(app);
  const addressCollection = collection(db, "address")
  const q = query(addressCollection, where("email", "==", email));

  const addressess = await getDocs(q);

  const data: Address[] = []

  addressess.forEach(item => {
    if (item.exists()) {
      data.push(item.data() as Address)
    }
  })

  return data
}

export default function UserContext({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext()
  const { data, isLoading } = useQuery<Array<Address>>({
    queryKey: ['addresses'],
    queryFn: () => getAddresses(user?.email)
  })


  return <UserContextProvider.Provider value={{
    user: {
      email: user?.email,
      phone: user?.phone,
    },
    isLoading,
    address: data,
    defaultAddress: data?.reverse()?.pop()
  }}>{children}</UserContextProvider.Provider>
}

export const useUserContext = () => {
  const context = useContext(UserContextProvider)
  if (!context) {
    throw new Error('useUserContext')
  }

  return context
}