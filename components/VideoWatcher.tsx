import { Navigation, Pagination, A11y, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/autoplay'
import React from 'react'
import Image from 'next/image'

const VideoWatcher = (): JSX.Element => {
  return (
    <Swiper
      id="carousel"
      modules={[Autoplay, Navigation, Pagination, A11y]}
      spaceBetween={20}
      slidesPerView={'auto'}
      centeredSlides={true}
      navigation
      autoplay={{ delay: 4000 }}
      //   disableOnInteraction:false}}
      pagination={{ clickable: true }}
      className="my-swiper"
      loop={true}
      height={1000}
    >
      <SwiperSlide className="my-swiper-slide">
        <div
          //style={{ backgroundColor: '#6C4AB6' }}
          className="w-full h-full flex flex-col justify-center items-center"
        >
          <div>테스트 이미지입니다.</div>
          <div className="w-96">
            <Image
              alt=""
              src="/assets/light/light6.jpeg"
              width={800}
              height={1000}
            ></Image>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="my-swiper-slide">
        <div
          // style={{ backgroundColor: '#8D72E1' }}
          className="w-full h-full flex flex-col justify-center items-center"
        >
          <div>테스트 이미지입니다.</div>
          <div className="w-96">
            <Image
              alt=""
              src="/assets/light/light5.jpeg"
              width={800}
              height={1000}
            ></Image>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="my-swiper-slide">
        <div
          //style={{ backgroundColor: '#8D9EFF' }}
          className="w-full h-full flex flex-col justify-center items-center"
        >
          <div>테스트 이미지입니다.</div>
          <div className="w-96">
            <Image
              alt=""
              src="/assets/light/light4.jpeg"
              width={800}
              height={1000}
            ></Image>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="my-swiper-slide">
        <div
          //style={{ backgroundColor: '#B9E0FF' }}
          className="w-full h-full flex flex-col justify-center items-center"
        >
          <div>테스트 이미지입니다.</div>
          <div className="w-96">
            <Image
              alt=""
              src="/assets/light/light3.jpeg"
              width={800}
              height={1000}
            ></Image>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  )
}

export default VideoWatcher
