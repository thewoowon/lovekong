import { useQuery } from '@tanstack/react-query'
import useDebounce from 'hooks/useDebounce'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Categories, Products } from '@prisma/client'
import { CATEGORY_MAP, FITERS, TAKE } from 'constants/goods'
import {
  Input,
  Loader,
  Pagination,
  SegmentedControl,
  Select,
} from '@mantine/core'
import { IconSearch } from '@tabler/icons'

export default function ProductsHome() {
  const router = useRouter()
  const [activePage, setPage] = useState(1)
  //const [total, setTotal] = useState(0)
  //const [categories, setCategories] = useState<categories[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('-1')
  //const [products, setProducts] = useState<products[]>([])
  const [selectedFilter, setSelectedFilter] = useState<string | null>(
    FITERS[0].value
  )
  const [keyword, setKeyword] = useState<string>('')

  const deboundecKeyword = useDebounce(keyword, 500)

  // useEffect(() => {
  //   fetch(`/api/get-categories`)
  //     .then((res) => res.json())
  //     .then((data) => setCategories(data.items))
  // }, [])
  const { data: categories } = useQuery<
    { items: Categories[] },
    unknown,
    Categories[]
  >([`/api/get-categories`], () =>
    fetch(`/api/get-categories`)
      .then((res) => res.json())
      .then((data) => data.items)
  )

  // useEffect(() => {
  //   fetch(
  //     `/api/get-products-count?category_id=${selectedCategory}&contains=${deboundecKeyword}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => setTotal(Math.ceil(data.items / TAKE)))
  // }, [selectedCategory, deboundecKeyword])

  const { data: total } = useQuery(
    [
      `/api/get-products-count?category_id=${selectedCategory}&contains=${deboundecKeyword}`,
    ],
    () =>
      fetch(
        `/api/get-products-count?category_id=${selectedCategory}&contains=${deboundecKeyword}`
      )
        .then((res) => res.json())
        .then((data) => Math.ceil(data.items / TAKE))
  )

  // useEffect(() => {
  //   const skip = TAKE * (activePage - 1)
  //   fetch(`/api/get-products?skip=${skip}&take=${TAKE}&category_id=${selectedCategory}&orderBy=${selectedFilter}&contains=${keyword}`)
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data.items))
  // }, [activePage,selectedCategory,selectedFilter,keyword])
  const { data: products } = useQuery<
    { items: Products[] },
    unknown,
    Products[]
  >(
    [
      `/api/get-products?skip=${
        TAKE * (activePage - 1)
      }&take=${TAKE}&category_id=${selectedCategory}&orderBy=${selectedFilter}&contains=${keyword}`,
    ],
    () =>
      fetch(
        `/api/get-products?skip=${
          TAKE * (activePage - 1)
        }&take=${TAKE}&category_id=${selectedCategory}&orderBy=${selectedFilter}&contains=${keyword}`
      ).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  )

  return (
    <div>
      <Head>
        <title>LoveKong | Products</title>
        <meta name="description" content="LoveKong Stained Glass" />

        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/products`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="러브콩(LoveKong) Goods" />
        <meta
          property="og:description"
          content="러브콩의 스테인드 글라스 제품들을 만나보세요."
        />
        <meta property="og:image" content="" />
      </Head>

      <main className="my-20 lg:px-36 md:px-30 sm:px-24 xs:px-18 xss:px-12">
        <div className="flex flex-col justify-center items-center z-10">
          <div
            style={{ fontFamily: 'Kashie-Mercy' }}
            className="relative font-sans-kr-light md:text-3xl sm:text-2xl text-xl"
          >
            LoveKong Stained Glass
          </div>
          <div className="text-green-800 relative font-sans-kr-light text-md">
            러브콩 스테인드 글라스
          </div>
        </div>
        <div className="flex justify-center items-center py-10">
          {categories && (
            <SegmentedControl
              value={selectedCategory}
              onChange={setSelectedCategory}
              data={[
                { label: 'ALL', value: '-1' },
                ...categories.map((category) => ({
                  label: category.name,
                  value: String(category.id),
                })),
              ]}
              className="bg-white flex flex-wrap text-xs font-sans-kr"
              css={{ outline: 'none' }}
              size="md"
            />
          )}
        </div>
        <div className="mb-4 flex xss:justify-center xs:justify-center sm:justify-between flex-wrap">
          <div>
            <Input
              icon={<IconSearch />}
              placeholder="Search Title"
              value={keyword}
              onChange={(e: {
                currentTarget: { value: React.SetStateAction<string> }
              }) => setKeyword(e.currentTarget.value)}
              color="dark"
              className="w-56 my-2"
            />
          </div>
          <div>
            <Select
              value={selectedFilter}
              onChange={setSelectedFilter}
              data={FITERS}
              className="w-56 my-2"
            />
          </div>
        </div>
        {products ? (
          products.length > 0 ? (
            <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
              {products.map((product) => {
                return (
                  <div key={product.id} className="m-auto">
                    <div
                      className="hover:opacity-95 hover:bg-zinc-50 cursor-pointer rounded-sm shadow-md p-3 transition ease-in-out duration-200"
                      style={{
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
              style={{ height: '400px' }}
              className="flex justify-center m-auto items-center font-sans-kr-light"
            >
              상품 준비 중입니다.
            </div>
          )
        ) : (
          <div
            style={{ height: '400px' }}
            className="flex flex-col justify-center items-center font-sans-kr-light"
          >
            <div>
              제품 목록을 가져오는 중입니다. 다른 페이지로 이동하지 마세요.
            </div>
            <Loader variant="bars" color={'gray'} size={'lg'}></Loader>
          </div>
        )}
        <div className="w-full flex mt-20">
          {total && total !== 0 ? (
            <Pagination
              className="m-auto"
              page={activePage}
              onChange={setPage}
              total={total}
              color="dark"
            />
          ) : null}
        </div>
      </main>
    </div>
  )
}
