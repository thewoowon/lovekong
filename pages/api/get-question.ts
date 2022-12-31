// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getQuestion(id: number) {
  try {
    const response = await prisma.qnAs.findUnique({
      where: {
        id: id,
      },
    })
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
  const { id: qnaId } = req.query

  if (qnaId == null) {
    res.status(400).json({ message: 'No Id' })
  }
  try {
    const products = await getQuestion(Number(qnaId))
    res.status(200).json({ items: products, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
