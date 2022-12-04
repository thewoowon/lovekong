import { authOptions } from './auth/[...nextauth]'
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Cart, PrismaClient } from '@prisma/client'
import { getSession, useSession } from 'next-auth/react'

const prisma = new PrismaClient()

async function updateCart(item: Cart) {
  try {
    const cart = await prisma.cart.update({
      where: {
        id: item.id,
      },
      data: {
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
  if (session == null || session.id != item.userId) {
    res.status(401).json({ items: [], message: 'Unauthorized' })
    return
  }
  try {
    const wishlist = await updateCart(item)
    res.status(200).json({ items: wishlist, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
