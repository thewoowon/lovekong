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

  const onSubmit = () => {
    const { email, password } = getValues()
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
                <IconLogin color="black" stroke={2} size={20}></IconLogin>
                <span className="px-2">로그인</span>
              </ButtonLogin>
            </form>
            <ButtonBig
              className="w-full my-2 flex justify-center items-center shadow-lg hover:bg-blue-600 bg-blue-500 text-white"
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
              className="w-full my-2 flex justify-center items-center shadow-lg hover:bg-green-600 bg-green-500 text-white"
              onClick={() => signIn('naver')}
            >
              <IconBrandNextjs
                color="white"
                stroke={2}
                size={25}
              ></IconBrandNextjs>
              <span className="px-2">네이버 로그인</span>
            </ButtonBig>
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
