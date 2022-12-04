import Head from 'next/head'
import Image from 'next/image'

export default function Wishlist() {
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

      <main>
        <h1>hello</h1>
      </main>
    </div>
  )
}
