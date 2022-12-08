import CommentItem from '@components/CommentItem'
import { CountControl } from '@components/CountControl'
import CustomEditor from '@components/Editor'
import { Badge, Button } from '@mantine/core'
import { Carts, OrderItems, Products, Comments } from '@prisma/client'
import {
  IconCoin,
  IconHeart,
  IconHeartbeat,
  IconShoppingCart,
} from '@tabler/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CATEGORY_MAP } from 'constants/goods'
import { format } from 'date-fns'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'
import { GetServerSidePropsContext } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Carousel from 'nuka-carousel'
import { CART_QUERY_KEY } from 'pages/cart/index'
import { ORDER_QUERY_KEY } from 'pages/my'
import { useEffect, useState } from 'react'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const product = await fetch(
    `${process.env.NEXTAUTH_URL}/api/get-product?id=${context.params?.id}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.items)
      return data.items
    })

  const comments = await fetch(
    `${process.env.NEXTAUTH_URL}/api/get-comments?productId=${context.params?.id}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.items)
      return data.items
    })

  return {
    props: {
      product: {
        ...product,
        images: [product.image_url, product.image_url, product.image_url],
      },
      comments: comments,
    },
  }
}

const WISHLIST_QUERY_KEY = `/api/get-wishlist`

interface IParam {
  productId?: string
}

export interface ICommentItemType extends Comments, OrderItems {}

