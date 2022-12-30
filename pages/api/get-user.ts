// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type qnasQuery = {
  email: string
}

async function getUser({ email }: qnasQuery) {
  try {
    return
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
  const { email } = req.query
  try {
    const user = await getUser({
      email: email ? String(email) : '',
    })
    res.status(200).json({ items: user, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
