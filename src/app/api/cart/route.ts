import { NextResponse } from 'next/server';
import { ICartContext } from '@/app/context/CartContext';
import { cookies } from 'next/headers';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/services/fisebase';
import { CART_ID_COOKIE } from '@/app/constants';

async function getCart(id: string) {
  const cartQuery = doc(db, 'cart', id)
  const querySnapshot = await getDoc(cartQuery)

  if (querySnapshot.exists()) {
    return querySnapshot.data() as ICartContext
  }

  return null
}

export async function GET() {

  const cookieStore = cookies()
  const cartId = cookieStore.get(CART_ID_COOKIE)

  if (!cartId?.value) {
    const cartId = new Date().getTime().toString()

    cookieStore.set('cartId', cartId)

    await setDoc(doc(db, 'cart', cartId), {
      id: cartId,
      items: []
    });

    return NextResponse.json({ id: cartId, items: [] })
  }

  const cart = await getCart(cartId.value)

  if (!cart) {
    const cartId = new Date().getTime().toString()

    cookieStore.set('cartId', cartId)
    await setDoc(doc(db, 'cart', cartId), {
      id: cartId,
      items: []
    });

    return NextResponse.json({ id: cartId, items: [] })
  }

  return NextResponse.json(cart)
}
