import { Navigation, Pagination, A11y, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/autoplay'
import React from 'react'

const VideoWatcher = (): JSX.Element => {
  return (
    <Swiper
      id="carousel"
      modules={[Autoplay, Navigation, Pagination, A11y]}
      spaceBetween={20}
      slidesPerView={'auto'}
      centeredSlides={true}
      navigation
      // autoplay={{delay:6000,
      //   disableOnInteraction:false}}
      pagination={{ clickable: true }}
      className="my-swiper"
      loop={true}
      height={1000}
    >
      <SwiperSlide className="my-swiper-slide">
        <div
          style={{ backgroundColor: '#6C4AB6' }}
          className="w-full h-full flex justify-center items-center"
        >
          안녕하세요 러브콩이에요.
        </div>
      </SwiperSlide>
      <SwiperSlide className="my-swiper-slide">
        <div
          style={{ backgroundColor: '#8D72E1' }}
          className="w-full h-full flex justify-center items-center"
        >
          더 많은 제품이 기다리고 있어요.
        </div>
      </SwiperSlide>
      <SwiperSlide className="my-swiper-slide">
        <div
          style={{ backgroundColor: '#8D9EFF' }}
          className="w-full h-full flex justify-center items-center"
        >
          오늘의 러브콩
        </div>
      </SwiperSlide>
      <SwiperSlide className="my-swiper-slide">
        <div
          style={{ backgroundColor: '#B9E0FF' }}
          className="w-full h-full flex justify-center items-center"
        >
          버드윙 램프
        </div>
      </SwiperSlide>
    </Swiper>
  )
}

export default VideoWatcher