export default function ProductsId(props: {
  product: Products & { images: string[] }
  comments: ICommentItemType[]
}) {
  const [index, setIndex] = useState(0)
  const { data: session } = useSession()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [quantity, setQuantity] = useState<number | undefined>(1)
  const { id: productId } = router.query
  const [editorState] = useState<EditorState | undefined>(() =>
    props.product.contents
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(props.product.contents))
        )
      : EditorState.createEmpty()
  )

  const { data: wishlist } = useQuery([WISHLIST_QUERY_KEY], () =>
    fetch(WISHLIST_QUERY_KEY)
      .then((res) => res.json())
      .then((data) => data.items)
  )

  const { mutate, isLoading } = useMutation<unknown, unknown, string, any>(
    (productId) =>
      fetch(`/api/update-wishlist`, {
        method: 'POST',
        body: JSON.stringify({ productId }),
      })
        .then((res) => res.json())
        .then((data) => data.items),
    {
      onMutate: async (productId: any) => {
        await queryClient.cancelQueries([WISHLIST_QUERY_KEY])
        const previousWishlist = queryClient.getQueryData([WISHLIST_QUERY_KEY])
        queryClient.setQueryData<string[]>([WISHLIST_QUERY_KEY], (old) =>
          old
            ? old.includes(String(productId))
              ? old.filter((id) => id !== String(productId))
              : [...old, productId]
            : []
        )
        return { previousWishlist }
      },
      onError: (err, variables, context) => {
        queryClient.setQueryData([WISHLIST_QUERY_KEY], context.previousWishlist)
      },
      onSuccess: () => {
        queryClient.invalidateQueries([WISHLIST_QUERY_KEY])
      },
    }
  )

  const product = props.product

  const { mutate: addCart } = useMutation<
    unknown,
    unknown,
    Omit<Carts, 'id' | 'userId' | 'createdAt'>,
    any
  >(
    (item) =>
      fetch(`/api/add-cart`, {
        method: 'POST',
        body: JSON.stringify({ item }),
      })
        .then((res) => res.json())
        .then((data) => data.items),
    {
      onMutate: () => {
        queryClient.invalidateQueries([CART_QUERY_KEY])
      },
      onSuccess: () => {
        if (confirm('장바구니에 추가했습니다. 장바구니로 이동할까요?')) {
          router.push('/cart')
          return
        }
      },
    }
  )

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

  const validate = (type: 'cart' | 'order') => {
    // if (!session) {
    //   router.push('/auth/login')
    // } else {
    //   router.push(`/cart`)
    // }
    if (quantity == null) {
      alert('수량을 입력해주세요.')
      return
    }
    // TODO: 장바구니에 추가하는 기능 추가

    if (type === 'cart') {
      addCart({
        productId: product.id,
        quantity: quantity,
        amount: product.price * quantity,
      })
    }
    if (type === 'order') {
      addOrder([
        {
          productId: product.id,
          quantity: quantity,
          amount: product.price * quantity,
          price: product.price,
        },
      ])
    }
  }

  const isWishlisted =
    wishlist != null && productId != null
      ? wishlist.includes(String(productId))
      : false
  // useEffect(() => {
  //   if (productId != null) {
  //     fetch(`/api/get-product?id=${productId}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.items?.contents) {
  //           setEditorState(
  //             EditorState.createWithContent(
  //               convertFromRaw(JSON.parse(data.items.contents))
  //             )
  //           )
  //         } else {
  //           setEditorState(EditorState.createEmpty())
  //         }
  //       })
  //   }
  // }, [productId])

  return product != null && productId != null ? (
    <div className="flex flex-wrap justify-center font-sans-kr-light my-10 px-36">
      <div style={{ maxWidth: '450px', minWidth: '360px' }} className="mx-10">
        <Carousel
          animation="fade"
          withoutControls
          wrapAround
          speed={10}
          slideIndex={index}
          className="overflow-hidden"
        >
          {product.images.map((url, index) => {
            return (
              <Image
                src={url}
                alt="image"
                key={`${url}-carousel-${index}`}
                width="500"
                height="400"
                className="overflow-hidden"
              ></Image>
            )
          })}
        </Carousel>
        <div className="flex space-x-2 mt-4">
          {product.images.map((url, index) => {
            return (
              <div
                onClick={() => setIndex(index)}
                key={`${url}-thumbnail-${index}`}
                className="cursor-pointer overflow-hidden"
              >
                <Image src={url} alt="image" width="100" height="60"></Image>
              </div>
            )
          })}
        </div>
        {editorState != null && (
          <CustomEditor editorState={editorState} readOnly={true} />
        )}
        <div>
          <div className="font-semibold text-xl">제품 후기</div>
          {props.comments && props.comments.length > 0 ? (
            props.comments.map((comment, iter) => (
              <CommentItem key={iter} item={comment}></CommentItem>
            ))
          ) : (
            <div className="h-60 bg-white">아직 후기가 없습니다.</div>
          )}
        </div>
      </div>
      <div
        style={{
          maxWidth: '700px',
          minWidth: '360px',
          border: '0.5px solid rgba(200,200,200,1)',
        }}
        className="p-10 flex flex-col space-y-4 rounded-md"
      >
        <div className="text-sm">
          Type : {CATEGORY_MAP[product.category_id]}
        </div>
        <div className="text-3xl font-sans-kr">{product.name}</div>
        <div className="text-2xl py-5 text-end">
          {product.price.toLocaleString('ko-KR')} ₩
        </div>
        <div
          style={{ border: '0.5px solid rgba(200,200,200,1)' }}
          className="grid grid-col-1 gap-5 grid-row-3 py-5 rounded-md px-4"
        >
          <div className="text-md text-start font-light">
            함께 구매하면 좋은 상품 :{' '}
            {product.category_id === 0 ? (
              <Link href="/">Vase</Link>
            ) : product.category_id === 1 ? (
              <Link href="/">Case</Link>
            ) : product.category_id === 2 ? (
              <Link href="/">Accessory</Link>
            ) : product.category_id === 3 ? (
              <Link href="/">Light</Link>
            ) : product.category_id === 4 ? (
              <Link href="/">Case</Link>
            ) : product.category_id === 5 ? (
              <Link href="/">Light</Link>
            ) : null}
          </div>
          <div className="text-md text-start font-light">
            원산지 : 제품 상세설명 참조
          </div>
          <div className="text-md text-start font-light">
            택배배송 : 2~3일 이내 배송(100,000원 이상 구매시 무료배송)
          </div>
        </div>
        <div className="flex justify-between">
          <div className="font-light text-xl text-start py-2">수량</div>
          <CountControl
            width={150}
            value={quantity}
            setValue={setQuantity}
            max={1000}
            min={1}
          />
        </div>
        <div className="text-2xl py-5 flex justify-between">
          <div className="text-xl sm:text-2xl md:text-3xl">총 상품금액</div>
          <div className="text-xl sm:text-2xl md:text-3xl">
            <span className="text-sm">{`(선택 수량 : ${quantity}) `}</span>
            {(quantity
              ? product.price * quantity
              : product.price
            ).toLocaleString('ko-KR')}{' '}
            ₩
          </div>
        </div>
        <div className="flex space-x-3">
          <div className="flex-1">
            <Button
              leftIcon={
                <IconShoppingCart size={20} stroke={1.5}></IconShoppingCart>
              }
              className={`bg-green-400 w-full hover:bg-green-500 transition duration-200 ease-in-out`}
              onClick={() => {
                if (session == null) {
                  alert('로그인이 필요합니다.')
                  router.push('/auth/login')
                  return
                }
                validate('cart')
              }}
            >
              장바구니
            </Button>
          </div>
          <div className="flex-1">
            <Button
              // loading={isLoading}
              disabled={wishlist == null}
              leftIcon={
                isWishlisted ? (
                  <IconHeart size={20} stroke={1.5} />
                ) : (
                  <IconHeartbeat size={20} stroke={1.5} />
                )
              }
              className={
                isWishlisted
                  ? `bg-green-400 w-full hover:bg-green-500 transition duration-200 ease-in-out`
                  : `bg-zinc-400 w-full hover:bg-zinc-500 transition duration-200 ease-in-out`
              }
              onClick={() => {
                if (session == null) {
                  alert('로그인이 필요합니다.')
                  router.push('/auth/login')
                  return
                }
                mutate(String(productId))
              }}
            >
              {isWishlisted ? '이미 찜했어요' : '찜하기'}
            </Button>
          </div>
        </div>
        <Button
          // loading={isLoading}
          disabled={wishlist == null}
          leftIcon={<IconCoin size={20} stroke={1.5} />}
          className={`bg-green-400 hover:bg-green-500 transition duration-200 ease-in-out`}
          onClick={() => {
            if (session == null) {
              alert('로그인이 필요합니다.')
              router.push('/auth/login')
              return
            }
            validate('order')
          }}
        >
          구매하기
        </Button>
        <div className="text-sm">
          {' '}
          쇼핑할 때 필독{' '}
          <Link
            href={'/'}
            className="text-green-500 border-b-green-400 hover:border-b-2 "
          >
            안전거래 TIP!
          </Link>
        </div>
        <div className="text-sm">
          {' '}
          상품정보에 문제가 있나요?{' '}
          <Link
            href={'/'}
            className="text-green-500 border-b-green-400 hover:border-b-2 "
          >
            신고하기
          </Link>
        </div>
        <div className="text-sm">
          {' '}
          대량 주문이 필요한가요?{' '}
          <Link
            href={'/'}
            className="text-green-500 border-b-green-400 hover:border-b-2 "
          >
            연락하기
          </Link>
        </div>
        <div
          style={{ minHeight: '300px' }}
          className="bg-yellow-50 rounded-md"
        ></div>
        <div className="text-sm  text-end text-zinc-400">
          등록 : {format(new Date(product.createdAt), 'yyyy년 MM월 dd일')}
        </div>
      </div>
    </div>
  ) : (
    <div>제품 정보를 가져오는 중입니다.</div>
  )
}
