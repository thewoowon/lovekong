// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getUser({ email }: { email: string }) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
    prisma.$disconnect() // disconnect from database
    return user
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
  const { email } = JSON.parse(req.body)
  try {
    const user = await getUser({
      email: email ? String(email) : '',
    })
    res.status(200).json({ items: user, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
