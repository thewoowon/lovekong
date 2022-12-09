import Card from '@components/Card'
import MainCommentItem from '@components/MainCommentItem'
import { mainComment } from 'constants/goods'
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
        <meta
          property="og:image"
          content="https://imagedelivery.net/6qzLODAqs2g1LZbVYqtuQw/bb63b50a-7d84-464c-249a-9da9aa993900/public"
        />
      </Head>
      <section
        style={{ height: '800px' }}
        className="relative pb-36 overflow-hidden"
      >
        <div className="flex flex-col justify-center items-center h-full">
          <img
            alt=""
            src="/assets/gif/AdobeStock_348993411_AdobeExpress.gif"
            className="absolute top-0 left-0 w-full h-full object-fill"
          ></img>
          {/* <video
          autoPlay
          muted
          loop
          style={{ opacity: 1}}
          className="absolute top-0 left-0 w-full h-full object-fill"
        >
          <source src="/assets/video/AdobeStock_348993411_AdobeExpress.mp4" />
        </video> */}
          {/* <div className="grid grid-flow-col grid-rows-2 grid-cols-3 gap-8">
            <div style={{"borderLeft":"100px solid transparent"}} className="transform scale-110 -rotate-6 -translate-y-10 w-24 h-36 bg-green-200 rounded-md hover:bg-green-300 transition duration-300 ease-in-out hover:scale-125 hover:shadow-lg"></div>
            <div className="row-start-1 rotate-6 col-start-2 col-span-2 transform translate-x-20 -translate-y-12 bg-purple-200 rounded-md hover:bg-purple-300 transition duration-300 ease-in-out hover:scale-110 hover:shadow-lg"></div>

            <div className="transform scale-125 -rotate-3 -translate-x-10 translate-y-2 bg-rose-200 rounded-md hover:bg-rose-300 transition duration-300 ease-in-out hover:scale-150 hover:shadow-lg"></div>
            <div className="transform translate-y-24 bg-blue-200 rounded-md hover:bg-blue-300 transition duration-300 ease-in-out hover:scale-110 hover:shadow-lg"></div>
            <div className="col-start-3 transform scale-75 rotate-6 translate-x-2 -translate-y-8 bg-yellow-200 rounded-md hover:bg-yellow-300 transition duration-300 ease-in-out hover:scale-100 hover:shadow-lg"></div>
          </div> */}

          <div className="flex flex-col justify-center items-center z-10">
            <div
              className="relative text-black lg:text-[80px] md:text-[70px] sm:text-[60px] xs:text-[45px] xss:text-[35px]"
              style={{ fontFamily: 'Kashie-Mercy' }}
            >
              LoveKong Stained Glass
            </div>
            <div className="text-black font-light relative lg:text-[35px] md:text-[30px] sm:text-[25px] xs:text-[20px] xss:text-[20px] font-sans-kr text-zinc-700 pb-2">
              러브콩 스테인드 글라스
            </div>
            <div className="relative lg:text-[20px] md:text-[18px] sm:text-[16px] xs:text-[14px] xss:text-[12px] font-sans-kr text-zinc-500">
              Since 2020
            </div>
          </div>
        </div>
      </section>
      {/* <section className="culture video-section">
        <video autoPlay muted loop style={{ "width": '100%',"height":"100%" }}>
          <source src="/videos/main_video.mp4"/>
        </video>
        <div className="video-div">
          <p className="video-p-1">함께 만들어 가는 유비케어</p>
          <p className="video-p-2">임직원이 행복한 유비케어</p>
        </div>
      </section> */}
      <section style={{ height: '900px' }} className="relative overflow-hidden">
        {/* <img style={{"opacity":0.2}}  src="/assets/gif/AdobeStock_444088961_AdobeExpress.gif" alt=''></img> */}
        <div className="video-div">
          <div
            className="lg:w-[600px] md:w-[500px] sm:w-[360px] w-[360px]  bg-white rounded-md shadow-md"
            style={{ height: '600px' }}
          ></div>
        </div>
      </section>
      <section className="bg-zinc-50 flex flex-col justify-center items-center py-20">
        <div className="font-sans-kr lg:text-3xl md:text-2xl sm:text-lg text-lg pb-20">
          러브콩의 아이덴티티를 만나보세요.
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-8">
          <Card image="/assets/mainCategory/light.jpeg" title={'Light'}></Card>
          <Card image="/assets/mainCategory/tray.jpeg" title={'Case'}></Card>
          <Card image="/assets/mainCategory/tray.jpeg" title={'Vase'}></Card>
          <Card image="/assets/mainCategory/tray.jpeg" title={'Tray'}></Card>
          <Card
            image="/assets/mainCategory/accesory.jpeg"
            title={'Accesory'}
          ></Card>
          <Card image="/assets/mainCategory/etc.jpeg" title={'Others'}></Card>
        </div>
      </section>
      <section className="bg-white flex flex-col justify-center items-center py-20">
        <div className="font-sans-kr lg:text-3xl md:text-2xl sm:text-lg text-lg pb-20">
          고객님들의 후기를 들어보세요.
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-8">
          {mainComment.map((comment) => {
            return (
              <MainCommentItem
                key={comment.userId}
                comment={comment}
              ></MainCommentItem>
            )
          })}
        </div>
      </section>
      {/* <section
        style={{ height: '600px' }}
        className="bg-white flex justify-center items-center max-w-5xl mx-auto"
      >
        <div className="w-6/12 flex flex-col justify-center items-center">
          <div className="font-sans-kr w-full text-4xl pt-6 text-zinc-700 text-left">
            오묘한 빛과 색의 조화를
          </div>
          <div className="font-sans-kr w-full text-4xl pt-6 text-zinc-700 text-left">
            확인할 수 있는
          </div>
          <div className="font-sans-kr w-full text-4xl pt-6 text-zinc-700 text-left">
            아름다운 조명
          </div>
        </div>
        <div className="w-6/12 flex justify-center items-center ">
          <img alt="" src={'/assets/light/light1.jpeg'}></img>
        </div>
      </section>
      <section
        style={{ height: '600px' }}
        className="bg-white flex justify-center items-center max-w-5xl mx-auto"
      >
        <div className="w-6/12 flex justify-center items-center">
          <img alt="" src={'/assets/light/light2.jpeg'}></img>
        </div>
        <div className="w-6/12 flex flex-col justify-center items-center">
          <div className="font-sans-kr w-full text-4xl pt-6 text-zinc-700 text-right">
            당신의 소중한 것을 담아주세요
          </div>
          <div className="font-sans-kr w-full text-4xl pt-6 text-zinc-700 text-right">
            추억도, 사랑도, 행복도
          </div>
          <div className="font-sans-kr w-full text-4xl pt-6 text-zinc-700 text-right">
            여기에
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
            주변을 감싸는 닫힌 공간에
          </div>
          <div className="font-sans-kr w-full text-4xl pt-6 text-zinc-700 text-left">
            담아주세요
          </div>
        </div>
        <div className="w-6/12 flex justify-center items-center">
          <img alt="" src={'/assets/light/light3.jpeg'}></img>
        </div>
      </section>
      <section
        style={{ height: '600px' }}
        className="bg-white flex justify-center items-center max-w-5xl mx-auto"
      >
        <div className="w-6/12 flex justify-center items-center">
          <img alt="" src={'/assets/light/light5.jpeg'}></img>
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
          <img alt="" src={'/assets/light/light6.jpeg'}></img>
        </div>
      </section> */}
    </div>
  )
}
