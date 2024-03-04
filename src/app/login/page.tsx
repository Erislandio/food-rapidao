"use client";

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SignGoogleButton from 'react-google-button';
import { toast, ToastContainer } from 'react-toastify';

import Button from '@/components/buttons/Button';

import { firebaseConfig } from '@/firebase.config';



export default function Login() {

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app);
  const [isLoading, setloading] = useState(false)
  const router = useRouter()

  const googleProvider = new GoogleAuthProvider();
  const db = getFirestore(app);

  googleProvider.setCustomParameters({
    prompt: 'select_account'
  })

  const [user, setUser] = useState({
    email: '',
    pass: ''
  })

  const handleSubmit = async (event: React.FormEvent) => {
    setloading(true)
    event.stopPropagation()
    event.preventDefault()
    try {
      const firebaseUser = await signInWithEmailAndPassword(auth, user.email, user.pass)
      checkAddresses(String(firebaseUser.user.email))
      toast.success('Sucesso!')

    } catch (error) {
      toast.error('Usuário inválido!')
    } finally {
      setloading(false)
    }
  }

  async function checkAddresses(email: string) {

    const addressCollection = collection(db, "address")
    const q = query(addressCollection, where("email", "==", email));

    const addressess = await getDocs(q);

    if (addressess.size) {
      router.push('/')
    } else {
      router.push('/endereco')
    }
  }

  const handleSignWithGoogle = async () => {
    try {
      const googleUser = await signInWithPopup(auth, googleProvider);
      checkAddresses(String(googleUser.user.email))
    } catch (error) {
      toast.error('Usuário inválido!')
    }
  }

  return (
    <main>
      <ToastContainer />
      <Image width={500} height={500} src="/images/logo.png" alt="Menu eats app" />
      <form onSubmit={handleSubmit} className="p-6 mx-auto relative -top-12 bg-white rounded-t-3xl">
        <h1 className='text-center uppercase'>Login</h1>
        <div className="mb-5 mt-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">E-mail</label>
          <input onChange={(event) => setUser(newUser => ({
            ...newUser,
            email: event.target.value
          }))} required type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-4" placeholder="E-email" />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Senha</label>
          <input onChange={(event) => setUser(newUser => ({
            ...newUser,
            pass: event.target.value
          }))} required onFocus={() => {
            window.scrollTo({ top: 10000, behavior: 'smooth' })
          }} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-4" placeholder='Senha' />
        </div>
        <Button isLoading={isLoading} type="submit" className="text-white bg-orange-500 h-auto focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex justify-center border-none hover:bg-orange-600 p-4">ENTRAR</Button>
      </form>

      <footer className='flex justify-center'>
        <SignGoogleButton onClick={() => handleSignWithGoogle()} label='Entrar com o google' />
      </footer>
    </main >
  )
}