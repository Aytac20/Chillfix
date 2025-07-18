// Example: components/MySwiper.js
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation"; // if you use navigation
import "swiper/css/pagination"; // if you use pagination
import { Pagination, Navigation } from "swiper/modules";
import Link from "next/link";

export default function UpcomingMovieSlider({ moviesData }) {
  return (
    <div className="py-8 px-4">
      <h1 className="text-2xl py-4">Upcoming Movies</h1>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        navigation={true}
        scrollbar={{ draggable: true }}
        className="w-[66rem]"
        loop={true}
        modules={[Pagination, Navigation]}
      >
        {moviesData.results.slice(0, 20).map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link href={`/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title}
                className="rounded-lg pb-2 hover:opacity-80 transition duration-200 hover:scale-105"
              />
              <p className="text-white text-lg pt-2">{movie.title}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
