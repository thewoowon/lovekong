import { authOptions } from './auth/[...nextauth]'
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getSession, useSession } from 'next-auth/react'

const prisma = new PrismaClient()

async function getWishlists(userId: string) {
  try {
    const whshlist = await prisma.wishlists.findUnique({
      where: {
        userId: userId,
      },
    })

    const productsId = whshlist?.productIds.split(',').map((id) => Number(id))
    if (productsId && productsId.length > 0) {
      const products = await prisma.products.findMany({
        where: {
          id: {
            in: productsId ?? [],
          },
        },
      })
      return products
    }

    return []
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
  if (session == null) {
    res.status(401).json({ items: [], message: 'Unauthorized' })
    return
  }
  try {
    const wishlist = await getWishlists(String(session.id))
    res.status(200).json({ items: wishlist ?? [], message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
