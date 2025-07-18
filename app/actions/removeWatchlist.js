"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function removeWatchlist(movieId) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  const email = session.user.email;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const beforeLength = user.watchlist.length;

  // Filter out the movie by ID
  user.watchlist = user.watchlist.filter(
    (fav) => String(fav.id) !== String(movieId)
  );

  const afterLength = user.watchlist.length;

  if (beforeLength === afterLength) {
    return { removed: false, message: "Movie not in watchlist" };
  }

  await user.save();

  console.log(`Removed movie ${movieId} from ${email}'s watchlist`);
  return { removed: true, message: "Removed from watchlist" };
}
