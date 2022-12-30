import { format } from 'date-fns'

export const ADMIN_EMAIL = ['smj091@nate.com', 'thewoowon@naver.com']

export const CATEGORY_MAP = ['LAMP', 'TRAY', 'CASE', 'VASE', 'ACCESORY', 'ETC']

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
      : orderBy === 'id'
      ? { orderBy: { id: 'asc' } }
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

export type InstagramItemType = {
  id: number
  comment1Id: string
  comment1: string
  comment2Id: string
  comment2: string
  image: string
  title: string
  content: string
  tag: string
}

export const instagramItem: InstagramItemType[] = [
  {
    id: 0,
    comment1Id: 'viz_zle_yunn',
    comment1: '로투스 제품은 진짜 저의 최애 캔들 홀더 입니다….🥂🤍',
    comment2Id: 'soopool_room',
    comment2: '로투스홀더✨ 은은하게 불빛이 일렁이는게 제마음도 일렁일렁😊🤍',
    image: '/assets/mainCategory/main-1.jpeg',
    title: 'Light',
    content: `주말에도 럽콩 유리공장 open🚪|
        로투스홀더는 낮에도 예쁘지만|
        특히! 밤에 더 예뻐요✨|
        오랜만에 모아두니 너무 예뿐걸?|
        낮엔 홈카페, 밤엔 와인바느낌으로...🥂❤️‍🔥 |
        모든 유리제품 문의는 디엠 또는 |
        카톡 lovekong_glass로 문의 주세요😉`,
    tag: '#러브콩 #러브콩스테인드글라스 #스테인드글라스',
  },
  {
    id: 1,
    comment1Id: 'ru_mi2',
    comment1: `😍영롱영롱 너무이쁘다요`,
    comment2Id: 'milky.haus_',
    comment2: `어머 럽콩님 작품 너무 보러가고싶어영😍❤️ 너무예뻐요!`,
    image: '/assets/mainCategory/main-2.jpeg',
    title: 'Case',
    content: `하루종일 정신 없는 하루여서|
    이제야 올리는 피드..💡|
    많은 분들이 예쁘다 해주시고|
    너무 잘 만들었다고 칭찬도 많이 해주셔서|
    기분 좋고 감사한 하루였어용|
    한번에 두개 주문해가신 분도 계셨다는👍🏻💕|
    다음주 수요일까지 진행합니당🙇‍♀️|
    ~|
    ✨부산 신세계 센텀시티 지하1층(이벤트)|
    ✨22/3/24(목) ~ 22/3/30(수)|
    ✨영업시간 10:30~20:00 (금,토,일20:30)`,
    tag: '#러브콩 #러브콩스테인드글라스 #스테인드글라스',
  },
  {
    id: 2,
    comment1Id: 'ur_myhone',
    comment1: `콩님 멋져요!!! 취미로 하실 때부터 지켜보며 와 이 재능은 나눠야 할 것이다, 생각했는데 역시나💐💐💐`,
    comment2Id: 'slow.h0use',
    comment2: `이렇게 보니 또 색다른 느낌 같아요😍준비하시느라 정말 고생 많으셨어요👏앞으로도 예쁜 작품 부탁뜨려요~❤️💗`,
    image: '/assets/mainCategory/main-3.jpeg',
    title: 'Vase',
    content: `✨캠핑 & 피크닉 페어|
    ✨3/10(목) ~ 3/13(일) 까지|
    ✨일산 킨텍스 제2전시장 7,8홀|
    ✨부스 A105 (폴라리스)|
    ~|
    이번 전시참여로 처음 선보이는|
    골제로 쉐이드, 캠들리에 쉐이드도 있어용!|
    베스트셀러 로투스홀더도 잔뜩 있답니다😊|
    놀러오세효💓 `,
    tag: '#러브콩 #러브콩스테인드글라스 #스테인드글라스',
  },
  {
    id: 3,
    comment1Id: 'eu_nee__',
    comment1: '진짜 영롱하다는 말밖에 안나오네요너❤️ 넘 이뻐요😍',
    comment2Id: 'fiume_____',
    comment2: '와 대박… 진짜 멋져요ㅠㅠㅠ🤍🤍',
    image: '/assets/mainCategory/main-4.jpeg',
    title: 'Tray',
    content: `러브콩 스테인드글라스 전시 안내|
    4/19(화)-4/24(일)|
    더현대서울 지하1층 대행사장✨`,
    tag: '#디어마이 #룸토피아 #디어마이더현대 #더현대 #더현대서울 #Dearmy #러브콩 #러브콩스테인드글라스 #스테인드글라스',
  },
  {
    id: 4,
    comment1Id: 'neuil.o',
    comment1: `와 그냥 봐도 너무너무 이뻐요😍😍😍 멀어서 못놀러가는게 넘나 아쉽습니다🥲`,
    comment2Id: 'seul__official',
    comment2: `오옷 !! 분위기 모예요 😍❤️❤️ 가고싶따아ㅏㅏㅏㅏ`,
    image: '/assets/mainCategory/main-5.jpeg',
    title: 'Accesory',
    content: `2022.12.10-12.11|
    진주 카페AAM에서|
    크리스마스 마켓이 열립니다🎄♥️|
    
    유리제품뿐만 아니라|
    러브콩 빈티지 소장품들도 판매해요😄|
    너무 갑자기 참여하게 되서|
    제대로 공지를 못 올렸네요!|
    진주분들 많이 놀러 오세요~!🧚🏻‍♀️ `,
    tag: '#러브콩 #러브콩스테인드글라스 #스테인드글라스 #진주aam',
  },
  {
    id: 5,
    comment1Id: 'intip_interiortip',
    comment1: `다양한 제품이 있네용>_<!! 진짜 하나하나 다 너무 예뻐욧!!😍😍`,
    comment2Id: 'by_a.ri',
    comment2: `햇살받으니 더 예쁜걸요 😍 무리하지 마시고 화이팅이예요 ❤️`,
    image: '/assets/mainCategory/main-6.jpeg',
    title: 'Others',
    content: `해들어올때 모아놓고 한컷📸|
    초록이들 옆에 두니까 더 예뻐보이는 매직🪄|

    모든 유리제품 문의는 디엠 또는|
    카톡 lovekong_glass로 문의 주세요😉`,
    tag: '#러브콩 #러브콩스테인드글라스 #스테인드글라스',
  },
  {
    id: 6,
    comment1Id: '',
    comment1: '',
    comment2Id: '',
    comment2: '',
    image: '/assets/mainCategory/main-7.jpeg',
    title: 'Accesory',
    content: `반짝 반짝 예쁜 유리 키링들✨|
    햇살에 비친 유리 색이 아름답네요🫶🏻`,
    tag: '#진주공방 #러브콩스테인드글라스',
  },
  {
    id: 7,
    comment1Id: '',
    comment1: '',
    comment2Id: '',
    comment2: '',
    image: '/assets/mainCategory/main-8.jpeg',
    title: 'Lamp',
    content: `줄리 램프 입니다...!|
    단아한 느낌이 매우 사랑스러워요💙`,
    tag: '#진주공방 #러브콩스테인글라스 ',
  },
  {
    id: 8,
    comment1Id: '',
    comment1: '',
    comment2Id: '',
    comment2: '',
    image: '/assets/mainCategory/main-9.jpeg',
    title: 'Vase',
    content: `베리 화병💚|
    화병으로 제작되었지만,|
    연필꽂이로도 쓸 수 있어요~!!`,
    tag: '#스테인드글라스 #화병 #꽃병 ',
  },
  {
    id: 9,
    comment1Id: '',
    comment1: '',
    comment2Id: '',
    comment2: '',
    image: '/assets/mainCategory/main-10.jpeg',
    title: 'Accesory',
    content: `빅 고흐 그립톡♥️|
    미국산 고흐 유리를 사용한 영롱한 그립톡입니당!|
    모든 유리 제품 문의는 디엠 주세용😉`,
    tag: '#진주원데이클래스 #스테인드글라스',
  },
  {
    id: 10,
    comment1Id: '',
    comment1: '',
    comment2Id: '',
    comment2: '',
    image: '/assets/mainCategory/main-11.jpeg',
    title: 'Lamp',
    content: `꽃이랑 달이랑 식물🌙🌿|
    제가 좋아하는거 다 넣어봄..🤭`,
    tag: '#스테인드글라스 #스테인드글라스조명',
  },
  {
    id: 11,
    comment1Id: '',
    comment1: '',
    comment2Id: '',
    comment2: '',
    image: '/assets/mainCategory/main-12.jpeg',
    title: 'Lamp',
    content: `고오급진 느낌으로 만들어본 버드윙램프✨|
    ~|
    같은 디자인이라도 다른 유리를 쓰면|
    다른 느낌의 조명이 된답니당!|
    유리 색 조합은 취향껏 골라 드립니다🙆‍♀️`,
    tag: '#스테인드글라스 #스테인드글라스조명 ',
  },
]

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
    user_img: '/assets/review/review_1.jpeg',
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
    user_img: '/assets/review/review_2.jpeg',
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
    user_img: '/assets/review/review_3.jpeg',
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
    user_img: '/assets/review/review_4.jpeg',
  },
  {
    userId: 'kwko*****',
    size: '스몰',
    color: '2 샴페인',
    comment:
      '예쁘고 귀여워요!|' +
      '샴페인은 뭔가 더 예쁜거 같아요!|' +
      '다이아도 이쁘지만 제 취향은 샴페인이네요 😆|',
    createdAt: '2021-10-14',
    rate: 5,
    user_img: '/assets/review/review_5.jpeg',
  },
  {
    userId: 'asdf*****',
    size: '스몰',
    color: '2 오로라',
    comment:
      '너무 예쁘다고 생각해요.|' +
      '집에 도착하자마자 켜서 놓고 있어요.|' +
      '미니 캔들이랑 너무 잘어울리고 무드가 살아나요.',
    createdAt: '2021-10-14',
    rate: 5,
    user_img: '/assets/review/review_6.jpeg',
  },
]
