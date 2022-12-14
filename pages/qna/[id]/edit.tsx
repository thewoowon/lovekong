import { Pagination } from '@mantine/core'
import Head from 'next/head'
import Image from 'next/image'

export default function QNAEdit() {
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
      <main></main>
    </div>
  )
}
