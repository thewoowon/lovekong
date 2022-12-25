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
      autoplay={{ delay: 3000 }}
      //   disableOnInteraction:false}}
      pagination={{ clickable: true }}
      className="my-swiper"
      loop={true}
      height={800}
    >
      <SwiperSlide className="my-swiper-slide">
        <div className="bg-black w-full h-full flex flex-col justify-center items-center">
          <Image
            src={'/assets/others/lovekong_thumb_1.png'}
            alt="lovekong_thumb"
            width={4968}
            height={2475}
          ></Image>
        </div>
      </SwiperSlide>
      <SwiperSlide className="my-swiper-slide">
        <div className="bg-white w-full h-full flex flex-col justify-center items-center">
          <Image
            src={'/assets/others/lovekong_thumb_2.png'}
            alt="lovekong_thumb"
            width={4905}
            height={2469}
          ></Image>
        </div>
      </SwiperSlide>
      <SwiperSlide className="my-swiper-slide">
        <div className="bg-white w-full h-full flex flex-col justify-center items-center">
          <Image
            src={'/assets/others/lovekong_thumb_3.png'}
            alt="lovekong_thumb"
            width={4931}
            height={2488}
          ></Image>
        </div>
      </SwiperSlide>
      {/* <SwiperSlide className="my-swiper-slide">
        <div className="bg-white w-full h-full flex flex-col justify-center items-center">
          <Image
            src={'/assets/others/lovekong_thumb_4.png'}
            alt="lovekong_thumb"
            width={4915}
            height={2501}
          ></Image>
        </div>
      </SwiperSlide> */}
      <SwiperSlide className="my-swiper-slide">
        <div className="bg-white w-full h-full flex flex-col justify-center items-center">
          <Image
            src={'/assets/others/lovekong_thumb_5.png'}
            alt="lovekong_thumb"
            width={4933}
            height={2465}
          ></Image>
        </div>
      </SwiperSlide>
    </Swiper>
  )
}

export default VideoWatcher
