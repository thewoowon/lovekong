import { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { Loader } from '@mantine/core'

export default function SignOut() {
  signOut({ callbackUrl: 'http://localhost:3000/bye' })
  return (
    <div
      style={{ height: '600px' }}
      className="flex flex-col justify-center items-center font-sans-kr-light"
    >
      <div>로그아웃 중이에요. 다른 페이지로 이동하지 마세요.</div>
      <Loader variant="bars" color={'gray'} size={'lg'}></Loader>
    </div>
  )
}
