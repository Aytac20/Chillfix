import MovieList from "@/components/MovieList";

export default function GenrePage({ params, searchParams }) {
  const { genreId } = params;

  return <MovieList genreId={genreId} searchParams={searchParams} />;
}
