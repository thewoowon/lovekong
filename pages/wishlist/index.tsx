import { Loader } from '@mantine/core'
import { Products } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { CATEGORY_MAP } from 'constants/goods'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Wishlist() {
  const router = useRouter()
  const { data: session } = useSession()

  const { data: products } = useQuery<
    { items: Products[] },
    unknown,
    Products[]
  >(
    [`/api/get-wishlists`],
    () => fetch(`/api/get-wishlists`).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  )

  useEffect(() => {}, [])

  return (
    <div>
      <Head>
        <title>LoveKong | Wishlist</title>
        <meta name="description" content="LoveKong Stained Glass" />

        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/wishlist`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="러브콩(LoveKong) Wishlist" />
        <meta
          property="og:description"
          content="러브콩의 스테인드 글라스 제품들을 만나보세요."
        />
        <meta property="og:image" content="" />
      </Head>

      <main className="font-sans-kr mx-auto bg-zinc-50">
        <div
          className="text-2xl flex justify-center py-10 bg-white"
          style={{
            borderBottom: '0.5px solid rgba(200,200,200,1)',
            minWidth: '360px',
          }}
        >
          <div
            className="w-full"
            style={{ maxWidth: '1080px', minWidth: '360px' }}
          >
            찜한 목록 ({products && products?.length})
          </div>
        </div>
        <div className="flex justify-center my-10 ">
          {products ? (
            products.length > 0 ? (
              <div
                className="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 mx-auto"
                style={{ minWidth: '360px', maxWidth: '1020px' }}
              >
                {products.map((product) => {
                  return (
                    <div key={product.id} className="m-auto">
                      <div
                        className="hover:opacity-95 cursor-pointer rounded-md shadow-lg p-3 transition ease-in-out duration-300"
                        style={{
                          border: '1px solid rgba(200,200,200,0.6)',
                          maxWidth: 300,
                          minWidth: 200,
                        }}
                        onClick={() => {
                          router.push(`/products/${product.id}`)
                        }}
                      >
                        <Image
                          className="rounded-sm"
                          src={product.image_url ?? ''}
                          alt={product.name}
                          width={400}
                          height={500}
                          placeholder="blur"
                          blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                        ></Image>
                        <div className="flex p-2">
                          <span className="font-sans-kr text-md">
                            {product.name}
                          </span>
                          <span className="font-sans-kr-light ml-auto">
                            {product.price.toLocaleString('ko-KR')} ₩
                          </span>
                        </div>
                        <div className="flex px-2 pb-2">
                          <span className="text-zinc-500 font-sans-kr-light">
                            type : {CATEGORY_MAP[product.category_id - 1]}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div
                style={{ height: '600px' }}
                className="flex flex-col justify-center items-center font-sans-kr-light"
              >
                <div>찜한 목록이 비었어요.</div>
              </div>
            )
          ) : (
            <div
              style={{ height: '600px' }}
              className="flex flex-col justify-center items-center font-sans-kr-light"
            >
              <div>
                찜한 목록을 가져오는 중이에요. 다른 페이지로 이동하지 마세요.
              </div>
              <Loader variant="bars" color={'gray'} size={'lg'}></Loader>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
