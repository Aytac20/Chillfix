import Link from "next/link";
import { useEffect, useState } from "react";
import image from "@/assets/images/image.png";
import Image from "next/image";
export default function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            query
          )}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error("Search fetch error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (!query) return null;

  return (
    <div className="bg-[#3b3e57] mb-4 text-white mt-2 px-4 py-3 rounded-md shadow-lg max-h-[20rem] overflow-y-auto ">
      {loading ? (
        <p className="text-gray-500">Searching...</p>
      ) : results.length === 0 ? (
        <p className="text-gray-500">No results found.</p>
      ) : (
        <ul className="space-y-2">
          {results.map((movie) => (
            <li
              key={movie.id}
              className="cursor-pointer hover:text-[#0fb87f] transition-colors "
            >
              <Link href={`/${movie.id}`} className="flex items-center py-2">
                <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : image
                  }
                  width={60}
                  height={50}
                  alt={movie.title}
                  className="mr-4 rounded-md"
                />
                <p>{movie.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
