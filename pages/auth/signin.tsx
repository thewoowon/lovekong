import { GetServerSidePropsContext } from 'next'
import { BuiltInProviderType } from 'next-auth/providers'
import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
  LiteralUnion,
  ClientSafeProvider,
} from 'next-auth/react'
import { useEffect, useState } from 'react'

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
  useEffect(() => {}, [])
  return (
    <div className="flex flex-col">
      {Object.values(providers).map((provider) => (
        <div key={provider?.name ?? 'Provider의 이름을 가져오지 못했어요.'}>
          <button
            onClick={() =>
              signIn(provider?.id ?? 'Provider의 Id를 가져오지 못했어요.')
            }
          >
            Sign in with{' '}
            {provider?.name ?? 'Provider의 이름을 가져오지 못했어요.'}
          </button>
        </div>
      ))}
    </div>
  )
}
