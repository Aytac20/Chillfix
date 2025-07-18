"use client";
import Image from "next/image";
import { useState, useEffect, useTransition } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { TbClockPlus, TbClockMinus } from "react-icons/tb";
import { FaEye, FaRegEye } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import addFavorite from "@/app/actions/addFavorite";
import addWatched from "@/app/actions/addWatched";
import addWatchlist from "@/app/actions/addWatchlist";

import removeFavorite from "@/app/actions/removeFavorite";
import removeWatched from "@/app/actions/removeWatched";
import removeWatchlist from "@/app/actions/removeWatchlist";

const CustomizeButtons = ({ movie, posterUrl }) => {
  const { data: session, status } = useSession();
  const [favorite, setFavorite] = useState(false);
  const [watched, setWatched] = useState(false);
  const [watchlist, setWatchlist] = useState(false);
  const [isPending, startTransition] = useTransition();
  const {
    id,
    title,
    poster_path,
    backdrop_path,
    release_date,
    overview,
    vote_average,
  } = movie;

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setFavorite(
        session.user.favorites.some((fav) => String(fav.id) === String(id))
      );
      setWatched(session.user.watched.some((w) => String(w.id) === String(id)));
      setWatchlist(
        session.user.watchlist.some((w) => String(w.id) === String(id))
      );
    }
  }, [session, status, id]);

  const handleFavorite = () => {
    startTransition(async () => {
      try {
        if (favorite) {
          const result = await removeFavorite(id);
          if (result?.removed) setFavorite(false);
        } else {
          const result = await addFavorite({
            id,
            title,
            poster_path: posterUrl,
            backdrop_path,
            release_date,
            overview,
            vote_average,
          });
          if (result?.added) setFavorite(true);
        }
      } catch (error) {
        toast.error("Failed to update favorites.");
        console.error(error);
      }
    });
  };

  const handleWatched = () => {
    startTransition(async () => {
      try {
        if (watched) {
          const result = await removeWatched(id);
          if (result?.removed) setWatched(false);
        } else {
          const result = await addWatched({
            id,
            title,
            poster_path: posterUrl,
            backdrop_path,
            release_date,
            overview,
            vote_average,
          });
          if (result?.added) setWatched(true);
        }
      } catch (error) {
        toast.error("Failed to update watched list.");
        console.error(error);
      }
    });
  };

  const handleWatchlist = () => {
    startTransition(async () => {
      try {
        if (watchlist) {
          const result = await removeWatchlist(id);
          if (result?.removed) setWatchlist(false);
        } else {
          const result = await addWatchlist({
            id,
            title,
            poster_path: posterUrl,
            backdrop_path,
            release_date,
            overview,
            vote_average,
          });
          if (result?.added) setWatchlist(true);
        }
      } catch (error) {
        toast.error("Failed to update watchlist.");
        console.error(error);
      }
    });
  };

  return (
    <div className="flex flex-col justify-start items-center gap-4">
      <Image
        src={posterUrl}
        alt={title}
        width={300}
        height={450}
        className="w-[15rem] md:w-[18rem] rounded-md shadow-2xl"
      />
      {session ? (
        <div className="flex gap-8 md:text-3xl text-2xl text-gray-200 bg-[#373a52] px-6 items-center justify-center rounded-full py-2">
          <button
            onClick={handleFavorite}
            title="Favorite"
            disabled={isPending}
            className="hover:scale-110 duration-200 transition cursor-pointer disabled:opacity-50"
          >
            {favorite ? <FaHeart className="text-[#0fb87f]" /> : <FaRegHeart />}
          </button>

          <button
            onClick={handleWatched}
            title="Watched"
            disabled={isPending}
            className="hover:scale-110 duration-200 transition cursor-pointer disabled:opacity-50"
          >
            {watched ? <FaEye className="text-[#0fb87f]" /> : <FaRegEye />}
          </button>

          <button
            onClick={handleWatchlist}
            title="Watchlist"
            disabled={isPending}
            className="hover:scale-110 duration-200 transition cursor-pointer disabled:opacity-50"
          >
            {watchlist ? (
              <TbClockPlus className="text-[#0fb87f]" />
            ) : (
              <TbClockMinus />
            )}
          </button>
        </div>
      ) : (
        <div className="text-center text-gray-400">
          <p className="w-[9rem]">For customizing your movies please sign in</p>
          <button
            onClick={() => signIn()}
            className="mt-2 px-4 py-2 bg-[#0f9c6d] text-white rounded hover:bg-[#0da96d] transition cursor-pointer"
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomizeButtons;
