import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="scroll-smooth">
      <Head>
        <title>LoveKong</title>
        <meta name="description" content="LoveKong Stained Glass" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:url" content={`http://localhost:3000/comments`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="럽콩(LoveKong) Comments" />
        <meta
          property="og:description"
          content="럽콩의 아이덴티티를 여러 제품을 통해 만나보세요."
        />
        <meta
          property="og:image"
          content="https://imagedelivery.net/6qzLODAqs2g1LZbVYqtuQw/bb63b50a-7d84-464c-249a-9da9aa993900/public"
        />
      </Head>
      <section
        style={{ height: '600px' }}
        className="bg-white flex flex-col justify-center items-center"
      >
        <div className="font-sans-kr text-2xl">hello</div>
        <div className="font-sans-kr-bold text-2xl">hello</div>
        <div className="font-sans-kr-light text-2xl">hello</div>
      </section>
      <section
        style={{ height: '600px' }}
        className="bg-gray-50 flex justify-center items-center"
      ></section>
      <section
        style={{ height: '600px' }}
        className="bg-white flex justify-center items-center"
      ></section>
      <section
        style={{ height: '600px' }}
        className="bg-gray-50 flex justify-center items-center"
      ></section>
      <section
        style={{ height: '600px' }}
        className="bg-white flex justify-center items-center"
      ></section>
    </div>
  )
}
