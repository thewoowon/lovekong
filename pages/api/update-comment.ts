import { authOptions } from './auth/[...nextauth]'
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getSession, useSession } from 'next-auth/react'

const prisma = new PrismaClient()

interface ICommentProps {
  userId: string
  orderItemId: number
  rate: number
  contents: string
}

async function updateComment(iCommentProps: ICommentProps) {
  try {
    const response = await prisma.comments.upsert({
      where: {
        orderItemId: iCommentProps.orderItemId,
      },
      update: {
        rate: iCommentProps.rate,
        contents: iCommentProps.contents,
      },
      create: {
        userId: iCommentProps.userId,
        orderItemId: iCommentProps.orderItemId,
        rate: iCommentProps.rate,
        contents: iCommentProps.contents,
      },
    })
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
  const { orderItemId, rate, contents } = JSON.parse(req.body)
  if (session == null) {
    res.status(401).json({ items: [], message: 'Unauthorized' })
    return
  }
  try {
    const comment = await updateComment({
      userId: String(session.id),
      orderItemId: Number(orderItemId),
      rate: Number(rate),
      contents: String(contents),
    })
    res.status(200).json({ items: comment, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
