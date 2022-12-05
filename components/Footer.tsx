import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer
      className="px-36"
      style={{ height: '500px', backgroundColor: 'rgba(230,230,230,0.5)' }}
    >
      <div className="flex justify-center items-center pt-10">
        <Image src={'/kong.png'} alt="" width={200} height={300}></Image>
      </div>
      <div className="max-w-5xl m-auto grid grid-flow-col grid-rows-1 grid-cols-4 text-zinc-500 pb-5 border-b-2 border-gray-100">
        <div className="flex flex-col items-center">
          <div className="font-sans-kr-light">PRODUCTS</div>
          <ol className="p-5">
            <li className="font-sans-kr-light cursor-pointer">
              <Link href={'/products/'}>Light</Link>
            </li>
            <li className="font-sans-kr-light cursor-pointer">
              <Link href={'/products/'}>Tray</Link>
            </li>
            <li className="font-sans-kr-light cursor-pointer">
              <Link href={'/products/'}>Case</Link>
            </li>
            <li className="font-sans-kr-light cursor-pointer">
              <Link href={'/products/'}>Vase</Link>
            </li>
            <li className="font-sans-kr-light cursor-pointer">
              <Link href={'/products/'}>Accesory</Link>
            </li>
            <li className="font-sans-kr-light cursor-pointer">
              <Link href={'/products/'}>ETC</Link>
            </li>
          </ol>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-sans-kr-light">CONTACT</div>
          <ol className="p-5">
            <li className="font-sans-kr-light">대한민국 경상남도</li>
            <li className="font-sans-kr-light">진주시 초전북로62번길</li>
            <li className="font-sans-kr-light">26 러브콩 스테인드글라스</li>
          </ol>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-sans-kr-light">FOLLOW US</div>
          <ol className="p-5">
            <li className="font-sans-kr-light">
              <Link href={'https://www.instagram.com/lovekong_zip/'}>
                Instagram
              </Link>
            </li>
            <li className="font-sans-kr-light">
              <Link href={'https://m.blog.naver.com/alrnrdls/222732676166'}>
                Blog
              </Link>
            </li>
          </ol>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-sans-kr-light">CALL US</div>
          <ol className="p-5">
            <li className="font-sans-kr-light">0507-1367-4547</li>
          </ol>
        </div>
      </div>
      <div className="flex justify-center items-center text-zinc-500 pt-5">
        <div className="font-sans-kr-light text-md text-zinc-400">
          © 2020 LoveKong. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
