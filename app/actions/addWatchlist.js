"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function addWatchlist(movie) {
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

  // Check if movie is already in watchlist
  const alreadyExists = user.watchlist.some(
    (watch) => String(watch.id) === String(movie.id)
  );
  if (alreadyExists) {
    console.log("Movie already in watchlist");
    return { added: false, message: "Already in watchlist" };
  }

  // Add movie to watchlist array
  user.watchlist.push(movie);
  await user.save();

  console.log(`Added ${movie.title} to ${email}'s watchlist`);
  return { added: true, message: "Added to watchlist" };
}
