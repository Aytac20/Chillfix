import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import { MdOutlinePlayCircleOutline } from "react-icons/md";
import backdrop from "@/assets/images/backdrop.png";
import image from "@/assets/images/image.png";

import CustomizeButtons from "@/components/CustomizeButtons";
export default async function MovieDetailsPage({ params }) {
  const { id } = await params;

  const [movieRes, videoRes] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      { next: { revalidate: 60 } }
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      { next: { revalidate: 60 } }
    ),
  ]);

  if (!movieRes.ok || !videoRes.ok) {
    return (
      <div className="text-center h-[40rem] mt-[10rem] text-xl tracking-wide text-gray-00">
        Movie not found :/
      </div>
    );
  }

  const movie = await movieRes.json();
  const videos = await videoRes.json();

  const trailer = videos.results.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : backdrop.src; // Use .src here

  return (
    <div className="relative">
      <div className="h-screen">
        <div
          className="grid grid-cols-1 md:grid-cols-2 items-center justify-center relative bg-cover bg-center text-white p-6 rounded-lg overflow-hidden lg:h-[60%] h-[50%]"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        >
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-t from-[#2b2e41] to-[#2b2e41b7] z-0" />
        </div>
      </div>

      <div className="absolute right-0 top-[35%] w-[90%] grid grid-cols-2 mr-[2rem] lg:m-0 gap-4">
        <div className="px-4 py-2">
          <h2 className="text-lg md:text-3xl lg:text-4xl py-3 uppercase text-gray-200 tracking-wider font-bold">
            {movie.title}
          </h2>

          {movie.tagline && (
            <p className="text-sm md:text-xl lg:text-2xl tracking-wider py-2 text-gray-300">
              "{movie.tagline}"
            </p>
          )}

          <p className="text-xs md:text-base lg:text-lg tracking-wider leading-7 text-gray-400 text-justify">
            {movie.overview.length > 40
              ? `${movie.overview.substring(0, 200)}...`
              : movie.overview}
          </p>

          <div className="flex tracking-wider items-center space-x-2 py-4 text-gray-200 text-[0.7rem] md:text-sm lg:text-base">
            <p>{movie.release_date}</p>
            <p aria-hidden="true">•</p>
            <p>{movie.runtime} min</p>
            <p aria-hidden="true">•</p>
            <p className="flex items-center text-amber-300 font-bold text-sm md:text-base lg:text-lg">
              <FaStar className="inline-block mr-1" />{" "}
              {movie.vote_average.toFixed(1)}
            </p>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mt-2">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="bg-[#373a52] text-gray-200 px-3 py-1 rounded-full tracking-wider text-xs md:text-sm lg:text-base"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Trailer Button */}
          {trailer && (
            <div className="flex gap-2 mt-4">
              <Link
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#373a52] hover:bg-white hover:text-[#373a52] duration-300 transition text-gray-200 px-6 py-2 my-2 rounded-full tracking-wider flex items-center gap-2 text-sm md:text-base lg:text-lg"
              >
                <MdOutlinePlayCircleOutline className="text-2xl" /> Watch
                Trailer
              </Link>
            </div>
          )}
        </div>

        <CustomizeButtons
          posterUrl={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : image.src
          }
          movie={movie}
        />
      </div>
    </div>
  );
}
