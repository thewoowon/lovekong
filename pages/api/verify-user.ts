// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function verifyUser({
  email,
  password,
}: {
  email: string
  password: string
}) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
    const result = bcrypt.compare(
      password,
      user?.password ?? '',
      (err, result) => {
        if (result) {
          return user
        } else {
          return null
        }
      }
    )
    return result
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
  const { email, password } = req.body
  try {
    const user = await verifyUser({
      email: email ? String(email) : '',
      password: password ? String(password) : '',
    })
    res.status(200).json({ items: user, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
