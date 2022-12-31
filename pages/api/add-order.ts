import { authOptions, CustomDefaultSession } from './auth/[...nextauth]'
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Carts, OrderItems, PrismaClient } from '@prisma/client'
import { getSession, useSession } from 'next-auth/react'

const prisma = new PrismaClient()

export interface IOrderInfo {
  receiver?: string
  address?: string
  phone?: string
}

async function addOrder(
  userId: string,
  items: Omit<OrderItems, 'id' | 'createdAt'>[],
  orderInfo: IOrderInfo
) {
  try {
    let orderItemIds = []
    for (const item of items) {
      const orderItem = await prisma.orderItems.create({
        data: {
          ...item,
        },
      })
      orderItemIds.push(orderItem.id)
    }

    const order = await prisma.orders.create({
      data: {
        userId: userId,
        orderItemIds: orderItemIds.join(','),
        ...orderInfo,
        status: 0,
      },
    })
    prisma.$disconnect() // disconnect from database
    return orderItemIds
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
  const { items, orderInfo } = JSON.parse(req.body)
  if (session == null) {
    res.status(401).json({ items: [], message: 'Unauthorized' })
    return
  }
  try {
    const wishlist = await addOrder(String(session.id), items, orderInfo)
    res.status(200).json({ items: wishlist, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
