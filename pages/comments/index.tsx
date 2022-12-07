import Head from 'next/head'
import Image from 'next/image'

export default function Comments() {
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

      <main>
        <h1>hello</h1>
      </main>
    </div>
  )
}
