import {
  IconBoxMultiple,
  IconBox,
  IconHeart,
  IconHome,
  IconShoppingCart,
  IconUser,
} from '@tabler/icons'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Header() {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <header
      className="px-36"
      style={{ borderBottom: '0.5px solid rgba(240,240,240,0.8)' }}
    >
      <div className="w-full m-auto flex h-12 items-center">
        <div className="rounded-full p-2 cursor-pointer hover:bg-zinc-200 transition duration-300 ease-in-out">
          <IconHome
            stroke={0.5}
            onClick={() => {
              router.push('/')
            }}
          ></IconHome>
        </div>
        <span className="m-auto"></span>
        <div className="rounded-full p-2 cursor-pointer hover:bg-yellow-200 transition duration-300 ease-in-out">
          <IconBox
            stroke={0.5}
            onClick={() => {
              router.push('/goods')
            }}
          ></IconBox>
        </div>
        <div className="rounded-full p-2 cursor-pointer hover:bg-red-200 transition duration-300 ease-in-out">
          <IconHeart
            stroke={0.5}
            onClick={() => {
              router.push('/wishlist')
            }}
          ></IconHeart>
        </div>
        <div className="rounded-full p-2 cursor-pointer hover:bg-green-200 transition duration-300 ease-in-out">
          <IconShoppingCart
            stroke={0.5}
            onClick={() => {
              router.push('/cart')
            }}
          ></IconShoppingCart>
        </div>
        {session ? (
          <div className="mr-4 flex justify-center items-center">
            <Image
              onClick={() => {
                router.push('/my')
              }}
              className="rounded-full"
              alt=""
              src={session.user?.image!}
              width={30}
              height={30}
            ></Image>
          </div>
        ) : (
          <div className="rounded-full p-2 cursor-pointer hover:bg-blue-200 transition duration-300 ease-in-out">
            <IconUser
              stroke={0.5}
              onClick={() => {
                router.push('/auth/login')
              }}
            ></IconUser>
          </div>
        )}
      </div>
    </header>
  )
}
