import { Pagination } from '@mantine/core'
import Head from 'next/head'
import Image from 'next/image'

export default function QNA() {
  return (
    <div>
      <Head>
        <title>LoveKong | Comments</title>
        <meta name="description" content="LoveKong Stained Glass" />

        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/comments`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="러브콩(LoveKong) Comments" />
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
        <div className="xs:text-sm text-xs flex justify-center py-10 bg-white">
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
              <tr>
                <td>Argentina</td>
                <td>Spanish (official), English, Italian, German, French</td>
                <td>41,803,125</td>
                <td>31.3</td>
                <td>2,780,387</td>
                <td>2,780,387</td>
              </tr>
              <tr>
                <td>Australia</td>
                <td>English 79%, native and other languages</td>
                <td>23,630,169</td>
                <td>37.3</td>
                <td>7,739,983</td>
                <td>2,780,387</td>
              </tr>
              <tr>
                <td>Australia</td>
                <td>English 79%, native and other languages</td>
                <td>23,630,169</td>
                <td>37.3</td>
                <td>7,739,983</td>
                <td>2,780,387</td>
              </tr>
              <tr>
                <td>Australia</td>
                <td>English 79%, native and other languages</td>
                <td>23,630,169</td>
                <td>37.3</td>
                <td>7,739,983</td>
                <td>2,780,387</td>
              </tr>
              <tr>
                <td>Australia</td>
                <td>English 79%, native and other languages</td>
                <td>23,630,169</td>
                <td>37.3</td>
                <td>7,739,983</td>
                <td>2,780,387</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center pb-20 pt-10 bg-white">
          <Pagination className="m-auto" total={10} color="dark" />
        </div>
      </main>
    </div>
  )
}
