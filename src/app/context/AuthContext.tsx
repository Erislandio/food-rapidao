'use client'

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import React, { createContext, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { firebaseConfig } from "@/firebase.config";

interface IAuthContextProvider {
  user: {
    email: string
    photoURL: string
    name: string
    phone: string
  },
  loading: boolean
  error: boolean
}

const AuthContextProvider = createContext<IAuthContextProvider | null>({
  user: {
    email: '',
    photoURL: '',
    name: '',
    phone: ''
  },
  error: false,
  loading: false
})

export const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth)

  if (loading) {
    return <div className="flex h-screen items-center justify-center animate-pulse">
      <Image width={500} height={500} src="/images/logo-removed.png" alt="Menu eats" />
    </div>
  }

  return <AuthContextProvider.Provider value={{
    error: !!error,
    user: {
      email: String(user?.email),
      photoURL: user?.photoURL ?? '',
      name: String(user?.displayName ?? user?.email?.split('@')[0]),
      phone: '',
    },
    loading
  }}>{children}</AuthContextProvider.Provider>
}

export const useAuthContext = () => {
  const context = useContext(AuthContextProvider)

  if (!context) {
    throw new Error('Auth Context')
  }

  return context
}