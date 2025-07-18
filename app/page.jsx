import MovieList from "@/components/MovieList";

export default function HomePage({ searchParams }) {
  const genreId = searchParams?.genreId;
  return <MovieList genreId={genreId} searchParams={searchParams} />;
}
