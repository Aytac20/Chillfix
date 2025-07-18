"use client";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import logo from "@/assets/images/logo.png";

import Profile from "./Profile";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { signIn, useSession, getProviders } from "next-auth/react";
import Image from "next/image";
import SearchResults from "./SearchResults";
import { TiTimes } from "react-icons/ti";

const Navbar = () => {
  const { data: session } = useSession();
  const [genres, setGenres] = useState([]);
  const [showGenres, setShowGenres] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const getAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    getAuthProviders();
  }, []);
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
        );
        const data = await res.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <nav className="border-b border-[#272a3a] text-white px-2">
      <div className="flex px-3 py-3 items-center justify-between">
        {/* Mobile view  */}
        <div className="flex items-center xl:hidden">
          <button
            type="button"
            id="mobile-dropdown-button"
            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400  hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
            onClick={() => {
              setIsMobileMenuOpen((prev) => !prev);
            }}
          >
            <RxHamburgerMenu />
          </button>
        </div>
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link href="/">
            <Image className="h-[3.2rem] w-auto" src={logo} alt="ChillFix" />
          </Link>
        </div>
        {/* Desktop Search */}
        <div className="hidden lg:flex items-center text-gray-600 px-3 w-[40rem]">
          <div className="flex items-center bg-gray-100 w-full rounded-full px-3">
            <IoSearch className="text-gray-500" />
            <input
              type="text"
              aria-label="Search movies"
              placeholder="Search for movie..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-[2.3rem] rounded-full px-3 text-black outline-none flex-grow"
            />
            {query && (
              <TiTimes
                className="ml-auto cursor-pointer text-[#2b2e41]"
                onClick={() => setQuery("")}
              />
            )}
          </div>
        </div>

        {/* Login Button or Profile */}
        {!session ? (
          <div className="flex items-center">
            {providers &&
              Object.values(providers).map((provider, index) => (
                <button
                  key={index}
                  onClick={() => signIn(provider.id)}
                  className="ml-4 bg-[#373a52] flex items-center px-3 rounded-sm py-2 cursor-pointer"
                >
                  <FaGoogle className="mr-2 text-[#0fb87f]" /> Login or Register
                </button>
              ))}
          </div>
        ) : (
          <Profile />
        )}
      </div>

      {/* Mobile Search */}
      <div className="flex items-center bg-gray-100 w-full rounded-full px-4 my-4  lg:hidden">
        <IoSearch className="text-gray-500" />
        <input
          type="text"
          aria-label="Search movies"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movie..."
          className="bg-transparent outline-none px-2 text-black h-[2.3rem] flex-grow"
        />
        {query && (
          <TiTimes
            className="ml-auto cursor-pointer text-[#2b2e41]"
            onClick={() => setQuery("")}
          />
        )}
      </div>

      <SearchResults query={query} />
      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="xl:hidden block ">
          <div className="space-y-2 px-2 pb-3 pt-2">
            <Link
              href="/"
              className={`${
                pathname === "/" &&
                "text-[#0fb87f] border-r-2 border-[#0fb87f] bg-[#303447]"
              } text-gray-300  block  px-3 py-2 text-base font-medium hover:border-r-2 border-[#0fb87f] hover:text-[#0fb87f] hover:bg-[#303447]`}
            >
              Home
            </Link>
          </div>
          <button
            onClick={() => setShowGenres(!showGenres)}
            className="w-full text-left text-gray-300 px-3 py-2 mb-4 ml-2 text-base font-medium tracking-wide hover:text-[#0fb87f] hover:bg-[#303447] flex justify-between items-center"
          >
            Genres
            <span className="text-sm">{showGenres ? "▲" : "▼"}</span>
          </button>

          {showGenres && (
            <div className="ml-2">
              {genres.map((genre) => (
                <Link
                  key={genre.id}
                  href={`/genre/${genre.id}`}
                  className="block text-gray-300 px-3 py-1 text-sm hover:text-[#0fb87f] hover:bg-[#303447]"
                >
                  {genre.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
