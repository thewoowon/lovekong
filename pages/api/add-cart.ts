import { authOptions } from './auth/[...nextauth]'
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Carts, PrismaClient } from '@prisma/client'
import { getSession, useSession } from 'next-auth/react'

const prisma = new PrismaClient()

async function addCart(userId: string, item: Omit<Carts, 'id' | 'userId'>) {
  try {
    const cart = await prisma.carts.create({
      data: {
        userId: userId,
        productId: item.productId,
        quantity: item.quantity,
        amount: item.amount,
      },
    })
    return cart
  } catch (error) {
    console.error(error)
  }
}

type Data = {
  items?: any
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const session = await getSession({ req });
  const session = await getSession({ req })
  const { item } = JSON.parse(req.body)
  if (session == null) {
    res.status(401).json({ items: [], message: 'Unauthorized' })
    return
  }
  try {
    const wishlist = await addCart(String(session.id), item)
    res.status(200).json({ items: wishlist, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
