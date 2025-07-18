import Movie from "@/components/Movie";
import connectDB from "@/config/database";
import User from "@/models/User";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

const WatchedPage = async () => {
  await connectDB();

  // Get current user session
  const session = await getServerSession(authOptions);
  if (!session) {
    return <p>Please log in to see your watchlist.</p>;
  }

  // Find user by email
  const user = await User.findOne({ email: session.user.email }).lean();

  if (!user || !user.watched) {
    return <p>No watchlist found.</p>;
  }

  const watchedData = user.watched;
  return (
    <>
      <h1 className="pl-4 mt-4 text-2xl tracking-wide">
        Films that you watched.
      </h1>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {watchedData.map((movie) => (
          <li
            key={movie.id}
            className="w-full aspect-[2/3] bg-gray-800 rounded overflow-hidden"
          >
            <Movie movie={movie} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default WatchedPage;
