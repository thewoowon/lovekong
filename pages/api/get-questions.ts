// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getOrderBy } from 'constants/goods'

const prisma = new PrismaClient()

type productsQuery = {
  skip: number
  take: number
  category_id: number
  orderBy: string
  contains: string
}

async function getQuestions({
  skip,
  take,
  category_id,
  orderBy,
  contains,
}: productsQuery) {
  const containsCondition =
    contains && contains !== ''
      ? {
          name: { contains: contains },
        }
      : undefined
  const where =
    category_id && category_id !== -1
      ? {
          category_id: category_id,
          ...containsCondition,
        }
      : containsCondition
      ? containsCondition
      : undefined

  try {
    const response = await prisma.products.findMany({
      skip: skip ? skip : 0,
      take: take ? take : 10,
      where: where,
      ...getOrderBy(orderBy),
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
  const { skip, take, category_id, orderBy, contains } = req.query
  if (skip == null || take == null) {
    res.status(400).json({ message: 'No skip or No take' })
  }

  try {
    const products = await getQuestions({
      skip: Number(skip),
      take: Number(take),
      category_id: Number(category_id),
      orderBy: String(orderBy),
      contains: contains ? String(contains) : '',
    })
    res.status(200).json({ items: products, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
