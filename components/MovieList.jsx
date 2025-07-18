import Movie from "./Movie";
import UpcomingMovieSlider from "./UpcomingMovieSlider";

export default async function MovieList({ genreId, searchParams }) {
  const page = Number(searchParams?.page) || 1;
  const genreQuery = genreId ? `&with_genres=${genreId}` : "";

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}${genreQuery}&page=${page}`
  );
  const moviesData = await res.json();

  const genreParamForLink = genreId ? `&genreId=${genreId}` : "";

  return (
    <>
      {!genreId && <UpcomingMovieSlider moviesData={moviesData} />}

      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {moviesData.results.slice(0, 15).map((movie) => (
          <li
            key={movie.id}
            className="w-full aspect-[2/3] bg-gray-800 rounded overflow-hidden"
          >
            <Movie movie={movie} />
          </li>
        ))}
      </ul>

      {/* Pagination controls */}
      <div className="flex justify-center my-6 space-x-2 text-white">
        {page > 1 && (
          <a
            href={`?page=${page - 1}`}
            className="px-3 py-1 bg-[#3d405a] rounded hover:bg-[#4a4e6d]"
          >
            &lt;
          </a>
        )}

        {Array.from({ length: 5 }, (_, i) => i + page)
          .filter((p) => p <= moviesData.total_pages)
          .map((p) => (
            <a
              key={p}
              href={`?page=${p}`}
              className={`px-3 py-1 rounded ${
                p === page ? "bg-[#0eaa76]" : "bg-[#3d405a] hover:bg-[#4a4e6d]"
              }`}
            >
              {p}
            </a>
          ))}

        {page + 5 <= moviesData.total_pages && (
          <span className="px-3 py-1 text-gray-400">...</span>
        )}

        {page < moviesData.total_pages && (
          <a
            href={`?page=${page + 1}`}
            className="px-3 py-1 bg-[#3d405a] rounded hover:bg-[#4a4e6d]"
          >
            &gt;
          </a>
        )}
      </div>
    </>
  );
}
