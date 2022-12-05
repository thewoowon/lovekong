import { CountControl } from '@components/CountControl'
import styled from '@emotion/styled'
import { Badge, Button } from '@mantine/core'
import { OrderItems, Orders } from '@prisma/client'
import { IconX } from '@tabler/icons'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface IOrderItemsDetail extends OrderItems {
  name: string
  image_url: string
}

interface IOrderDetail extends Orders {
  orderItems: IOrderItemsDetail[]
}

const ORDER_STATUS_MAP = [
  '주문취소',
  '주문대기',
  '결제대기',
  '결제완료',
  '배송대기',
  '배송중',
  '배송완료',
  '환불대기',
  '환불완료',
  '반품대기',
  '반품완료',
]

export const ORDER_QUERY_KEY = `/api/get-order`

export default function My() {
  const { data: session } = useSession()
  const router = useRouter()

  const { data } = useQuery<{ items: IOrderDetail[] }, unknown, IOrderDetail[]>(
    [ORDER_QUERY_KEY],
    () =>
      fetch(ORDER_QUERY_KEY)
        .then((res) => res.json())
        .then((data) => data.items)
  )
  return (
    <div>
      <Head>
        <title>LoveKong | My</title>
        <meta name="description" content="LoveKong Stained Glass" />

        <link rel="icon" href="/favicon.ico" />
        <meta property="og:url" content={`http://localhost:3000/my`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="럽콩(LoveKong) My" />
        <meta
          property="og:description"
          content="럽콩의 아이덴티티를 여러 제품을 통해 만나보세요."
        />
        <meta property="og:image" content="" />
      </Head>

      <main className="font-sans-kr-light my-10 px-36">
        <p className="text-2xl mb-2">주문내역 ({data && data.length})</p>
        <div className="flex">
          <div className="flex flex-col p-4 space-y-4 flex-1">
            {data ? (
              data.length > 0 ? (
                data.map((value, iter) => {
                  return <DetailItem key={iter} {...value}></DetailItem>
                })
              ) : (
                <div
                  style={{ height: '600px' }}
                  className="flex flex-col justify-center items-center font-sans-kr-light"
                >
                  <div>주문내역이 비었어요.</div>
                </div>
              )
            ) : (
              <div>Loading....</div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

const DetailItem = (props: IOrderDetail) => {
  return (
    <div className="w-full flex-col border-2 border-gray-200 flex p-4 rounded-lg">
      <div className="flex">
        <Badge
          className="mx-6"
          size={'lg'}
          variant="gradient"
          gradient={
            props.status === 0
              ? { from: 'orange', to: 'red' }
              : { from: 'teal', to: 'lime', deg: 105 }
          }
        >
          {ORDER_STATUS_MAP[props.status + 1]}
        </Badge>
        <IconX className="ml-auto" size={30} stroke={1.5}></IconX>
      </div>
      {props.orderItems.map((orderItem, iter) => {
        return <Items key={iter} {...orderItem} status={props.status}></Items>
      })}
      <div className="flex mt-4">
        <div className="flex flex-col">
          <span className="font-semibold text-lg my-3">주문 정보</span>
          <span>받는 사람 : {props.receiver ?? '입력 필요'}</span>
          <span>주소 : {props.address ?? '입력 필요'}</span>
          <span>연락처 : {props.phone ?? '입력 필요'}</span>
        </div>
        <div className="flex flex-col ml-auto mr-4 text-right">
          <span className="font-semibold text-lg my-3">
            결제 금액 :{' '}
            <span className="font-light text-green-500">
              {props.orderItems
                .map((item) => item.amount)
                .reduce((prev, curr) => prev + curr, 0)
                .toLocaleString('ko-KR')}{' '}
              ₩
            </span>
          </span>
          <span className="mt-auto">
            주문 일자 :{' '}
            {format(new Date(props.createdAt), 'yyyy년 MM월 dd일 HH:mm:ss')}
          </span>
          <Button
            className={`bg-green-400 w-full hover:bg-green-500 transition duration-200 ease-in-out`}
          >
            결제 처리
          </Button>
        </div>
      </div>
    </div>
  )
}

const Items = (props: IOrderItemsDetail & { status: number }) => {
  const [quantity, setQuantity] = useState<number | undefined>(props.quantity)
  const [amount, setAmount] = useState<number>(props.price)
  const router = useRouter()

  const handleComment = () => {
    router.push(`/comment/edit?orderItemId=${props.id}`)
  }

  useEffect(() => {
    if (quantity) {
      setAmount(quantity * props.price)
    }
  }, [quantity, props.price])

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
            readOnly={true}
          ></CountControl>
        </div>
      </div>
      <div className="flex flex-col ml-auto">
        <span>{amount.toLocaleString('ko-KR')} ₩</span>
        <div className="mt-auto">
          {props.status === 0 && (
            <Button
              onClick={() => {
                handleComment()
              }}
              className="bg-green-400 w-full hover:bg-green-500 transition duration-200 ease-in-out"
            >
              후기 작성
            </Button>
          )}
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
