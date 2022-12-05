import { format } from 'date-fns'

export const CATEGORY_MAP = ['LIGHT', 'TRAY', 'CASE', 'VASE', 'ACCESORY', 'ETC']

export const TAKE = 12

export const FITERS = [
  { label: '최신순', value: 'latest' },
  { label: '가격 높은 순', value: 'expensive' },
  { label: '가격 낮은 순', value: 'cheap' },
]

export const getOrderBy = (orderBy?: string) => {
  return orderBy
    ? orderBy === 'latest'
      ? { orderBy: { createdAt: 'desc' } }
      : orderBy === 'expensive'
      ? { orderBy: { price: 'desc' } }
      : { orderBy: { price: 'asc' } }
    : undefined
}

export type MainCommentItemType = {
  userId: string
  size: string
  color: string
  comment: string
  createdAt: string
  rate: number
  user_img: string
}

export const mainComment: MainCommentItemType[] = [
  {
    userId: 'ojeo*****',
    size: '스몰',
    color: '2 오로라',
    comment:
      '영롱하고 심플하면서 포인트 되는 제품이에요. 정말 예뻐요!!! 종류, 색감별로 잇어도 좋은 오브제가 되어 줄 것 같아요!',
    createdAt: '2021-09-05',
    rate: 5,
    user_img:
      'https://imagedelivery.net/6qzLODAqs2g1LZbVYqtuQw/1645108a-1eb5-4845-d641-ab12b7dcce00/public',
  },
  {
    userId: 'berr*****',
    size: '스몰',
    color: '4 퍼플핑크',
    comment:
      '진짜 영롱보스에요 ㅠㅠ 크기도 생각보다 커서 더 좋아요!! ' +
      '진짜 영롱... 이 홀더 들고 다니고 싶어요. ㅠㅠ 고민했던 시간에 빨리 주문할걸이라는 생각이 들 정도로 ' +
      '이쁩니다 😍😍😍 편지도 정성스레 써주시고, 냠냠이들도 같이 와서 할로윈 선물 받은 느낌이에요!!' +
      '이거 진짜 추천해요 ㅠㅠ 깔별로 소장하구 싶어요...',
    createdAt: '2021-10-14',
    rate: 5,
    user_img:
      'https://imagedelivery.net/6qzLODAqs2g1LZbVYqtuQw/38bbe2e9-bbf0-42e8-0c5c-2bbe79d10c00/public',
  },
  {
    userId: 'ojed*****',
    size: '스몰',
    color: '2 오로라',
    comment:
      '영롱하고 심플하면서 포인트 되는 제품이에요. 정말 예뻐요!!! 종류, 색감별로 잇어도 좋은 오브제가 되어 줄 것 같아요!',
    createdAt: '2021-10-14',
    rate: 5,
    user_img:
      'https://imagedelivery.net/6qzLODAqs2g1LZbVYqtuQw/aa70b61e-b9f2-48dc-ba3d-8b59e65bc900/public',
  },
  {
    userId: 'viz_*****',
    size: '스몰',
    color: '2 오로라',
    comment:
      '영롱하고 심플하면서 포인트 되는 제품이에요. 정말 예뻐요!!! 종류, 색감별로 잇어도 좋은 오브제가 되어 줄 것 같아요!',
    createdAt: '2021-10-14',
    rate: 5,
    user_img:
      'https://imagedelivery.net/6qzLODAqs2g1LZbVYqtuQw/d006016c-d44f-4426-80e8-66003d345e00/public',
  },
  {
    userId: 'kwko*****',
    size: '스몰',
    color: '2 오로라',
    comment:
      '영롱하고 심플하면서 포인트 되는 제품이에요. 정말 예뻐요!!! 종류, 색감별로 잇어도 좋은 오브제가 되어 줄 것 같아요!',
    createdAt: '2021-10-14',
    rate: 5,
    user_img:
      'https://imagedelivery.net/6qzLODAqs2g1LZbVYqtuQw/05f74582-f743-46a4-ce5b-7d31fce74700/public',
  },
  {
    userId: 'asdf*****',
    size: '스몰',
    color: '2 오로라',
    comment:
      '영롱하고 심플하면서 포인트 되는 제품이에요. 정말 예뻐요!!! 종류, 색감별로 잇어도 좋은 오브제가 되어 줄 것 같아요!',
    createdAt: '2021-10-14',
    rate: 5,
    user_img:
      'https://imagedelivery.net/6qzLODAqs2g1LZbVYqtuQw/102851d1-195b-4b0d-d373-f04307661900/public',
  },
]
