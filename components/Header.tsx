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
import { signIn } from 'next-auth/react'

export default function Header() {
  const { data: session } = useSession()
  const router = useRouter()

  const [toggle, setToggle] = useState(false)
  const clickProfile = () => {
    setToggle(!toggle)
  }

  return (
    <header
      className="bg-white"
      style={{ borderBottom: '0.5px solid rgba(240,240,240,0.8)' }}
    >
      <div
        className="m-auto flex h-12 items-center w-full"
        style={{ maxWidth: '1080px' }}
      >
        <div
          className="text-xs xs:text-sm flex justify-center items-center ml-4"
          style={{ fontFamily: 'Kashie-Mercy' }}
          onClick={() => {
            router.push('/')
          }}
        >
          LoveKong Stained Glass
          {/* <IconHome
            stroke={1}
            onClick={() => {
              router.push('/')
            }}
          ></IconHome> */}
        </div>
        <span className="m-auto"></span>
        <div
          className="text-xs xs:text-sm flex justify-center items-center px-2 hover:bg-zinc-50 transition duration-200 ease-in-out h-full"
          onClick={() => {
            router.push('/products')
          }}
        >
          Products
          {/* <IconBox
            stroke={1}
            onClick={() => {
              router.push('/products')
            }}
          ></IconBox> */}
        </div>
        <div
          className="text-xs xs:text-sm flex justify-center items-center px-2 hover:bg-zinc-50 transition duration-200 ease-in-out h-full"
          onClick={() => {
            router.push('/wishlist')
          }}
        >
          Wish
          {/* <IconHeart
            stroke={1}
            onClick={() => {
              router.push('/wishlist')
            }}
          ></IconHeart> */}
        </div>
        <div
          className="text-xs xs:text-sm flex justify-center items-center px-2 hover:bg-zinc-50 transition duration-200 ease-in-out h-full"
          onClick={() => {
            router.push('/cart')
          }}
        >
          Cart
          {/* <IconShoppingCart
            stroke={1}
            onClick={() => {
              router.push('/cart')
            }}
          ></IconShoppingCart> */}
        </div>
        <div
          className="text-xs xs:text-sm flex justify-center items-center px-2 hover:bg-zinc-50 transition duration-200 ease-in-out h-full"
          onClick={() => {
            router.push('/cart')
          }}
        >
          {'Q&A'}
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
          <div
            className="text-xs xs:text-sm flex justify-center items-center px-2 hover:bg-zinc-50 transition duration-200 ease-in-out h-full"
            onClick={() => {
              signIn()
            }}
          >
            Profile
            {/* <IconUser
              stroke={1}
              onClick={() => {
                signIn()
              }}
            ></IconUser> */}
          </div>
        )}
      </div>
    </header>
  )
}

const ProfileMenu = () => {
  const menus = [
    { title: '나의 주문', link: '/my' },
    { title: '로그아웃', link: '/auth/signout' },
  ]
  return (
    <ol
      style={{ border: '1px solid rgba(200,200,200,0.6)' }}
      className="font-sans-kr absolute top-10 z-50 w-[120px] shadow-lg bg-white rounded-md overflow-hidden transition duration-200 ease-in-out"
    >
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
