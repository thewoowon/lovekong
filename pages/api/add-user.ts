import { authOptions, CustomDefaultSession } from './auth/[...nextauth]'
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Carts, PrismaClient, User } from '@prisma/client'
import { getSession, useSession } from 'next-auth/react'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()
async function addUser(item: Omit<User, 'id' | 'emailVerified' | 'createdAt'>) {
  try {
    const user = await prisma.user.create({
      data: {
        email: item.email,
        password: await bcrypt.hash(item.password ?? '', 10),
        name: item.name,
        phone: item.phone,
        address: item.address,
        image: item.image,
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
  const { item } = JSON.parse(req.body)
  try {
    const wishlist = await addUser(item)
    res.status(200).json({ items: wishlist, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
