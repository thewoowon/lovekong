import { authOptions, CustomDefaultSession } from './auth/[...nextauth]'
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getSession, useSession } from 'next-auth/react'

const prisma = new PrismaClient()

async function getWishlist(userId: string) {
  try {
    const response = await prisma.wishlists.findUnique({
      where: {
        userId: userId,
      },
    })
    prisma.$disconnect() // disconnect from database
    return response?.productIds.split(',')
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
  const session = (await getSession({ req })) as CustomDefaultSession
  if (session == null) {
    res.status(401).json({ items: [], message: 'Unauthorized' })
    return
  }
  try {
    const wishlist = await getWishlist(String(session.id))
    res.status(200).json({ items: wishlist ?? [], message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
