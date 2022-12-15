import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Categories, Products, Carts, OrderItems } from '@prisma/client'
import { useEffect, useMemo, useState } from 'react'
import { ORDER_QUERY_KEY } from 'pages/my'
import {
  IconBox,
  IconCoin,
  IconEqual,
  IconHeart,
  IconHighlight,
  IconMinus,
  IconPlus,
  IconRefresh,
  IconStar,
  IconX,
} from '@tabler/icons'
import { Button, Loader } from '@mantine/core'
import { CATEGORY_MAP } from 'constants/goods'
import { CountControl } from '@components/CountControl'
import styled from '@emotion/styled'
import Script from 'next/script'
import { format } from 'date-fns'

interface ICartItem extends Carts {
  name: string
  price: number
  image_url: string
}

export const CART_QUERY_KEY = `api/get-cart`

export default function Cart() {
  const queryClient = useQueryClient()
  const { data: session } = useSession()
  const router = useRouter()

  const { data } = useQuery<{ items: ICartItem[] }, unknown, ICartItem[]>(
    [CART_QUERY_KEY],
    () =>
      fetch(CART_QUERY_KEY)
        .then((res) => res.json())
        .then((data) => data.items)
  )

  const deliveryAmount = data && data.length > 0 ? 3000 : 0
  const discountAmount = 0

  const amount = useMemo(() => {
    if (data == null) {
      return 0
    }
    return data
      .map((item) => item.amount)
      .reduce((prev, curr) => prev + curr, 0)
  }, [data])

  const { mutate: addOrder } = useMutation<
    unknown,
    unknown,
    Omit<OrderItems, 'id' | 'createdAt'>[],
    any
  >(
    (items) =>
      fetch(`/api/add-order`, {
        method: 'POST',
        body: JSON.stringify({ items }),
      })
        .then((res) => res.json())
        .then((data) => data.items),
    {
      onMutate: () => {
        queryClient.invalidateQueries([ORDER_QUERY_KEY])
      },
      onSuccess: () => {
        alert('주문화면으로 이동합니다.')
        router.push('/my')
        return
      },
    }
  )

  const handleOrder = () => {
    // TODO: 주문하기 구현
    if (data == null) {
      return
    }
    addOrder(
      data.map((cart) => ({
        productId: cart.productId,
        amount: cart.amount,
        price: cart.price,
        quantity: cart.quantity,
      }))
    )
    alert('주문이 완료되었습니다.')
  }

  const { data: products } = useQuery<
    { items: Products[] },
    unknown,
    Products[]
  >(
    [`/api/get-products?skip=${0}&take=${10}`],
    () =>
      fetch(`/api/get-products?skip=${0}&take=${10}`).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  )

  return (
    <div>
      <Head>
        <title>LoveKong | Cart</title>
        <meta name="description" content="LoveKong Stained Glass" />

        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/cart`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="러브콩(LoveKong) Cart" />
        <meta
          property="og:description"
          content="러브콩의 스테인드 글라스 제품들을 만나보세요."
        />
        <meta property="og:image" content="" />
      </Head>
      {/* <Script id="naver_script">
        {`var oPay = Naver.Pay.create({
          "mode" : "production", // development or production
          "clientId": "u86j4ripEt8LRfPGzQ8" // clientId
          });

    //직접 만드신 네이버페이 결제버튼에 click Event를 할당하세요
    var elNaverPayBtn = document.getElementById("naverPayBtn");

    elNaverPayBtn.addEventListener("click", function() {
        oPay.open({
          "merchantUserKey": "가맹점 사용자 식별키",
          "merchantPayKey": "가맹점 주문 번호",
          "productName": "상품명을 입력하세요",
          "totalPayAmount": "1000",
          "taxScopeAmount": "1000",
          "taxExScopeAmount": "0",
          "returnUrl": "사용자 결제 완료 후 결제 결과를 받을 URL"
        });
    });`}
      </Script> */}
      <main className="font-sans-kr mx-auto">
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
            장바구니 ({data && data.length})
          </div>
        </div>
        <div
          className="text-xl flex justify-center py-10 bg-white"
          style={{ borderBottom: '0.5px solid rgba(200,200,200,1)' }}
        >
          <div
            className="w-full"
            style={{ maxWidth: '1080px', minWidth: '360px' }}
          >
            ✅ 일반배송
          </div>
        </div>
        <div className="flex flex-col justify-center items-center space-y-10 py-10">
          {data ? (
            data.length > 0 ? (
              data.map((value, iter) => {
                return <Items key={iter} {...value}></Items>
              })
            ) : (
              <div>장바구니가 비었어요.</div>
            )
          ) : (
            <div>Loading....</div>
          )}
        </div>
        <div
          className="xl:w-[1080px] lg:w-[900px] md:w-[700px] sm:w-[560px] xs:w-[400px] xss:w-[360px] flex flex-col py-6 px-12 space-y-4 shadow-lg rounded-md bg-white mx-auto"
          style={{ border: '0.5px solid rgba(200,200,200,1)' }}
        >
          <p className="text-xl font-semibold">주문정보</p>
          <Row>
            <p>합계 금액</p>
            <p>{amount.toLocaleString('ko-KR')} ₩</p>
          </Row>
          <Row>
            <p>배송비</p>
            <p>{deliveryAmount.toLocaleString('ko-KR')} ₩</p>
          </Row>
          <Row>
            <p>할인 금액</p>
            <p>{discountAmount.toLocaleString('ko-KR')} ₩</p>
          </Row>
          <Row>
            <p className="font-semibold">결제 금액</p>
            <p className="text-green-500 font-semibold">
              {(amount + deliveryAmount - discountAmount).toLocaleString(
                'ko-KR'
              )}{' '}
              ₩
            </p>
          </Row>
          <Button
            leftIcon={<IconCoin size={20} stroke={1.5} />}
            className={`bg-green-400 hover:bg-green-500 transition duration-200 ease-in-out`}
            onClick={() => {
              if (session == null) {
                alert('로그인이 필요합니다.')
                router.push('/auth/login')
                return
              }
              handleOrder()
            }}
          >
            결제하기
          </Button>
        </div>
        <div
          className="text-2xl flex justify-center py-10 bg-white  my-10"
          style={{ borderBottom: '0.5px solid rgba(200,200,200,1)' }}
        >
          <div style={{ width: '1080px' }}>추천 상품</div>
        </div>
        <div className="flex justify-center my-10 ">
          {products ? (
            products.length > 0 ? (
              <div
                className="grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-5 mx-auto"
                style={{ minWidth: '360px', maxWidth: '1020px' }}
              >
                {products.map((product) => {
                  return (
                    <div key={product.id} className="m-auto">
                      <div
                        className="hover:opacity-95 hover:bg-zinc-50 cursor-pointer rounded-md p-3 transition ease-in-out duration-200"
                        onClick={() => {
                          router.push(`/products/${product.id}`)
                        }}
                      >
                        <Image
                          className="rounded-sm"
                          src={product.image_url ?? ''}
                          alt={product.name}
                          width={400}
                          height={500}
                          placeholder="blur"
                          blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
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
                            {product.price.toLocaleString('ko-KR')}
                          </span>
                        </div>
                        <div>
                          <span className="bg-gray-100 p-1 font-sans-kr text-xs rounded-sm">
                            무료배송
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
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="flex justify-center m-auto items-center font-sans-kr-light h-60">
                상품 준비 중입니다.
              </div>
            )
          ) : (
            <div
              style={{ height: '400px' }}
              className="flex flex-col justify-center items-center font-sans-kr-light"
            >
              <div>
                제품 목록을 가져오는 중입니다. 다른 페이지로 이동하지 마세요.
              </div>
              <Loader variant="bars" color={'gray'} size={'lg'}></Loader>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

const Items = (props: ICartItem) => {
  const [quantity, setQuantity] = useState<number | undefined>(props.quantity)
  const [amount, setAmount] = useState<number>(props.price)
  const queryClient = useQueryClient()
  const router = useRouter()
  const today = new Date()
  const delivery = 3000
  useEffect(() => {
    if (quantity) {
      setAmount(quantity * props.price)
    }
  }, [quantity, props.price])

  const { mutate: updateCart } = useMutation<unknown, unknown, Carts, any>(
    (item) =>
      fetch(`/api/update-cart`, {
        method: 'POST',
        body: JSON.stringify({ item }),
      })
        .then((res) => res.json())
        .then((data) => data.items),
    {
      onMutate: async (item: any) => {
        await queryClient.cancelQueries([CART_QUERY_KEY])
        const previousWishlist = queryClient.getQueryData([CART_QUERY_KEY])
        queryClient.setQueryData<Carts[]>([CART_QUERY_KEY], (old) =>
          old?.filter((cart) => cart.id !== item.id).concat(item)
        )
        return { previousWishlist }
      },
      onError: (err, variables, context) => {
        queryClient.setQueryData([CART_QUERY_KEY], context.previousWishlist)
      },
      onSuccess: () => {
        queryClient.invalidateQueries([CART_QUERY_KEY])
      },
    }
  )

  const { mutate: deleteCart } = useMutation<unknown, unknown, number, any>(
    (id) =>
      fetch(`/api/delete-cart`, {
        method: 'POST',
        body: JSON.stringify({ id }),
      })
        .then((res) => res.json())
        .then((data) => data.items),
    {
      onMutate: async (id: any) => {
        await queryClient.cancelQueries([CART_QUERY_KEY])
        const previousWishlist = queryClient.getQueryData([CART_QUERY_KEY])
        queryClient.setQueryData<Carts[]>([CART_QUERY_KEY], (old) =>
          old?.filter((cart) => cart.id !== id)
        )
        return { previousWishlist }
      },
      onError: (err, variables, context) => {
        queryClient.setQueryData([CART_QUERY_KEY], context.previousWishlist)
      },
      onSuccess: () => {
        queryClient.invalidateQueries([CART_QUERY_KEY])
      },
    }
  )

  const handleUpdate = () => {
    if (quantity == null) {
      alert('주문 가능한 최소 수량을 입력하세요.')
      return
    }
    // TODO: 장바구니 수정 구현
    updateCart({ ...props, quantity: quantity, amount: props.price * quantity })
  }
  const handleDelete = async () => {
    // TODO: 장바구니 삭제 구현

    if (confirm('정말 삭제하시겠습니까?')) {
      await deleteCart(props.id)
    }
  }

  return (
    <div
      className="xl:w-[1080px] lg:w-[900px] md:w-[700px] sm:w-[560px] xs:w-[400px] xss:w-[360px] flex-col py-6 px-12 shadow-lg rounded-xl bg-white"
      style={{
        border: '1px solid rgba(200,200,200,0.6)',
      }}
    >
      <div className="flex justify-between text-2xl py-2 border-b-2 border-b-zinc-700">
        <div className="flex items-center justify-center">
          <span className="px-2">{props.name}</span>
          <IconBox></IconBox>
        </div>
        <div className="cursor-pointer transition duration-200 ease-in-out flex justify-center items-center p-1 hover:bg-green-200 rounded-full">
          <IconX
            onClick={() => {
              handleDelete()
            }}
            stroke={1}
            size={30}
          ></IconX>
        </div>
      </div>
      <div className="flex xl:flex-row flex-col justify-start items-center">
        <div className="px-10 w-full">
          <div className="text-sm font-sans-kr py-4">
            수제작 평균 소요시간
            <span className="text-green-500 font-sans-kr-bold px-2">5~7일</span>
          </div>
          <div className="flex xl:border-r-2 border-zinc-400 pr-20">
            <Image
              className="mr-6"
              src={props.image_url}
              width={90}
              height={60}
              alt="image"
              onClick={() => {
                router.push(`/products/${props.productId}`)
              }}
            ></Image>
            <div className="flex flex-col items-start justify-center">
              <div className="font-sans-kr py-1">
                영롱한 색이 매력적인 조명 : {props.name}
              </div>
              <div className="font-sans-kr-bold py-1">
                {props.price.toLocaleString('ko-KR')}원
              </div>
              <div className="py-1 text-sm text-zinc-500">
                LoveKong Statined Glass
              </div>
              <div className="py-1 text-xs">배송 평균 소요 시간 1~2일</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-4">
          <div className="flex flex-col justify-center items-center text-sm font-sans-kr py-4 px-10"></div>
          <div className="flex items-center space-x-2">
            <CountControl
              value={quantity}
              setValue={setQuantity}
              max={1000}
              min={1}
              width={150}
            ></CountControl>
            <div className="rounded-full flex justify-center transition duration-300 ease-in-out items-center hover:bg-gray-100 w-10 h-10">
              <IconRefresh
                className="hover:animate-spin"
                onClick={() => {
                  handleUpdate()
                }}
                stroke={1.5}
              ></IconRefresh>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center h-full px-10">
          <div className="flex flex-col justify-center items-center text-sm font-sans-kr py-4 px-10"></div>
          <div className="text-sm">상품 금액</div>
          <div className="font-sans-kr-bold pb-2">
            {props.amount.toLocaleString('kr-KR')}
          </div>
          <div>
            <Button
              leftIcon={<IconCoin size={20} stroke={1.5} />}
              className={`bg-green-400 hover:bg-green-500 transition duration-200 ease-in-out`}
              // onClick={() => {
              //   if (session == null) {
              //     alert('로그인이 필요합니다.')
              //     router.push('/auth/login')
              //     return
              //   }
              // }}
            >
              주문하기
            </Button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center h-full px-10">
          <div className="flex flex-col justify-center items-center text-sm font-sans-kr py-4 px-10"></div>
          <div className="text-sm">배송비</div>
          <div className="font-sans-kr-bold pb-2">3,000원</div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center ml-auto space-x-4 py-12">
        <div className="flex flex-col items-center justify-center px-8">
          <div>선택상품금액</div>
          <div className="font-sans-kr-bold">
            {amount.toLocaleString('ko-KR')}원
          </div>
        </div>
        <IconPlus stroke={1} size={25}></IconPlus>
        <div className="flex flex-col items-center justify-center px-8">
          <div>총 배송비</div>
          <div className="font-sans-kr-bold">
            {delivery.toLocaleString('ko-KR')}원
          </div>
        </div>
        <IconMinus stroke={1} size={25}></IconMinus>
        <div className="flex flex-col items-center justify-center px-8">
          <div>할인예상금액</div>
          <div className="font-sans-kr-bold text-red-500">{0}원</div>
        </div>
        <IconEqual stroke={1} size={25}></IconEqual>
        <div className="px-8">
          주문 금액
          <span className="text-green-600 font-sans-kr-bold px-2">
            {(amount + delivery).toLocaleString('ko-KR')}원
          </span>
        </div>
      </div>
    </div>
  )
}

const Row = styled.div`
  display: flex;
  * ~ * {
    margin-left: auto;
  }
`

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`
