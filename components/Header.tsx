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
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Header() {
  const { data: session } = useSession()
  const router = useRouter()

  const [toggle, setToggle] = useState(false)
  const clickProfile = () => {
    setToggle(!toggle)
  }

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
              router.push('/products')
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
          <div className="mr-4 flex justify-center items-center relative">
            <Image
              onClick={clickProfile}
              className="rounded-full cursor-pointer mx-2"
              alt=""
              src={session.user?.image!}
              width={30}
              height={30}
            ></Image>
            {toggle && <ProfileMenu />}
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

const ProfileMenu = () => {
  const menus = [
    { title: '내 프로필', link: '/my' },
    { title: '로그아웃', link: '/auth/signout' },
  ]
  return (
    <ol className="font-sans-kr-light absolute top-10 z-50 w-[120px] shadow-lg bg-white rounded-md overflow-hidden transition duration-200 ease-in-out">
      {menus.map((menu) => (
        <Link href={menu.link} className="text-zinc-700" key={menu.title}>
          <li className="hover:bg-zinc-100 transition duration-200 ease-in-out px-4 py-2 w-full text-center text-sm text-darkGray">
            {menu.title}
          </li>
        </Link>
      ))}
    </ol>
  )
}
