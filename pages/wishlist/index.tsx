import { Loader } from '@mantine/core'
import { Products } from '@prisma/client'
import { IconHeart, IconStar } from '@tabler/icons'
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

      <main className="font-sans-kr mx-auto">
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
                className="grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-5 mx-auto"
                style={{ minWidth: '360px', maxWidth: '1020px' }}
              >
                {products.map((product) => {
                  return (
                    <div key={product.id} className="m-auto">
                      <div
                        className="hover:opacity-95 hover:bg-zinc-50 cursor-pointer rounded-md p-3 transition ease-in-out duration-200"
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
                        <div className="flex pt-4 pb-1">
                          <span
                            style={{ fontFamily: 'Kashie-Mercy' }}
                            className="text-md"
                          >
                            LoveKong
                          </span>
                        </div>
                        <div className="flex py-1">
                          <span className="font-sans-kr text-md">
                            {product.name}
                          </span>
                        </div>
                        <div className="flex">
                          <span className="font-semibold text-lg">
                            <span className="text-red-400">10% </span>
                            <span className="line-through text-zinc-500">
                              {product.price.toLocaleString('ko-KR')}
                            </span>
                            <span className="px-2">
                              {(product.price * 0.9).toLocaleString('ko-KR')}
                            </span>
                          </span>
                        </div>
                        <div>
                          <span className="text-xs px-2 py-1 bg-blue-200 rounded-sm">
                            오픈할인
                          </span>
                        </div>
                        <div className="flex justify-start items-center pt-5">
                          <div className="flex mr-6">
                            <IconHeart color="gray" stroke={1.5}></IconHeart>
                            <span className="px-1">{0}</span>
                          </div>
                          <div className="flex">
                            <IconStar color="gray" stroke={1.5}></IconStar>
                            <span className="px-1">{0}</span>
                          </div>
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
