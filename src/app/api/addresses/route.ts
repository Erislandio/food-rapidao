import { db } from '@/services/fisebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';

export async function getAddresses(email: string) {
  const addressesQuery = query(collection(db, 'addresses'), where('email', '==', email))
  const querySnapshot = await getDocs(addressesQuery)

  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

export async function GET(req: NextRequest) {
  const query = new URLSearchParams(req.nextUrl.searchParams)

  if (!query.get('email')) {
    return NextResponse.json({
      message: 'email is required',
    }, {
      status: 400
    });
  }

  const addresses = await getAddresses(String(query.get('email')))

  return NextResponse.json(addresses)
}
