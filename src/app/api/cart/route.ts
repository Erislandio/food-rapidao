import { doc, getDoc, setDoc } from 'firebase/firestore';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { CART_ID_COOKIE } from '@/app/constants';
import { ICartContext } from '@/app/context/CartContext';
import { db } from '@/services/fisebase';

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
