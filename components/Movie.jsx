import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import image from "@/assets/images/image.png";
const Movie = ({ movie }) => {
  return (
    <div className="text-white bg-[#313449] rounded-lg flex flex-col h-full">
      <Link href={`/${movie.id}`} className="flex flex-col h-full">
        <div className="relative w-full aspect-[2/3] rounded-t-lg overflow-hidden">
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : image
            }
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover hover:opacity-80 transition duration-200 hover:scale-105"
          />
        </div>
        <div className="flex justify-between px-2 py-2 items-end flex-grow">
          <p className="text-white text-sm font-semibold">
            {movie.title.length > 20
              ? `${movie.title.substring(0, 20)}...`
              : movie.title}
          </p>
          <p className="flex items-center text-amber-300 text-sm font-semibold">
            <FaStar className="inline-block mr-1" />
            {movie.vote_average.toFixed(1)}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Movie;
