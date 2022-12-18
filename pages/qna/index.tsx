import { Input, Loader, Pagination } from '@mantine/core'
import { QnAs } from '@prisma/client'
import { IconSearch } from '@tabler/icons'
import { useQuery } from '@tanstack/react-query'
import { QNA_STATUS, TAKE } from 'constants/goods'
import useDebounce from 'hooks/useDebounce'
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function QNA() {
  const session = useSession()
  const [activePage, setPage] = useState(1)
  const [keyword, setKeyword] = useState<string>('')
  const deboundecKeyword = useDebounce(keyword, 500)
  const router = useRouter()
  const { data: total } = useQuery(
    [`/api/get-questions-count?contains=${deboundecKeyword}`],
    () =>
      fetch(`/api/get-questions-count?contains=${deboundecKeyword}`)
        .then((res) => res.json())
        .then((data) => Math.ceil(data.items / TAKE))
  )

  // useEffect(() => {
  //   const skip = TAKE * (activePage - 1)
  //   fetch(`/api/get-products?skip=${skip}&take=${TAKE}&category_id=${selectedCategory}&orderBy=${selectedFilter}&contains=${keyword}`)
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data.items))
  // }, [activePage,selectedCategory,selectedFilter,keyword])
  const { data: qnas } = useQuery<{ items: QnAs[] }, unknown, QnAs[]>(
    [
      `/api/get-questions?skip=${
        TAKE * (activePage - 1)
      }&take=${TAKE}&contains=${keyword}`,
    ],
    () =>
      fetch(
        `/api/get-questions?skip=${
          TAKE * (activePage - 1)
        }&take=${TAKE}&contains=${keyword}`
      ).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  )

  return (
    <div>
      <Head>
        <title>LoveKong | QnA</title>
        <meta name="description" content="LoveKong Stained Glass" />

        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/qna`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="러브콩(LoveKong) QnA" />
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
            {'Q&A'}
          </div>
        </div>
        <div className="xs:text-sm text-xs flex justify-center py-4 bg-white">
          <div
            className="flex justify-between w-full"
            style={{ maxWidth: '1080px', minWidth: '360px' }}
          >
            <Input
              icon={<IconSearch />}
              placeholder="Search Title"
              value={keyword}
              onChange={(e: {
                currentTarget: { value: React.SetStateAction<string> }
              }) => setKeyword(e.currentTarget.value)}
              color="dark"
              className="w-56"
            />
            <span className="mx-auto"></span>
            <div className="flex items-center">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 ease-in-out mx-1"
                onClick={() => {
                  router.push('/qna/my')
                }}
              >
                나의 글만 보기
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 ease-in-out mx-1"
                onClick={() => {
                  router.push('/qna/write')
                }}
              >
                글작성
              </button>
            </div>
          </div>
        </div>
        <div className="xs:text-sm text-xs flex justify-center bg-white">
          <table style={{ maxWidth: '1080px', minWidth: '360px' }}>
            <thead className="bg-zinc-100">
              <tr>
                <th>No.</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>상태</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              {qnas ? (
                qnas.map((qna, index) => (
                  <tr key={qna.id}>
                    <td>{qna.id}</td>
                    <td>
                      {
                        // 운영자는 모든 글을 볼 수 있음
                        session &&
                        session.data?.user?.email === 'thewoowon@naver.com' ? (
                          <Link
                            href={`/qna/${qna.id}`}
                            className="text-blue-500 border-b hover:border-b-blue-600"
                          >
                            {qna.title}
                          </Link>
                        ) : // 작성자는 자신의 글만 볼 수 있음
                        session && session.data?.user?.email === qna.email ? (
                          <Link
                            href={`/qna/${qna.id}`}
                            className="text-blue-500 border-b hover:border-b-blue-600"
                          >
                            {qna.title}
                          </Link>
                        ) : (
                          <div>비밀글입니다.</div>
                        )
                      }
                    </td>
                    <td>{qna.writer}</td>
                    <td>{qna.createdAt.toString().substring(0, 10)}</td>
                    <td>{QNA_STATUS[qna.status]}</td>
                    <td>{qna.viewCount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    QNA 목록을 가져오는 중입니다. 다른 페이지로 이동하지 마세요.
                    <div className="w-full flex justify-center items-center my-5">
                      <Loader
                        variant="bars"
                        color={'gray'}
                        size={'lg'}
                      ></Loader>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center pb-10 pt-10 bg-white">
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
