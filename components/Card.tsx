import {
  IconDots,
  IconHeart,
  IconMessageCircle,
  IconMessageCircle2,
  IconMoodSmile,
  IconSend,
} from '@tabler/icons'
import Image from 'next/image'

export default function Card({
  title,
  image,
}: {
  title: string
  image: string
}) {
  return (
    <div
      style={{
        border: '1px solid rgba(200,200,200,0.6)',
        maxWidth: '360px',
        minWidth: '300px',
      }}
      className="min-w-sm overflow-hidden hover:rotate-1 rounded-md shadow-lg transition duration-300 ease-in-out font-sans-kr"
    >
      <div className="rounded-lg relative bg-white">
        <div className="p-3 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              height={30}
              width={30}
              className="h-8 w-8 rounded-full"
              src={image}
              alt="Sunset in the mountains"
            ></Image>
            <span className="text-sm px-2">lovekong_zip</span>
          </div>
          <IconDots stroke={1.5} size={20}></IconDots>
        </div>
        <Image
          height={500}
          width={400}
          className="w-full h-96"
          src={image}
          alt="Sunset in the mountains"
        ></Image>
        <div className="p-3 flex">
          <div className="flex flex-row items-center justify-start">
            <IconHeart fill="#FF8080" stroke={1.5} size={30}></IconHeart>
            <IconMessageCircle2
              className="mx-2"
              stroke={1.5}
              size={30}
            ></IconMessageCircle2>
            <IconSend stroke={1.5} size={30}></IconSend>
          </div>
        </div>
        <div className="px-4 text-xs flex items-center justify-start">
          <Image
            height={20}
            width={20}
            className="h-6 w-6 rounded-full"
            src={image}
            alt="Sunset in the mountains"
          ></Image>
          <span className="px-2">
            <span className="font-semibold">thejobyouhate</span>님 외 여러명이
            좋아합니다
          </span>
        </div>
        <div className="px-4 pt-3 flex items-center justify-start text-xs">
          <span>
            <span className="font-semibold pr-2">lovekong_zip</span>취향저격
            러브콩😍
          </span>
        </div>
        <div className="text-blue-900 px-4 pb-2 flex items-center justify-start text-xs">
          #lovekong #love #jinju #예쁨주의
        </div>
        <div className="text-zinc-500 px-4 pb-2 flex items-center justify-start text-xs">
          댓글 297개 모두 보기
        </div>
        <div className="px-4 pb-1 flex items-center justify-start text-xs">
          <span>
            <span className="font-semibold pr-2">thejobyouhate</span>너무
            예뻐요!😆
          </span>
        </div>
        <div className="px-4 pb-1 items-center justify-start text-xs">
          <span>
            <span className="font-semibold pr-2">iamwoowon</span>완전 취저...
          </span>
        </div>
        <div
          style={{
            borderBottom: '0.5px solid rgba(200,200,200,0.6)',
            fontSize: '8px',
          }}
          className="text-zinc-500 px-4 py-2 flex items-center justify-start"
        >
          며칠 전
        </div>
        <div className="text-zinc-500 px-4 py-3 flex items-center justify-start text-xs">
          <IconMoodSmile className="mr-2"></IconMoodSmile>
          댓글 달기...
        </div>
        {/* <div className="px-5 pt-4 pb-2 absolute bottom-0 right-0">
          <span className="font-sans-kr inline-block bg-white rounded-lg px-3 py-1 text-xs text-gray-600 mr-2 mb-3">
            #LoveKong
          </span>
          <span className="font-sans-kr inline-block bg-white rounded-lg px-3 py-1 text-xs text-gray-600 mb-3">
            #{title}
          </span>
        </div> */}
        {/* <div className="px-5 py-4 pb-2 absolute top-0 left-0">
                <div className="font-sans-kr text-lg mb-2 text-white">{title}</div>
            </div> */}
      </div>
    </div>
  )
}
