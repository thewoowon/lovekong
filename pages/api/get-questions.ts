// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type qnasQuery = {
  skip: number
  take: number
  contains: string
  email: string
}

async function getQuestions({ skip, take, contains, email }: qnasQuery) {
  const containsCondition =
    contains && contains !== ''
      ? {
          title: { contains: contains },
        }
      : undefined
  const where = containsCondition
    ? email && email !== ''
      ? {
          email: email,
          ...containsCondition,
        }
      : containsCondition
    : undefined

  try {
    const response = await prisma.qnAs.findMany({
      skip: skip ? skip : 0,
      take: take ? take : 10,
      where: where,
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
  const { skip, take, contains, email } = req.query
  if (skip == null || take == null) {
    res.status(400).json({ message: 'No skip or No take' })
  }

  try {
    const qnas = await getQuestions({
      skip: Number(skip),
      take: Number(take),
      contains: contains ? String(contains) : '',
      email: email ? String(email) : '',
    })
    res.status(200).json({ items: qnas, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
