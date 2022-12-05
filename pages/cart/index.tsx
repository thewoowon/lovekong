import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Categories, Products, Carts, OrderItems } from '@prisma/client'
import { useEffect, useMemo, useState } from 'react'
import { ORDER_QUERY_KEY } from 'pages/my'
import { IconCoin, IconRefresh, IconX } from '@tabler/icons'
import { Button, Loader } from '@mantine/core'
import { CATEGORY_MAP } from 'constants/goods'
import { CountControl } from '@components/CountControl'
import styled from '@emotion/styled'

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
    [`/api/get-products?skip=${0}&take=${6}`],
    () =>
      fetch(`/api/get-products?skip=${0}&take=${6}`).then((res) => res.json()),
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
        <meta property="og:url" content={`http://localhost:3000/cart`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="럽콩(LoveKong) Cart" />
        <meta
          property="og:description"
          content="럽콩의 아이덴티티를 여러 제품을 통해 만나보세요."
        />
        <meta property="og:image" content="" />
      </Head>

      <main className="my-10 px-36 font-sans-kr-light">
        <p className="text-2xl mb-4">장바구니 ({data && data.length})</p>
        <div className="flex">
          <div className="flex flex-col p-4 space-y-4 flex-1">
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
          <div className="p-4">
            <div
              className="flex flex-col p-4 space-y-4 shadow-xl rounded-md"
              style={{ minWidth: '300px' }}
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
          </div>
        </div>
        <p className="text-2xl my-10">추천 상품</p>
        {products ? (
          products.length > 0 ? (
            <div className="grid grid-cols-4 gap-5">
              {products.map((product) => {
                return (
                  <div key={product.id} className="m-auto">
                    <div
                      className="hover:opacity-95 cursor-pointer hover:shadow-md transition ease-in-out duration-300"
                      style={{ maxWidth: 400 }}
                      onClick={() => {
                        router.push(`/products/${product.id}`)
                      }}
                    >
                      <Image
                        className="rounded-md"
                        src={product.image_url ?? ''}
                        alt={product.name}
                        width={400}
                        height={500}
                        placeholder="blur"
                        blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                      ></Image>
                      <div className="flex p-2">
                        <span className="font-sans-kr text-lg">
                          {product.name}
                        </span>
                        <span className="font-sans-kr-light ml-auto">
                          {product.price.toLocaleString('ko-KR')}₩
                        </span>
                      </div>
                      <div className="flex px-2 pb-2">
                        <span className="text-zinc-500 font-sans-kr-light">
                          type : {CATEGORY_MAP[product.category_id - 1]}
                        </span>
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
      </main>
    </div>
  )
}

const Items = (props: ICartItem) => {
  const [quantity, setQuantity] = useState<number | undefined>(props.quantity)
  const [amount, setAmount] = useState<number>(props.price)
  const queryClient = useQueryClient()
  const router = useRouter()
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
    <div className="w-full flex p-4 shadow-xl rounded-md">
      <Image
        src={props.image_url}
        width={600}
        height={360}
        alt="image"
        onClick={() => {
          router.push(`/products/${props.productId}`)
        }}
      ></Image>
      <div className="flex flex-col ml-4">
        <span className="font-semibold mb-2">{props.name}</span>
        <span className="mb-auto">
          가격 : {props.price.toLocaleString('ko-KR')} ₩
        </span>
        <div className="flex items-center space-x-2">
          <CountControl
            value={quantity}
            setValue={setQuantity}
            max={1000}
            min={1}
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
      <div className="flex ml-auto space-x-4">
        <span>{amount.toLocaleString('ko-KR')} ₩</span>
        <div className="transition duration-300 ease-in-out flex justify-center items-center hover:bg-gray-100">
          <IconX
            onClick={() => {
              handleDelete()
            }}
            size={30}
            stroke={1.5}
          ></IconX>
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
