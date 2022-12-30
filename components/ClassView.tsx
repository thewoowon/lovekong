import { Navigation, Pagination, A11y, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/autoplay'
import React from 'react'
import Image from 'next/image'

const ClassView = (): JSX.Element => {
  return (
    <Swiper
      id="carousel"
      modules={[Autoplay, Navigation, Pagination, A11y]}
      spaceBetween={20}
      slidesPerView={'auto'}
      centeredSlides={true}
      autoplay={{ delay: 3000 }}
      //   disableOnInteraction:false}}
      pagination={{ clickable: true }}
      loop={true}
      height={600}
    >
      <SwiperSlide>
        <div className="bg-white flex flex-col justify-center items-center">
          <Image
            src={'/assets/class/class-1.png'}
            alt="lovekong_thumb"
            width={860}
            height={1100}
          ></Image>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="bg-white w-full h-full flex flex-col justify-center items-center">
          <Image
            src={'/assets/class/class-2.png'}
            alt="lovekong_thumb"
            width={860}
            height={1100}
          ></Image>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="bg-white w-full h-full flex flex-col justify-center items-center">
          <Image
            src={'/assets/class/class-3.png'}
            alt="lovekong_thumb"
            width={860}
            height={1100}
          ></Image>
        </div>
      </SwiperSlide>
    </Swiper>
  )
}

export default ClassView
