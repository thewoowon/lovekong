import Card from '@components/Card'
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
        className="bg-white flex flex-col justify-center items-center relative"
      >
        <div className="grid grid-flow-col grid-rows-2 grid-cols-3 gap-8">
          <div className="transform scale-110 -rotate-6 -translate-y-10 bg-green-100 w-24 h-36 rounded-md hover:bg-green-200 transition duration-300 ease-in-out hover:scale-125 hover:shadow-lg"></div>
          <div className="row-start-1 col-start-2 col-span-2 transform translate-x-20 -translate-y-16 bg-purple-100 rounded-md hover:bg-purple-200 transition duration-300 ease-in-out hover:scale-110 hover:shadow-lg"></div>
          <div className="transform scale-125 -translate-x-10 translate-y-2 bg-red-100 rounded-md hover:bg-red-200 transition duration-300 ease-in-out hover:scale-150 hover:shadow-lg"></div>
          <div className="transform translate-y-24 bg-blue-100 rounded-md hover:bg-blue-200 transition duration-300 ease-in-out hover:scale-110 hover:shadow-lg"></div>
          <div className="col-start-3 transform scale-75 rotate-6 translate-x-2 -translate-y-10 bg-yellow-100 rounded-md hover:bg-yellow-200 transition duration-300 ease-in-out hover:scale-100 hover:shadow-lg"></div>
        </div>
        <div className="absolute flex flex-col justify-center items-center z-10">
          <div className="relative font-sans-kr text-6xl">
            LoveKong Stained Glass
          </div>
          <div className="relative font-sans-kr-light text-3xl pt-6 pb-2">
            러브콩 스테인드 글라스
          </div>
          <div className="relative font-sans-kr-light text-lg text-green-700">
            Since 2020
          </div>
        </div>
      </section>
      <section
        style={{ height: '1200px' }}
        className="bg-white flex flex-col justify-center items-center"
      >
        <div className="font-sans-kr text-3xl pt-6 pb-20 text-zinc-600">
          러브콩의 아이덴티티를 만나보세요.
        </div>
        <div className="grid grid-flow-row grid-rows-2 grid-cols-3 gap-8">
          <Card image="/assets/light/light1.jpeg" title={'Light'}></Card>
          <Card image="/assets/light/light2.jpeg" title={'Case'}></Card>
          <Card image="/assets/light/light3.jpeg" title={'Vase'}></Card>
          <Card image="/assets/light/light4.jpeg" title={'Tray'}></Card>
          <Card image="/assets/light/light5.jpeg" title={'Accesory'}></Card>
          <Card image="/assets/light/light6.jpeg" title={'Others'}></Card>
        </div>
      </section>
      <section
        style={{ height: '600px' }}
        className="bg-white flex justify-center items-center max-w-5xl mx-auto"
      >
        <div className="w-6/12 flex flex-col justify-center items-center">
          <div className="font-sans-kr w-full text-4xl pt-6 text-zinc-700 text-left">
            오묘한 빛과 색의 조화를
          </div>
          <div className="font-sans-kr w-full text-4xl pt-6 text-zinc-700 text-left">
            온전히 확인할 수 있는
          </div>
          <div className="font-sans-kr w-full text-4xl pt-6 text-zinc-700 text-left">
            그런 조명
          </div>
        </div>
        <div className="w-6/12 flex justify-center items-center">
          <img alt="" src={'/assets/mood/AdobeStock_339871569.jpeg'}></img>
        </div>
      </section>
      <section
        style={{ height: '600px' }}
        className="bg-white flex justify-center items-center max-w-5xl mx-auto"
      >
        <div className="w-6/12 flex justify-center items-center">
          <img alt="" src={'/assets/mood/AdobeStock_339871569.jpeg'}></img>
        </div>
        <div className="w-6/12 flex flex-col justify-center items-center">
          <div className="font-sans-kr w-full text-4xl pt-6 text-zinc-700 text-right">
            당신의 소중한 것을 담아주세요
          </div>
          <div className="font-sans-kr w-full text-4xl pt-6 text-zinc-700 text-right">
            온전히 확인할 수 있는
          </div>
          <div className="font-sans-kr w-full text-4xl pt-6 text-zinc-700 text-right">
            그런 조명
          </div>
        </div>
      </section>
      <section
        style={{ height: '600px' }}
        className="bg-white flex justify-center items-center max-w-5xl mx-auto"
      >
        <div className="w-6/12 flex flex-col justify-center items-center">
          <div className="font-sans-kr w-full text-4xl pt-6 text-zinc-700 text-left">
            나의 비밀을 간직하는 곳
          </div>
          <div className="font-sans-kr w-full text-4xl pt-6 text-zinc-700 text-left">
            온전히 확인할 수 있는
          </div>
          <div className="font-sans-kr w-full text-4xl pt-6 text-zinc-700 text-left">
            그런 조명
          </div>
        </div>
        <div className="w-6/12 flex justify-center items-center">
          <img alt="" src={'/assets/mood/AdobeStock_339871569.jpeg'}></img>
        </div>
      </section>
      <section
        style={{ height: '600px' }}
        className="bg-white flex justify-center items-center max-w-5xl mx-auto"
      >
        <div className="w-6/12 flex justify-center items-center">
          <img alt="" src={'/assets/mood/AdobeStock_339871569.jpeg'}></img>
        </div>
        <div className="w-6/12 flex flex-col justify-center items-center">
          <div className="font-sans-kr w-full text-4xl pt-6 text-zinc-700 text-right">
            새로운 느낌을 느껴보세요
          </div>
          <div className="font-sans-kr w-full text-4xl pt-6 text-zinc-700 text-right">
            온전히 확인할 수 있는
          </div>
          <div className="font-sans-kr w-full text-4xl pt-6 text-zinc-700 text-right">
            그런 조명
          </div>
        </div>
      </section>
      <section
        style={{ height: '600px' }}
        className="bg-white flex justify-center items-center max-w-5xl mx-auto"
      >
        <div className="w-6/12 flex flex-col justify-center items-center">
          <div className="font-sans-kr w-full text-4xl pt-6 text-zinc-700 text-left">
            나만의 특별함을 느껴보세요
          </div>
          <div className="font-sans-kr w-full text-4xl pt-6 text-zinc-700 text-left">
            온전히 확인할 수 있는
          </div>
          <div className="font-sans-kr w-full text-4xl pt-6 text-zinc-700 text-left">
            그런 조명
          </div>
        </div>
        <div className="w-6/12 flex justify-center items-center">
          <img alt="" src={'/assets/mood/AdobeStock_339871569.jpeg'}></img>
        </div>
      </section>
    </div>
  )
}
