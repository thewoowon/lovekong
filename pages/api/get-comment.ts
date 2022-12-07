import { authOptions, CustomDefaultSession } from './auth/[...nextauth]'
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getSession, useSession } from 'next-auth/react'

const prisma = new PrismaClient()

async function getComment(userId: string, orderItemId: number) {
  try {
    const response = await prisma.comments.findUnique({
      where: {
        orderItemId: orderItemId,
      },
    })
    if (response?.userId === userId) {
      return response
    }
    return { message: 'userid is not matched' }
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
  const { orderItemId } = req.query
  if (session == null) {
    res.status(401).json({ items: [], message: 'Unauthorized' })
    return
  }
  if (orderItemId == null) {
    res.status(401).json({ items: [], message: 'Order Item Void' })
    return
  }
  try {
    const wishlist = await getComment(String(session.id), Number(orderItemId))
    res.status(200).json({ items: wishlist ?? [], message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
