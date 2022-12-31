import { authOptions, CustomDefaultSession } from './auth/[...nextauth]'
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getSession, useSession } from 'next-auth/react'

const prisma = new PrismaClient()

async function updateWishlist(userId: string, productId: string) {
  try {
    const wishlist = await prisma.wishlists.findUnique({
      where: {
        userId: userId,
      },
    })

    const originWishlist =
      wishlist?.productIds != null && wishlist.productIds != ''
        ? wishlist.productIds.split(',')
        : []

    const isWishlisted = originWishlist.includes(productId)

    const newWishlist = isWishlisted
      ? originWishlist.filter((item) => item != productId)
      : [...originWishlist, productId]

    const response = await prisma.wishlists.upsert({
      where: {
        userId: userId,
      },
      update: {
        productIds: newWishlist.join(','),
      },
      create: {
        userId: userId,
        productIds: newWishlist.join(','),
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
  const { productId } = JSON.parse(req.body)
  if (session == null) {
    res.status(401).json({ items: [], message: 'Unauthorized' })
    return
  }
  try {
    const wishlist = await updateWishlist(String(session.id), String(productId))
    res.status(200).json({ items: wishlist, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
