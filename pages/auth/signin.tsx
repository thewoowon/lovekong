import ButtonBig from '@components/ButtonBig'
import { FormError } from '@components/FormError'
import styled from '@emotion/styled'
import { Input } from '@mantine/core'
import { User } from '@prisma/client'
import { IconBrandGoogle, IconBrandNextjs, IconLogin } from '@tabler/icons'
import { useMutation } from '@tanstack/react-query'
import { GetServerSidePropsContext } from 'next'
import { BuiltInProviderType } from 'next-auth/providers'
import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
  LiteralUnion,
  ClientSafeProvider,
  useSession,
} from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export type ILoginForm = {
  email: string
  password: string
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers = await getProviders()
  return {
    props: {
      providers: await providers,
    },
  }
}

export default function SignIn({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider | null
  >
}) {
  const [myProviders, setMyProviders] = useState([])
  const { data: session } = useSession()
  const {
    register,
    getValues,
    formState: { isValid, errors },
    handleSubmit,
    watch,
  } = useForm<ILoginForm>({
    mode: 'onChange',
  })

  const onSubmit = async () => {
    const { email, password } = getValues()
    const response = await signIn('sign in with email', {
      email,
      password,
      redirect: false,
      callbackUrl: 'http://localhost:3000/auth/signin',
    }).then((res) => {
      if (res?.status === 200) {
        toast.success('로그인에 성공했습니다.', {
          icon: '👏',
          position: 'top-right',
        })
      } else {
        toast.error('로그인에 실패했습니다.', {
          icon: '👏',
          position: 'top-right',
        })
      }
    })
  }
  return (
    <div className="w-full h-screen flex justify-center mt-20">
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
          <div className="w-full">
            <div className="font-sans-kr-light">
              사용자의 로그인 정보가 없습니다. 로그인해주세요.
            </div>
            <form
              className="grid gap-2 mt-8 mb-4 w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label
                htmlFor="email"
                className="flex justify-between items-center"
              >
                <input
                  {...register('email', {
                    required: '이메일을 입력해주세요',
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                  name="email"
                  type="email"
                  placeholder="이메일을 입력하세요."
                  required
                  className="w-full h-12 border border-zinc-300 px-4 ouline-none focus:outline-none rounded-md"
                  autoComplete="true"
                />
              </label>
              {(errors.email?.type === 'pattern' && (
                <FormError errorMessage="올바른 이메일 형식을 입력해주세요" />
              )) ||
                (errors.email?.message && (
                  <FormError errorMessage={errors.email?.message} />
                ))}
              <input
                {...register('password', {
                  required: '비밀번호를 입력해주세요',
                  pattern:
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/,
                })}
                name="password"
                type="password"
                required
                placeholder="비밀번호를 입력하세요."
                className="w-full h-12 border border-zinc-300 px-4 ouline-none focus:outline-none rounded-md"
                autoComplete="true"
              />
              {errors.password?.type === 'pattern' && (
                <FormError errorMessage="대소문자, 숫자, 특수문자 8-14자리를 입력해주세요" />
              )}
              {errors.password?.message && (
                <FormError errorMessage={errors.password?.message} />
              )}
              <ButtonLogin
                onSubmit={handleSubmit(onSubmit)}
                className="w-full my-2 flex justify-center items-center shadow-lg hover:bg-zinc-100 bg-white text-black border-2 border-zinc-500"
              >
                <span className="px-2 font-bold">이메일 로그인</span>
              </ButtonLogin>
            </form>
            <ButtonBig
              className="text-blue-500 border-2 border-blue-500 w-full my-2 flex justify-center items-center shadow-lg hover:bg-blue-500 hover:text-white"
              onClick={() => signIn('google')}
            >
              <span className="px-2 font-bold">Google 로그인</span>
            </ButtonBig>
            {/* <ButtonBig
            className="m-2 flex justify-center items-center shadow-lg hover:bg-yellow-500 bg-yellow-400 text-white"
            onClick={() => signIn('kakao')}
          >
            <IconBrandKickstarter color="white" stroke={2} size={25}></IconBrandKickstarter>
            <span className="px-2">카카오 로그인</span>
          </ButtonBig> */}
            <ButtonBig
              className="text-green-500 border-2 border-green-500 w-full my-2 flex justify-center items-center shadow-lg hover:bg-green-500 hover:text-white"
              onClick={() => signIn('naver')}
            >
              <span className="px-2 font-bold">NAVER 로그인</span>
            </ButtonBig>
            <div className="flex justify-center items-center">
              아직 회원이 아니신가요?
              <Link
                className="text-blue-500 px-2 my-4 border-b-blue-500 hover:border-b "
                href="/auth/new-user"
              >
                회원가입하기
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const ButtonLogin = styled.button`
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`
