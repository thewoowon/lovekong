import { authOptions, CustomDefaultSession } from './auth/[...nextauth]'
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Carts, PrismaClient } from '@prisma/client'
import { getSession, useSession } from 'next-auth/react'

const prisma = new PrismaClient()
async function addQuestion(
  userId: string,
  userName: string,
  email: string,
  title: string,
  contents: string
) {
  try {
    const qna = await prisma.qnAs.create({
      data: {
        userId: userId,
        title: title,
        email: email,
        contents: contents,
        writer: userName,
        status: 0,
        viewCount: 0,
      },
    })
    prisma.$disconnect() // disconnect from database
    return qna
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
  const { title, contents } = JSON.parse(req.body)
  if (session == null) {
    res.status(401).json({ items: [], message: 'Unauthorized' })
    return
  }
  try {
    const wishlist = await addQuestion(
      String(session.id),
      String(session.user?.name),
      String(session.user?.email),
      title,
      contents
    )
    res.status(200).json({ items: wishlist, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
