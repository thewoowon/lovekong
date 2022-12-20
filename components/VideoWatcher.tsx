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
      height={800}
    >
      <SwiperSlide className="my-swiper-slide">
        <div className="bg-white w-full h-full flex flex-col justify-center items-center"></div>
      </SwiperSlide>
      <SwiperSlide className="my-swiper-slide">
        <div className="bg-white w-full h-full flex flex-col justify-center items-center"></div>
      </SwiperSlide>
      <SwiperSlide className="my-swiper-slide">
        <div className="bg-white w-full h-full flex flex-col justify-center items-center"></div>
      </SwiperSlide>
      <SwiperSlide className="my-swiper-slide">
        <div className="bg-white w-full h-full flex flex-col justify-center items-center"></div>
      </SwiperSlide>
    </Swiper>
  )
}

export default VideoWatcher
