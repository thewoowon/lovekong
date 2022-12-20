import Card from '@components/Card'
import MainCommentItem from '@components/MainCommentItem'
import VideoWatcher from '@components/VideoWatcher'
import styled from '@emotion/styled'
import { Button } from '@mantine/core'
import { Products } from '@prisma/client'
import { IconHeart, IconStar } from '@tabler/icons'
import { mainComment } from 'constants/goods'
import useScrollFadeIn from 'hooks/useScrollFadeIn'
import useScrollFadeInImage from 'hooks/useScrollFadeInImage'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'

const TAKE = 8
export default function Home() {
  const animatedItem_main_1 = useScrollFadeIn()
  const animatedItem_main_2 = useScrollFadeIn()
  const animatedItem_main_3 = useScrollFadeIn()
  const animatedItem_main_4 = useScrollFadeIn()
  const animatedItem_main_5 = useScrollFadeIn()
  const animatedItem_main_6 = useScrollFadeIn()
  const animatedItem_main_7 = useScrollFadeIn()
  const animatedItem_main_8 = useScrollFadeIn()
  const animatedItem_main_9 = useScrollFadeIn()
  const animatedItem_main_10 = useScrollFadeIn()
  const animatedItem_main_11 = useScrollFadeIn()
  const animatedItem_main_12 = useScrollFadeIn()
  const animatedItem_main_13 = useScrollFadeIn()
  const animatedItem_main_14 = useScrollFadeIn()
  const animatedItem_main_15 = useScrollFadeIn()
  const animatedItem_main_16 = useScrollFadeIn()
  const animatedItem_main_17 = useScrollFadeIn()
  const animatedItem_main_18 = useScrollFadeIn()
  const animatedItem_main_19 = useScrollFadeIn()
  const animatedItem_main_20 = useScrollFadeIn()
  const animatedItem_main_21 = useScrollFadeIn()
  const animatedItem_main_22 = useScrollFadeIn()
  const animatedItem_main_image_1 = useScrollFadeInImage()
  const animatedItem_main_image_2 = useScrollFadeInImage()
  const animatedItem_main_image_3 = useScrollFadeInImage()
  const animatedItem_main_image_4 = useScrollFadeInImage()
  const animatedItem_main_image_5 = useScrollFadeInImage()
  const animatedItem_main_image_6 = useScrollFadeInImage()
  const router = useRouter()
  const [skip, setSkip] = useState(0)
  const [products, setProducts] = useState<Products[]>([])
  useEffect(() => {
    fetch(`/api/get-products?skip=0&take=${TAKE}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.items))
  }, [])

  const getProducts = useCallback(() => {
    const next = skip + TAKE
    fetch(`/api/get-products?skip=${next}&take=${TAKE}`)
      .then((res) => res.json())
      .then((data) => {
        const list = products.concat(data.items)
        setProducts(list)
      })
    setSkip(next)
  }, [skip, products])
  return (
    <div className="scroll-smooth">
      <Head>
        <title>LoveKong</title>
        <meta name="description" content="LoveKong Stained Glass" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="아이 러브콩 - I LoveKong" />
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
          <div className="grid grid-flow-col grid-rows-2 grid-cols-3 gap-8 absolute">
            <div
              style={{ borderLeft: '100px solid transparent' }}
              className="transform scale-110 -rotate-6 -translate-y-10 w-24 h-36 bg-green-200 rounded-md hover:bg-green-300 transition duration-300 ease-in-out hover:scale-125 hover:shadow-lg"
            ></div>
            <div className="row-start-1 rotate-6 col-start-2 col-span-2 transform translate-x-20 -translate-y-12 bg-purple-200 rounded-md hover:bg-purple-300 transition duration-300 ease-in-out hover:scale-110 hover:shadow-lg"></div>

            <div className="transform scale-125 -rotate-3 -translate-x-10 translate-y-2 bg-rose-200 rounded-md hover:bg-rose-300 transition duration-300 ease-in-out hover:scale-150 hover:shadow-lg"></div>
            <div className="transform translate-y-24 bg-blue-200 rounded-md hover:bg-blue-300 transition duration-300 ease-in-out hover:scale-110 hover:shadow-lg"></div>
            <div className="col-start-3 transform scale-75 rotate-6 translate-x-2 -translate-y-8 bg-yellow-200 rounded-md hover:bg-yellow-300 transition duration-300 ease-in-out hover:scale-100 hover:shadow-lg"></div>
          </div>

          <div className="flex flex-col justify-center items-center z-10">
            <div
              className="relative text-black lg:text-[44px] md:text-[32px] sm:text-[24px] xs:text-[20px] xss:text-[18px]"
              style={{ fontFamily: 'Kashie-Mercy' }}
            >
              Beautiful Color Waves
            </div>
            <div
              className="relative text-black lg:text-[90px] md:text-[70px] sm:text-[50px] xs:text-[45px] xss:text-[35px]"
              style={{ fontFamily: 'Kashie-Mercy' }}
            >
              LoveKong Stained Glass
            </div>
            <div className="relative lg:text-[31px] md:text-[26px] sm:text-[21px] xs:text-[18px] xss:text-[16px] font-sans-kr-bold pb-2">
              러브콩 스테인드 글라스
              {/* 러<span className='text-orange-400'>브</span><span className='text-yellow-400'>콩</span><span className='text-green-400'> 스</span><span className='text-blue-400'>테</span><span className='text-blue-800'>인</span><span className='text-purple-400'>드 </span><span className='text-red-400'>글</span><span className='text-orange-400'>라</span><span className='text-yellow-400'>스</span> */}
            </div>
            <div className="relative lg:text-[20px] md:text-[18px] sm:text-[16px] xs:text-[14px] xss:text-[12px] font-sans-kr-bold text-zinc-500">
              Since 2021
            </div>
          </div>
        </div>
      </section>
      <section
        style={{ height: '600px' }}
        className="flex flex-col justify-center items-center py-20"
      >
        <div
          {...animatedItem_main_1}
          className="font-sans-kr-bold lg:text-5xl md:text-4xl sm:text-3xl text-2xl"
        >
          I LoveKong
        </div>
        {/* <div style={{"maxWidth":"500px"}} className="flex justify-center items-center">
          <Image
            width={700}
            height={850}
            src="/assets/lotus/lotus-main.jpeg"
            alt=""
          ></Image>
        </div> */}
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
      <section>
        <VideoWatcher></VideoWatcher>
      </section>
      <section
        style={{ height: '500px' }}
        className="flex flex-col justify-center items-center"
      >
        <div
          {...animatedItem_main_2}
          className="font-sans-kr-bold lg:text-5xl md:text-4xl sm:text-3xl text-2xl"
        >
          LoveKong Top Seller
        </div>
        <div
          {...animatedItem_main_3}
          className="text-blue-500 font-sans-kr-bold lg:text-3xl md:text-2xl sm:text-xl text-lg py-10"
        >
          로투스 홀더
        </div>
        {/* <div style={{"maxWidth":"500px"}} className="flex justify-center items-center">
          <Image
            width={700}
            height={850}
            src="/assets/lotus/lotus-main.jpeg"
            alt=""
          ></Image>
        </div> */}
      </section>
      <section className="py-10 relative">
        <div className="flex justify-center flex-wrap w-full h-full">
          <div
            {...animatedItem_main_image_1}
            className="overflow-hidden flex flex-col justify-center items-center"
          >
            <Image
              width={620}
              height={413}
              style={{ minWidth: '360px', maxWidth: '620px' }}
              className="pb-3"
              src="/assets/lotus/left-lotus-2.jpeg"
              alt="lotus left 2"
            ></Image>
            <Image
              width={620}
              height={413}
              style={{ minWidth: '360px', maxWidth: '620px' }}
              src="/assets/lotus/left-lotus-1.jpeg"
              alt="lotus left 1"
            ></Image>
            {/* <img style={{ "minWidth": "360px", "maxWidth": "520px" }} className="pr-3 pb-3" src="/assets/lotus/left-lotus-1.jpeg" alt="lotus left 1"></img>
            <img style={{ "minWidth": "360px", "maxWidth": "520px" }} className="pr-3 pb-3" src="/assets/lotus/left-lotus-2.jpeg" alt="lotus left 2"></img> */}
            <div
              style={{ minWidth: '360px', maxWidth: '620px' }}
              className="text-lg text-end p-1 w-full"
            >
              2021 LoveKong Collection
            </div>
          </div>
          <div
            {...animatedItem_main_image_2}
            className="overflow-hidden flex flex-col justify-end items-center"
          >
            <div
              {...animatedItem_main_4}
              style={{ minWidth: '360px', maxWidth: '620px' }}
              className="w-full p-3 text-end font-sans-kr-bold lg:text-lg  text-md"
            >
              연꽃을 닮은 스테인드글라스 캔들 홀더 입니다.<br></br>
              티라이트 캔들 홀더로 제작 되었지만,<br></br>
              인센스 스틱 홀더, 악세사리를 담는 등 다양하게 활용할 수 있어요.
              <br></br>
              어디에서도 볼 수 없는 러브콩만의 독특한 디자인으로, <br></br>
              특별한 오브제가 되어줄거예요!
            </div>
            <Image
              width={620}
              height={800}
              style={{ minWidth: '360px', maxWidth: '620px' }}
              className="pl-3"
              src="/assets/lotus/right-lotus-1.jpeg"
              alt="lotus right 1"
            ></Image>
            {/* <img style={{ "minWidth": "360px", "maxWidth": "520px" }} className="p-3" src="/assets/lotus/right-lotus-1.jpeg" alt="lotus right 1"></img> */}
          </div>
        </div>
      </section>
      {/* <section>
        <Form {...animatedItem} className='bg-blue-500 p-10 text-5xl'>
          hell
        </Form>
      </section> */}
      <section className="py-10 relative">
        <div className="flex justify-center flex-wrap h-full">
          <div
            {...animatedItem_main_image_3}
            className="overflow-hidden flex justify-center items-center pt-10 pb-5"
          >
            <Image
              width={1280}
              height={600}
              style={{ minWidth: '360px', maxWidth: '1280px' }}
              src="/assets/lotus/lotus.jpeg"
              alt=""
            ></Image>
            {/* <img style={{ "minWidth": "360px", "maxWidth": "820px" }} src="/assets/lotus/lotus.jpeg" alt=""></img> */}
          </div>
        </div>
      </section>
      <section className="bg-white flex flex-col justify-center items-center py-20 relative">
        <div
          {...animatedItem_main_5}
          className="font-sans-kr-bold lg:text-4xl md:text-3xl sm:text-2xl text-xl pb-36"
        >
          고객님들의 실제 후기
        </div>
        <div
          {...animatedItem_main_image_4}
          className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-8"
        >
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
      <section style={{ height: '500px' }} className="bg-blue-300">
        <div className="flex flex-col justify-center items-center h-full">
          <div
            {...animatedItem_main_6}
            className="text-center font-sans-kr-bold lg:text-4xl md:text-3xl sm:text-2xl text-xl py-6"
          >
            러브콩의 로투스 홀더를 지금 바로 만나보세요!
          </div>
          <div
            {...animatedItem_main_7}
            className="flex justify-center items-center my-4"
          >
            <button
              onClick={() => {
                router.push('/products')
              }}
              className="text-2xl px-10 py-5 bg-blue-500 text-white rounded-md animate-bounce hover:bg-blue-600 transition duration-200 ease-in-out"
            >
              로투스 홀더 바로 구매하기
            </button>
          </div>
        </div>
      </section>
      <section className="bg-white flex flex-col justify-center items-center py-36">
        <div
          {...animatedItem_main_8}
          className="text-center font-sans-kr-bold lg:text-4xl md:text-3xl sm:text-2xl text-xl pb-36"
        >
          러브콩 스테인드 글라스 판매제품
        </div>
        <div className="flex flex-col justify-center items-center">
          <div
            {...animatedItem_main_image_5}
            className="grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-5"
            style={{ minWidth: '360px', maxWidth: '1020px' }}
          >
            {products &&
              products.map((product) => {
                return (
                  <div
                    key={product.id}
                    className="hover:opacity-95 hover:bg-zinc-50 cursor-pointer rounded-md p-3 transition ease-in-out duration-200"
                    onClick={() => {
                      router.push(`/products/${product.id}`)
                    }}
                  >
                    <Image
                      className="rounded-sm"
                      src={product.image_url ?? ''}
                      alt={product.name}
                      width={500}
                      height={500}
                      placeholder="blur"
                      blurDataURL={
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMUFROtBwABSQDB93Z92QAAAABJRU5ErkJggg=='
                      }
                    ></Image>
                    <div className="flex pt-4 pb-1">
                      <span
                        style={{ fontFamily: 'Kashie-Mercy' }}
                        className="text-md"
                      >
                        LoveKong
                      </span>
                    </div>
                    <div className="flex py-1">
                      <span className="font-sans-kr text-md">
                        {product.name}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="font-semibold text-lg">
                        <span className="text-red-400">10% </span>
                        <span className="line-through text-zinc-500">
                          {product.price.toLocaleString('ko-KR')}
                        </span>
                        <span className="px-2">
                          {(product.price * 0.9).toLocaleString('ko-KR')}
                        </span>
                      </span>
                    </div>
                    <div>
                      <span className="text-xs px-2 py-1 bg-blue-200 rounded-sm">
                        오픈할인
                      </span>
                    </div>
                    <div className="flex justify-start items-center pt-5">
                      <div className="flex mr-6">
                        <IconHeart color="gray" stroke={1.5}></IconHeart>
                        <span className="px-1">{0}</span>
                      </div>
                      <div className="flex">
                        <IconStar color="gray" stroke={1.5}></IconStar>
                        <span className="px-1">{0}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
          <button
            className="text-2xl my-20 px-10 py-5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 ease-in-out"
            onClick={getProducts}
          >
            더보기
          </button>
        </div>
      </section>
      <section className="bg-zinc-50 flex flex-col justify-center items-center py-36">
        <div
          {...animatedItem_main_9}
          className="font-sans-kr-bold lg:text-4xl md:text-3xl sm:text-2xl text-xl pb-36"
        >
          러브콩의 인스타 엿보기
        </div>
        <div
          {...animatedItem_main_image_6}
          className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-8"
        >
          <Card
            comment1Id={'viz_zle_yunn'}
            comment1={'로투스 제품은 진짜 저의 최애 캔들 홀더 입니다….🥂🤍'}
            comment2Id={'soopool_room'}
            comment2={
              '로투스홀더✨ 은은하게 불빛이 일렁이는게 제마음도 일렁일렁😊🤍'
            }
            image="/assets/mainCategory/main-1.jpeg"
            title={'Light'}
            content={`주말에도 럽콩 유리공장 open🚪|
               로투스홀더는 낮에도 예쁘지만|
               특히! 밤에 더 예뻐요✨|
               오랜만에 모아두니 너무 예뿐걸?|
               낮엔 홈카페, 밤엔 와인바느낌으로...🥂❤️‍🔥 |
               모든 유리제품 문의는 디엠 또는 |
               카톡 lovekong_glass로 문의 주세요😉`}
            tag={'#러브콩 #러브콩스테인드글라스 #스테인드글라스'}
          ></Card>
          <Card
            comment1Id={'ru_mi2'}
            comment1={`😍영롱영롱 너무이쁘다요`}
            comment2Id={'milky.haus_'}
            comment2={`어머 럽콩님 작품 너무 보러가고싶어영😍❤️ 너무예뻐요!`}
            image="/assets/mainCategory/main-2.jpeg"
            title={'Case'}
            content={`하루종일 정신 없는 하루여서|
              이제야 올리는 피드..💡|
              많은 분들이 예쁘다 해주시고|
              너무 잘 만들었다고 칭찬도 많이 해주셔서|
              기분 좋고 감사한 하루였어용|
              한번에 두개 주문해가신 분도 계셨다는👍🏻💕|
              다음주 수요일까지 진행합니당🙇‍♀️|
              ~|
              ✨부산 신세계 센텀시티 지하1층(이벤트)|
              ✨22/3/24(목) ~ 22/3/30(수)|
              ✨영업시간 10:30~20:00 (금,토,일20:30)`}
            tag={'#러브콩 #러브콩스테인드글라스 #스테인드글라스'}
          ></Card>
          <Card
            comment1Id={'ur_myhone'}
            comment1={`콩님 멋져요!!! 취미로 하실 때부터 지켜보며 와 이 재능은 나눠야 할 것이다, 생각했는데 역시나💐💐💐`}
            comment2Id={'slow.h0use'}
            comment2={`이렇게 보니 또 색다른 느낌 같아요😍준비하시느라 정말 고생 많으셨어요👏앞으로도 예쁜 작품 부탁뜨려요~❤️💗`}
            image="/assets/mainCategory/main-3.jpeg"
            title={'Vase'}
            content={`✨캠핑 & 피크닉 페어|
              ✨3/10(목) ~ 3/13(일) 까지|
              ✨일산 킨텍스 제2전시장 7,8홀|
              ✨부스 A105 (폴라리스)|
              ~|
              이번 전시참여로 처음 선보이는|
              골제로 쉐이드, 캠들리에 쉐이드도 있어용!|
              베스트셀러 로투스홀더도 잔뜩 있답니다😊|
              놀러오세효💓 `}
            tag={'#러브콩 #러브콩스테인드글라스 #스테인드글라스'}
          ></Card>
          <Card
            comment1Id={'eu_nee__'}
            comment1={'진짜 영롱하다는 말밖에 안나오네요너❤️ 넘 이뻐요😍'}
            comment2Id={'fiume_____'}
            comment2={'와 대박… 진짜 멋져요ㅠㅠㅠ🤍🤍'}
            image="/assets/mainCategory/main-4.jpeg"
            title={'Tray'}
            content={`러브콩 스테인드글라스 전시 안내|
              4/19(화)-4/24(일)|
              더현대서울 지하1층 대행사장✨`}
            tag={
              '#디어마이 #룸토피아 #디어마이더현대 #더현대 #더현대서울 #Dearmy #러브콩 #러브콩스테인드글라스 #스테인드글라스'
            }
          ></Card>
          <Card
            comment1Id={'neuil.o'}
            comment1={`와 그냥 봐도 너무너무 이뻐요😍😍😍 멀어서 못놀러가는게 넘나 아쉽습니다🥲`}
            comment2Id={'seul__official'}
            comment2={`오옷 !! 분위기 모예요 😍❤️❤️ 가고싶따아ㅏㅏㅏㅏ`}
            image="/assets/mainCategory/main-5.jpeg"
            title={'Accesory'}
            content={`2022.12.10-12.11|
            진주 카페AAM에서|
            크리스마스 마켓이 열립니다🎄♥️|
            
            유리제품뿐만 아니라|
            러브콩 빈티지 소장품들도 판매해요😄|
            너무 갑자기 참여하게 되서|
            제대로 공지를 못 올렸네요!|
            진주분들 많이 놀러 오세요~!🧚🏻‍♀️ `}
            tag={'#러브콩 #러브콩스테인드글라스 #스테인드글라스 #진주aam'}
          ></Card>
          <Card
            comment1Id={'intip_interiortip'}
            comment1={`다양한 제품이 있네용>_<!! 진짜 하나하나 다 너무 예뻐욧!!😍😍`}
            comment2Id={'by_a.ri'}
            comment2={`햇살받으니 더 예쁜걸요 😍 무리하지 마시고 화이팅이예요 ❤️`}
            image="/assets/mainCategory/main-6.jpeg"
            title={'Others'}
            content={`해들어올때 모아놓고 한컷📸|
            초록이들 옆에 두니까 더 예뻐보이는 매직🪄|

            모든 유리제품 문의는 디엠 또는|
            카톡 lovekong_glass로 문의 주세요😉`}
            tag={'#러브콩 #러브콩스테인드글라스 #스테인드글라스'}
          ></Card>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center py-36">
        <div
          {...animatedItem_main_11}
          className="text-center font-sans-kr-bold lg:text-4xl md:text-3xl sm:text-2xl text-xl py-10"
        >
          배송 및 반품/교환 안내
        </div>
        <div
          {...animatedItem_main_12}
          className="py-1 lg:text-2xl md:text-xl sm:text-lg text-md "
        >
          러브콩의 모든 제품은 수작업으로 진행됩니다.
        </div>
        <div
          {...animatedItem_main_13}
          className="py-1 lg:text-2xl md:text-xl sm:text-lg text-md "
        >
          핸드메이드 특성상 모양이 조금씩 다를 수 있고
        </div>
        <div
          {...animatedItem_main_14}
          className="py-1 lg:text-2xl md:text-xl sm:text-lg text-md "
        >
          유리 특성상 같은 유리로 만들어도 조금씩 다르게 보일 수 있다는 점 양해
          바랍니다.
        </div>
        <div
          {...animatedItem_main_15}
          className="py-1 lg:text-2xl md:text-xl sm:text-lg text-md "
        >
          제작기간은 7~14일 소요됩니다.
        </div>
        <div
          {...animatedItem_main_16}
          className="py-1 lg:text-2xl md:text-xl sm:text-lg text-md "
        >
          {'주문 기간은 넉넉하게 생각하고 주문해주세요 :)'}
        </div>
        <div
          {...animatedItem_main_17}
          className="py-1 lg:text-2xl md:text-xl sm:text-lg text-md "
        >
          구매자 단순 변심 반품/교환 요청은 불가합니다.
        </div>
        <div
          {...animatedItem_main_18}
          className="py-1 lg:text-2xl md:text-xl sm:text-lg text-md "
        >
          주문과 동시에 유리주문이 이루어지기 때문에 주문 취소가 어렵습니다.
          신중한 구매 부탁드립니다.
        </div>
        <div
          {...animatedItem_main_19}
          className="py-1 lg:text-2xl md:text-xl sm:text-lg text-md "
        >
          납땜 작업 특성상 굴곡이 생길 수 있지만 자연스러운 현상이니 환불의
          사유가 되지 않습니다.
        </div>
        <div
          {...animatedItem_main_20}
          className="py-1 lg:text-2xl md:text-xl sm:text-lg text-md "
        >
          {'기타 문의는 홈페이지 게시판을 이용해 주세요 :)'}
        </div>
      </section>
      <section className="flex flex-col justify-center items-center py-36">
        <div
          {...animatedItem_main_21}
          className="text-center font-sans-kr-bold lg:text-4xl md:text-4xl sm:text-2xl text-xl py-6"
        >
          이메일 주소
        </div>
        <div
          {...animatedItem_main_22}
          className="py-5 lg:text-3xl md:text-2xl sm:text-xl text-md "
        >
          smj091@nate.com
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
`

const Title = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
`

const SubTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
`

const Description = styled.div`
  font-size: 1rem;
  color: #333;
  margin-bottom: 1rem;
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  opacity: 0.5;
`
