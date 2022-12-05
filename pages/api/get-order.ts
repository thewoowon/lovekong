import { authOptions } from './auth/[...nextauth]'
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { OrderItems, PrismaClient } from '@prisma/client'
import { getSession, useSession } from 'next-auth/react'

const prisma = new PrismaClient()

async function getOrder(userId: string) {
  try {
    const orders = await prisma.orders.findMany({
      where: {
        userId: userId,
      },
    })

    let response = []

    for (const order of orders) {
      let orderItems: OrderItems[] = []
      for (const orderItemId of order.orderItemIds
        .split(',')
        .map((id: string) => Number(id))) {
        const res: OrderItems[] =
          await prisma.$queryRaw`SELECT OI.id, OI.quantity, OI.amount,OI.price, PR.name, PR.image_url, OI.productId FROM OrderItems AS OI JOIN products AS PR ON OI.productId = PR.id WHERE OI.id = ${orderItemId};`
        orderItems.push.apply(orderItems, res)
      }
      response.push({
        ...order,
        orderItems: orderItems,
      })
    }

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
  const session = await getSession({ req })
  if (session == null) {
    res.status(401).json({ items: [], message: 'Unauthorized' })
    return
  }
  try {
    const wishlist = await getOrder(String(session.id))
    res.status(200).json({ items: wishlist ?? [], message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
