import {
  IconBrandApple,
  IconBrandGmail,
  IconBrandGoogle,
  IconBrandKickstarter,
  IconBrandKotlin,
  IconBrandMeta,
  IconBrandNetflix,
  IconBrandNextjs,
} from '@tabler/icons'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useEffect } from 'react'
import ButtonBig from './ButtonBig'
export default function OAuthLogin() {
  const { data: session } = useSession()

  return (
    <div className="flex flex-col font-sans-kr">
      {session ? (
        <div
          style={{ height: '500px' }}
          className="flex flex-col justify-center items-center font-sans-kr-light"
        >
          <div
            className="relative text-5xl"
            style={{ fontFamily: 'Kashie-Mercy' }}
          >
            LoveKong Stained Glass
          </div>
          <div className="relative font-sans-kr-light text-xl py-3">
            러브콩 스테인드 글라스
          </div>
          <div className="text-xl">
            안녕하세요! {session.user?.name}님 😆😆😆
          </div>
          <div className="flex flex-col justify-center items-center py-3 text-blue-500">
            <Link
              className="border-b-2 border-b-white hover:border-b-blue-500 cursor-pointer"
              href="/"
            >
              {'-> '} 메인으로 이동하기
            </Link>
            <Link
              className="border-b-2 border-b-white hover:border-b-blue-500 cursor-pointer"
              href="/auth/signout"
            >
              {'-> '}로그아웃하기
            </Link>
          </div>
        </div>
      ) : (
        <>
          <span className="font-sans-kr-light">
            사용자의 로그인 정보가 없습니다. 로그인해주세요.
          </span>
          <br />
          <ButtonBig
            className="m-2 flex justify-center items-center shadow-lg hover:bg-blue-600 bg-blue-500 text-white"
            onClick={() => signIn('google')}
          >
            <IconBrandGoogle
              color="white"
              stroke={2}
              size={20}
            ></IconBrandGoogle>
            <span className="px-2">구글 로그인</span>
          </ButtonBig>
          {/* <ButtonBig
            className="m-2 flex justify-center items-center shadow-lg hover:bg-yellow-500 bg-yellow-400 text-white"
            onClick={() => signIn('kakao')}
          >
            <IconBrandKickstarter color="white" stroke={2} size={25}></IconBrandKickstarter>
            <span className="px-2">카카오 로그인</span>
          </ButtonBig> */}
          <ButtonBig
            className="m-2 flex justify-center items-center shadow-lg hover:bg-blue-600 bg-blue-500 text-white"
            onClick={() => signIn('naver')}
          >
            <IconBrandNextjs
              color="white"
              stroke={2}
              size={25}
            ></IconBrandNextjs>
            <span className="px-2">네이버 로그인</span>
          </ButtonBig>
        </>
      )}
    </div>
  )
}
