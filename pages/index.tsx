import Card from '@components/Card'
import MainCommentItem from '@components/MainCommentItem'
import VideoWatcher from '@components/VideoWatcher'
import styled from '@emotion/styled'
import { Button } from '@mantine/core'
import { Products } from '@prisma/client'
import { IconHeart, IconStar } from '@tabler/icons'
import { instagramItem, mainComment } from 'constants/goods'
import useScrollFadeIn from 'hooks/useScrollFadeIn'
import useScrollFadeInImage from 'hooks/useScrollFadeInImage'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import Modal from 'react-modal'

const TAKE = 8
export default function Home() {
  const [windowSize, setWindowSize] = useState<number>()

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
  const [instaId, setInstaId] = useState<number | undefined>()
  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width: '400px',
      height: '700px',
    },
  }

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
            </div>
            <div className="relative lg:text-[20px] md:text-[18px] sm:text-[16px] xs:text-[14px] xss:text-[12px] font-sans-kr-bold text-zinc-500">
              Since 2021
            </div>
          </div>
        </div>
      </section>
      <section>
        <VideoWatcher></VideoWatcher>
      </section>
      <section
        style={{ height: '500px' }}
        className="flex flex-col justify-center items-center"
      >
        <div
          {...animatedItem_main_2}
          className="font-sans-kr-bold lg:text-6xl md:text-5xl sm:text-4xl text-3xl"
        >
          LoveKong Top Seller
        </div>
        <div
          {...animatedItem_main_3}
          className="text-blue-500 font-sans-kr-bold lg:text-4xl md:text-3xl sm:text-2xl text-xl py-10"
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
              style={{ minWidth: '360px', maxWidth: '600px' }}
              className="pb-3"
              src="/assets/lotus/left-lotus-2.jpeg"
              alt="lotus left 2"
            ></Image>
            <Image
              width={620}
              height={413}
              style={{ minWidth: '360px', maxWidth: '600px' }}
              src="/assets/lotus/left-lotus-1.jpeg"
              alt="lotus left 1"
            ></Image>
            {/* <img style={{ "minWidth": "360px", "maxWidth": "520px" }} className="pr-3 pb-3" src="/assets/lotus/left-lotus-1.jpeg" alt="lotus left 1"></img>
            <img style={{ "minWidth": "360px", "maxWidth": "520px" }} className="pr-3 pb-3" src="/assets/lotus/left-lotus-2.jpeg" alt="lotus left 2"></img> */}
            <div
              style={{ minWidth: '360px', maxWidth: '600px' }}
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
              style={{ minWidth: '360px', maxWidth: '560px' }}
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
              style={{ minWidth: '360px', maxWidth: '560px' }}
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
              style={{ minWidth: '360px', maxWidth: '1160px' }}
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
          className="font-sans-kr-bold lg:text-5xl md:text-4xl sm:text-3xl text-2xl pb-36"
        >
          고객님들의 실제 후기
        </div>
        <div
          {...animatedItem_main_image_4}
          className="grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 gap-4"
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
            className="text-center font-sans-kr-bold lg:text-5xl md:text-4xl sm:text-2xl text-xl py-6"
          >
            러브콩의 로투스 홀더를 지금 바로 만나보세요!
          </div>
          <div
            {...animatedItem_main_7}
            className="flex justify-center items-center my-4"
          >
            <button
              onClick={() => {
                router.push('/products/13')
              }}
              className="lg:text-3xl md:text-2xl sm:text-xl text-lg px-10 py-5 bg-blue-500 text-white rounded-md animate-bounce hover:bg-blue-600 transition duration-200 ease-in-out"
            >
              로투스 홀더 바로 구매하기
            </button>
          </div>
        </div>
      </section>
      <section className="bg-white flex flex-col justify-center items-center py-36">
        <div
          {...animatedItem_main_8}
          className="text-center font-sans-kr-bold lg:text-5xl md:text-4xl sm:text-2xl text-xl pb-36"
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
          className="font-sans-kr-bold flex flex-col items-center lg:text-5xl md:text-4xl sm:text-3xl text-2xl pb-36"
        >
          러브콩의 인스타 엿보기<br></br>
          <span className="py-3 font-sans-kr-bold lg:text-3xl md:text-2xl sm:text-xl text-lg">
            사진을 클릭해보세요!
          </span>
        </div>
        <div
          {...animatedItem_main_image_6}
          className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4"
        >
          {new Array(12).fill(0).map((_, index) => {
            return (
              <div key={index}>
                <Image
                  onClick={() => {
                    openModal()
                    setInstaId(index)
                  }}
                  height={500}
                  width={500}
                  className="w-full w-72 rounded-md"
                  src={`/assets/mainCategory/main-${index + 1}.jpeg`}
                  alt="Sunset in the mountains"
                ></Image>
              </div>
            )
          })}
          <Modal isOpen={modalIsOpen} style={customStyles} ariaHideApp={true}>
            <div className="w-full h-full flex flex-col justify-center items-center overflow-scroll">
              {instagramItem
                .filter((item) => item.id === instaId)
                .map((feed) => {
                  return (
                    <Card
                      key={feed.id}
                      comment1Id={feed.comment1Id}
                      comment1={feed.comment1}
                      comment2Id={feed.comment2Id}
                      comment2={feed.comment2}
                      image={feed.image}
                      title={feed.title}
                      content={feed.content}
                      tag={feed.tag}
                    ></Card>
                  )
                })}
              <button
                onClick={() => {
                  closeModal()
                }}
                className="bg-blue-500 px-6 py-1 my-2 text-lg font-bold text-white rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out"
              >
                닫기
              </button>
            </div>
          </Modal>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center py-36">
        <div
          {...animatedItem_main_11}
          className="text-center font-sans-kr-bold lg:text-5xl md:text-4xl sm:text-3xl text-2xl py-10"
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
          className="text-center font-sans-kr-bold lg:text-5xl md:text-4xl sm:text-3xl text-2xl py-6"
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
    </div>
  )
}

function getWindowSize() {
  const { innerWidth, innerHeight } = window
  return { innerWidth, innerHeight }
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
