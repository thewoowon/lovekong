import { format } from 'date-fns'

export const CATEGORY_MAP = ['LIGHT', 'TRAY', 'CASE', 'VASE', 'ACCESORY', 'ETC']

export const QNA_STATUS = ['답변 등록 전', '답변 등록 완료', '문의 종료']

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
      '영롱하고 심플하면서 포인트 되는 제품이에요.|' +
      '정말 예뻐요!!! |' +
      '종류별로 또는 색깔별로 있어도 좋은 오브제가 되어 줄 것 같아요!',
    createdAt: '2021-09-05',
    rate: 5,
    user_img:
      'https://imagedelivery.net/6qzLODAqs2g1LZbVYqtuQw/69e3e025-87d6-4655-faa9-3432fbac8e00/public',
  },
  {
    userId: 'berr*****',
    size: '스몰',
    color: '4 퍼플핑크',
    comment:
      '진짜 영롱보스에요 ㅠㅠ|' +
      '크기도 생각보다 커서 더 좋아요!!|' +
      '진짜 영롱... 이 홀더 들고 다니고 싶어요. ㅠㅠ|' +
      '고민했던 시간에 빨리 주문할걸이라는 생각이 들 정도로|' +
      '이쁩니다 😍😍😍 편지도 정성스레 써주시고, 냠냠이들도 같이 와서 할로윈 선물 받은 느낌이에요!!|' +
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
      '그냥 둬도 예쁘지만 초 켜니 진짜 진짜 x100 예뻐요!!|' +
      '홈카페나 밤에 와인 마실때 켜면 분위기 깡패예요.|' +
      '유리에서 퍼져나가는 빛이 너무 우아하고 고급져요!',
    createdAt: '2021-08-27',
    rate: 5,
    user_img:
      'https://imagedelivery.net/6qzLODAqs2g1LZbVYqtuQw/aa70b61e-b9f2-48dc-ba3d-8b59e65bc900/public',
  },
  {
    userId: 'viz_*****',
    size: '미디움',
    color: '2 다이아',
    comment:
      '좋아요!|' +
      '빛이 예쁘고,|' +
      '무게감도 있어서 좋아요.|' +
      '가능하면 추가로 하나 더 구매하고 싶어요.',
    createdAt: '2021-10-14',
    rate: 5,
    user_img:
      'https://imagedelivery.net/6qzLODAqs2g1LZbVYqtuQw/d006016c-d44f-4426-80e8-66003d345e00/public',
  },
  {
    userId: 'kwko*****',
    size: '스몰',
    color: '2 샴페인',
    comment:
      '예쁘고 귀여워요!|' +
      '샴페인은 뭔가 더 예쁜거 같아요!|' +
      '다이아도 이쁘지만 제 취향은 샴페인이네요 😆|' +
      '러브콩 후회 없을실 거에요.',
    createdAt: '2021-10-14',
    rate: 5,
    user_img:
      'https://imagedelivery.net/6qzLODAqs2g1LZbVYqtuQw/18cfcef3-8549-4a7c-903b-0aebc8eac300/public',
  },
  {
    userId: 'asdf*****',
    size: '스몰',
    color: '2 오로라',
    comment:
      '구매한거 1도 후회없고 너무 예쁘다고 생각해요.|' +
      '집에 도착하자마자 켜서 놓고 있어요.|' +
      '미니 캔들이랑 너무 잘어울리고 무드가 살아나요.',
    createdAt: '2021-10-14',
    rate: 5,
    user_img:
      'https://imagedelivery.net/6qzLODAqs2g1LZbVYqtuQw/102851d1-195b-4b0d-d373-f04307661900/public',
  },
]
