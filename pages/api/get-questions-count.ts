// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getQuestionsCount(contains: string) {
  const containsCondition =
    contains && contains !== ''
      ? {
          title: { contains: contains },
        }
      : undefined

  const where = containsCondition ? containsCondition : undefined

  try {
    const response = await prisma.qnAs.count({ where: where })
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
  const { contains } = req.query
  try {
    const qnas = await getQuestionsCount(String(contains))
    res.status(200).json({ items: qnas, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
