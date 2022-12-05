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
        <meta property="og:url" content={`http://localhost:3000/wishlist`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="럽콩(LoveKong) Wishlist" />
        <meta
          property="og:description"
          content="럽콩의 아이덴티티를 여러 제품을 통해 만나보세요."
        />
        <meta property="og:image" content="" />
      </Head>

      <main className="font-sans-kr-light px-36 my-10">
        <p className="text-2xl mb-2">
          주문내역 ({products && products?.length})
        </p>
        {products ? (
          products.length > 0 ? (
            <div className="grid grid-cols-3 gap-5">
              {products.map((product) => {
                return (
                  <div key={product.id} className="m-auto">
                    <div
                      className="hover:opacity-80 cursor-pointer hover:scale-105 transition ease-in-out duration-300"
                      style={{ maxWidth: 310 }}
                      onClick={() => {
                        router.push(`/products/${product.id}`)
                      }}
                    >
                      <Image
                        className="rounded-lg"
                        src={product.image_url ?? ''}
                        alt={product.name}
                        width={310}
                        height={390}
                        placeholder="blur"
                        blurDataURL={
                          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
                        }
                      ></Image>
                      <div className="flex">
                        <span>{product.name}</span>
                        <span className="ml-auto">
                          {product.price.toLocaleString('ko-KR')}₩
                        </span>
                      </div>
                      <span className="text-zinc-400">
                        {CATEGORY_MAP[product.category_id - 1]}
                      </span>
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
      </main>
    </div>
  )
}
