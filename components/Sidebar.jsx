"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
        );
        const data = await res.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div className="text-[1rem] text-gray-300 shadow-sm min-h-screen">
      <h3 className="mt-4 font-semibold pl-6 text-gray-500">Menu</h3>
      <ul className="space-y-2 border-b border-[#272a3a] py-4" role="menu">
        <li role="menuitem">
          <Link
            href="/"
            className={`${
              pathname === "/"
                ? "text-[#0fb87f] border-r-2 border-[#0fb87f] bg-[#303447]"
                : "text-gray-300"
            } block pl-6 py-2 hover:text-[#0fb87f] tracking-wider cursor-pointer hover:border-r-2 border-[#0fb87f] hover:bg-[#303447]`}
          >
            Home Page
          </Link>
        </li>

       
      </ul>

      <h3 className="font-semibold py-4 pl-6 text-gray-500">Categories</h3>
      <ul className="space-y-2 py-4" role="menu">
        {genres.map((genre) => (
          <li key={genre.id} role="menuitem">
            <Link
              href={`/genre/${genre.id}`}
              className={`block pl-6 py-2 tracking-wide hover:text-[#0fb87f] hover:bg-[#303447] hover:border-r-2 border-[#0fb87f] ${
                pathname === `/genre/${genre.id}`
                  ? "text-[#0fb87f] border-r-2 border-[#0fb87f] bg-[#303447]"
                  : "text-gray-300"
              }`}
            >
              {genre.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
