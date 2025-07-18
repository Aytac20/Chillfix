"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function removeFavorite(movieId) {
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

  const beforeLength = user.favorites.length;

  // Filter out the movie by ID
  user.favorites = user.favorites.filter(
    (fav) => String(fav.id) !== String(movieId)
  );

  const afterLength = user.favorites.length;

  if (beforeLength === afterLength) {
    return { removed: false, message: "Movie not in favorites" };
  }

  await user.save();

  console.log(`Removed movie ${movieId} from ${email}'s favorites`);
  return { removed: true, message: "Removed from favorites" };
}
