import { collection, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";

import { ICartContext } from "@/app/context/CartContext";
import { db } from "@/services/fisebase";
import { Address } from "@/addresses";

export const DBS = {
  address: 'addresses',
  users: 'users',
  cart: 'cart'
}

export interface UserFireBaseSimple {
  name: string
  email: string
  phone: string
}

export async function getAddresses(email: string): Promise<Address[]> {
  const addressesQuery = query(collection(db, DBS.address), where('email', '==', email))
  const querySnapshot = await getDocs(addressesQuery)

  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Address[]
}

export async function getUserAccount(email: string): Promise<UserFireBaseSimple | null> {
  const userAccountQuery = doc(db, DBS.users, email)
  const querySnapshot = await getDoc(userAccountQuery)

  if (querySnapshot.exists()) {
    return querySnapshot.data() as UserFireBaseSimple
  }

  return null
}

export async function getDocById<T>(docId: string, dbName: string): Promise<T | null> {
  const docQuery = doc(db, dbName, docId)

  const querySnapshot = await getDoc(docQuery)

  if (querySnapshot.exists()) {
    return querySnapshot.data() as T
  }

  return null
}

export async function getCart(id: string): Promise<ICartContext | null> {
  const cartQuery = doc(db, DBS.cart, id)
  const querySnapshot = await getDoc(cartQuery)

  if (querySnapshot.exists()) {
    return querySnapshot.data() as ICartContext
  }

  return null
}

export async function removeDocumentById(id: string) {
  await deleteDoc(doc(db, DBS.address, id));
}

export async function addDocument({
  dbName, id, payload
}: { dbName: string, id: string, payload: unknown }) {
  const data = await setDoc(doc(db, dbName, id), payload);

  return data
}
