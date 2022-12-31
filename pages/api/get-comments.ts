import { authOptions } from './auth/[...nextauth]'
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { OrderItems, PrismaClient } from '@prisma/client'
import { getSession, useSession } from 'next-auth/react'

const prisma = new PrismaClient()

async function getComments(productId: number) {
  try {
    const orderItems = await prisma.orderItems.findMany({
      where: {
        productId: productId,
      },
    })

    let response = []

    for (const orderItem of orderItems) {
      const res = await prisma.comments.findUnique({
        where: {
          orderItemId: orderItem.id,
        },
      })
      if (res) {
        response.push({
          ...orderItem,
          ...res,
        })
      }
    }
    prisma.$disconnect() // disconnect from database
    return response
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
  const { productId } = req.query
  if (productId == null) {
    res.status(401).json({ items: [], message: 'productId is void' })
    return
  }
  try {
    const wishlist = await getComments(Number(productId))
    res.status(200).json({ items: wishlist ?? [], message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
