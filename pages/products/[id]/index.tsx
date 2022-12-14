import CommentItem from '@components/CommentItem'
import { CountControl } from '@components/CountControl'
import CustomEditor from '@components/Editor'
import { Badge, Button } from '@mantine/core'
import { Carts, OrderItems, Products, Comments } from '@prisma/client'
import {
  IconCoin,
  IconDetails,
  IconHeart,
  IconHeartbeat,
  IconListDetails,
  IconMessage,
  IconShoppingCart,
  IconTruckDelivery,
} from '@tabler/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CATEGORY_MAP } from 'constants/goods'
import { format } from 'date-fns'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'
import { GetServerSidePropsContext } from 'next'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Carousel from 'nuka-carousel'
import { CART_QUERY_KEY } from 'pages/cart/index'
import { ORDER_QUERY_KEY } from 'pages/my'
import { useEffect, useState } from 'react'
import { Tabs } from '@mantine/core'
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons'

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
        images: [
          product.image_url,
          product.image_url,
          product.image_url,
          product.image_url,
        ],
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
        if (confirm('??????????????? ??????????????????. ??????????????? ????????????????')) {
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
        alert('?????????????????? ???????????????.')
        router.push('/my')
        return
      },
    }
  )

  const validate = (type: 'cart' | 'order') => {
    if (quantity == null) {
      alert('????????? ??????????????????.')
      return
    }
    // TODO: ??????????????? ???????????? ?????? ??????

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
    <div>
      <div className="flex flex-wrap justify-center font-sans-kr-light my-10">
        <div style={{ maxWidth: '420px', minWidth: '340px' }} className="mx-10">
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
            <div className="font-semibold text-xl">?????? ??????</div>
            {props.comments && props.comments.length > 0 ? (
              props.comments.map((comment, iter) => (
                <CommentItem key={iter} item={comment}></CommentItem>
              ))
            ) : (
              <div className="h-60 bg-white">?????? ????????? ????????????.</div>
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
          <div className="text-sm border-b-2 border-b-blue-400 py-2">
            {CATEGORY_MAP[product.category_id - 1]}
          </div>
          <div className="text-3xl font-sans-kr">{product.name}</div>
          <div className="text-2xl py-5 text-end =">
            <span className="line-through text-zinc-500">
              {product.price.toLocaleString('ko-KR')}
            </span>
            <span className="px-2">
              {(product.price * 0.9).toLocaleString('ko-KR')}
            </span>
          </div>
          <div
            style={{ border: '0.5px solid rgba(200,200,200,1)' }}
            className="grid grid-col-1 gap-5 grid-row-3 py-5 rounded-md px-4"
          >
            <div className="text-md text-start font-light">
              ?????? ???????????? ?????? ?????? :{' '}
              {product.category_id === 1 ? (
                <Link href="/">Vase</Link>
              ) : product.category_id === 2 ? (
                <Link href="/">Case</Link>
              ) : product.category_id === 3 ? (
                <Link href="/">Accessory</Link>
              ) : product.category_id === 4 ? (
                <Link href="/">Lamp</Link>
              ) : product.category_id === 5 ? (
                <Link href="/">Case</Link>
              ) : product.category_id === 6 ? (
                <Link href="/">Lamp</Link>
              ) : null}
            </div>
            <div className="text-md text-start font-light">
              ????????? : ?????? ???????????? ??????
            </div>
            <div className="text-md text-start font-light">
              ???????????? : 7~14??? ??????(50,000??? ?????? ????????? ????????????)
            </div>
          </div>
          <div className="flex justify-between">
            <div className="font-light text-xl text-start py-2">??????</div>
            <CountControl
              width={150}
              value={quantity}
              setValue={setQuantity}
              max={1000}
              min={1}
            />
          </div>
          <div className="text-2xl py-5 flex justify-between">
            <div className="text-xl sm:text-2xl md:text-3xl">??? ????????????</div>
            <div className="text-xl sm:text-2xl md:text-3xl">
              <span className="text-sm">{`(?????? ?????? : ${quantity}) `}</span>
              {(quantity
                ? product.price * quantity * 0.9
                : product.price * 0.9
              ).toLocaleString('ko-KR')}{' '}
              ???
            </div>
          </div>
          <div className="flex space-x-3">
            <div className="flex-1">
              <Button
                leftIcon={
                  <IconShoppingCart size={20} stroke={1.5}></IconShoppingCart>
                }
                className={`bg-blue-500 w-full hover:bg-blue-600 transition duration-200 ease-in-out`}
                onClick={() => {
                  if (session == null) {
                    alert('???????????? ???????????????.')
                    signIn()
                    return
                  }
                  validate('cart')
                }}
              >
                ????????????
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
                    ? `bg-blue-500 w-full hover:bg-blue-600 transition duration-200 ease-in-out`
                    : `bg-zinc-400 w-full hover:bg-zinc-500 transition duration-200 ease-in-out`
                }
                onClick={() => {
                  if (session == null) {
                    alert('???????????? ???????????????.')
                    signIn()
                    return
                  }
                  mutate(String(productId))
                }}
              >
                {isWishlisted ? '?????? ????????????' : '?????????'}
              </Button>
            </div>
          </div>
          <Button
            // loading={isLoading}
            disabled={wishlist == null}
            leftIcon={<IconCoin size={20} stroke={1.5} />}
            className={`bg-blue-500 hover:bg-blue-600 transition duration-200 ease-in-out`}
            onClick={() => {
              if (session == null) {
                alert('???????????? ???????????????.')
                signIn()
                return
              }
              validate('order')
            }}
          >
            ????????????
          </Button>
          <div className="text-sm">
            {' '}
            ????????? ??? ??????{' '}
            <Link
              href={'/'}
              className="text-blue-500 border-b-blue-400 hover:border-b-2 "
            >
              ???????????? TIP!
            </Link>
          </div>
          <div className="text-sm">
            {' '}
            ??????????????? ????????? ??????????{' '}
            <Link
              href={'/'}
              className="text-blue-500 border-b-blue-400 hover:border-b-2 "
            >
              ????????????
            </Link>
          </div>
          <div className="text-sm">
            {' '}
            ?????? ????????? ????????????????{' '}
            <Link
              href={'/'}
              className="text-blue-500 border-b-blue-400 hover:border-b-2 "
            >
              ????????????
            </Link>
          </div>
          <div
            style={{ minHeight: '300px' }}
            className="bg-yellow-50 rounded-md"
          ></div>
          <div className="text-sm  text-end text-zinc-400">
            ?????? : {format(new Date(product.createdAt), 'yyyy??? MM??? dd???')}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center font-sans-kr-light my-10">
        <Tabs
          color="#3b82f6"
          defaultValue="detailImage"
          style={{ width: '1020px' }}
        >
          <Tabs.List>
            <Tabs.Tab
              value="detailImage"
              icon={<IconPhoto color="#3b82f6" size={30} />}
            >
              ?????? ?????????
            </Tabs.Tab>
            <Tabs.Tab
              value="comment"
              icon={<IconMessage color="#3b82f6" size={30} />}
            >
              ?????? ??????
            </Tabs.Tab>
            <Tabs.Tab
              value="information"
              icon={<IconListDetails color="#3b82f6" size={30} />}
            >
              ?????? ??????
            </Tabs.Tab>
            <Tabs.Tab
              value="delivery"
              icon={<IconTruckDelivery color="#3b82f6" size={30} />}
            >
              ?????? ??????
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="detailImage" pt="lg">
            <div className="flex flex-col justify-start items-center">
              {product.images.map((url, index) => {
                return (
                  <div key={`${url}-detail-${index}`} className="py-5">
                    <Image
                      src={url}
                      alt="image"
                      width="900"
                      height="780"
                    ></Image>
                  </div>
                )
              })}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="comment" pt="lg">
            <div>
              {props.comments && props.comments.length > 0 ? (
                props.comments.map((comment, iter) => (
                  <CommentItem key={iter} item={comment}></CommentItem>
                ))
              ) : (
                <div className="h-60 bg-white">?????? ????????? ????????????.</div>
              )}
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="information" pt="lg">
            <div className="flex flex-col justify-start items-center">
              <table className="my-5">
                <tbody>
                  <tr>
                    <td className="w-20 bg-zinc-100">????????????</td>
                    <td className="w-36">5146741730</td>
                    <td className="w-20 bg-zinc-100">????????????</td>
                    <td className="w-36">?????????</td>
                  </tr>
                  <tr>
                    <td className="w-20 bg-zinc-100">?????????</td>
                    <td>?????????,????????? ????????? ????????? ??????!</td>
                    <td className="w-20 bg-zinc-100">?????????</td>
                    <td>?????????,????????? ????????? ????????? ??????!</td>
                  </tr>
                  <tr>
                    <td className="w-20 bg-zinc-100">?????????</td>
                    <td colSpan={3}>?????????(????????????????????????)</td>
                  </tr>
                </tbody>
              </table>
              <table className="my-5">
                <tbody>
                  <tr>
                    <td className="w-20 bg-zinc-100">????????????</td>
                    <td className="w-36">LED??????</td>
                    <td className="w-20 bg-zinc-100">??????</td>
                    <td className="w-36">????????????</td>
                  </tr>
                  <tr>
                    <td className="w-20 bg-zinc-100">??????</td>
                    <td>????????????</td>
                    <td className="w-20 bg-zinc-100">??????</td>
                    <td>??????</td>
                  </tr>
                  <tr>
                    <td className="w-20 bg-zinc-100">?????????</td>
                    <td colSpan={3}>?????????(????????????????????????)</td>
                  </tr>
                </tbody>
              </table>
              <table className="my-5">
                <tbody>
                  <tr>
                    <td className="bg-zinc-100">???????????????</td>
                    <td colSpan={3}>??????????????????, ?????????????????????</td>
                  </tr>
                  <tr>
                    <td className="bg-zinc-100">A/S ??????</td>
                    <td colSpan={3}>070-7872-2545</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="delivery" pt="lg">
            Settings tab content
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  ) : (
    <div>?????? ????????? ???????????? ????????????.</div>
  )
}
