import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Footer() {
  const router = useRouter()
  return (
    <footer
      className="py-5 font-sans-kr-light text-md xs:text-md"
      style={{ borderTop: '0.5px solid rgba(230,230,230,1)' }}
    >
      <div
        className="flex justify-between mx-auto"
        style={{ maxWidth: '1080px' }}
      >
        <div>
          <Image src={'/kong.png'} alt="" width={200} height={300}></Image>
        </div>
        <div className="w-full gap-2 max-w-5xl m-auto flex justify-start items-start xl:text-sm lg:text-sm md:text-xs sm:text-xs text-xs">
          <div className="flex flex-col items-center">
            <div className="font-sans-kr-light">PRODUCTS</div>
            <ol className="p-5">
              <li
                className="font-sans-kr-light cursor-pointer"
                onClick={() => {
                  router.push('/products?category_id=1')
                }}
              >
                LAMP
              </li>
              <li
                className="font-sans-kr-light cursor-pointer"
                onClick={() => {
                  router.push('/products?category_id=2')
                }}
              >
                TRAY
              </li>
              <li
                className="font-sans-kr-light cursor-pointer"
                onClick={() => {
                  router.push('/products?category_id=3')
                }}
              >
                CASE
              </li>
              <li
                className="font-sans-kr-light cursor-pointer"
                onClick={() => {
                  router.push('/products?category_id=4')
                }}
              >
                VASE
              </li>
              <li
                className="font-sans-kr-light cursor-pointer"
                onClick={() => {
                  router.push('/products?category_id=5')
                }}
              >
                ACCESORY
              </li>
              <li
                className="font-sans-kr-light cursor-pointer"
                onClick={() => {
                  router.push('/products?category_id=6')
                }}
              >
                ETC
              </li>
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
        </div>
      </div>
      <div
        className="flex flex-col justify-center items-start mx-auto mt-5 text-sm px-10 py-10"
        style={{ maxWidth: '1080px' }}
      >
        <div>
          <div>
            상호명 : 러브콩 스테인드글라스
            <span className="px-4">사업자등록번호 : 8570102527</span>
          </div>
          <div>
            대표자 : 서명진
            <span className="px-4">
              사업장 소재지 : 경남 진주시 초전북로62번길 26 러브콩
              스테인드글라스
            </span>
          </div>
          <div>
            고객센터 : 0507-1367-4547
            <span className="px-4">통신판매업번호 : 2021-경남의령-0028</span>
          </div>
          <div>e-mail : alrnrdls@naver.com</div>
        </div>
        <div className="py-5">
          © Lovekong Stained Glass. All rights reserved
        </div>
      </div>
    </footer>
  )
}
