"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function addWatched(movie) {
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

  // Check if movie already in watched list
  const alreadyExists = user.watched.some(
    (watchedMovie) => String(watchedMovie.id) === String(movie.id)
  );

  if (alreadyExists) {
    console.log("Movie already in watched");
    return { added: false, message: "Already in watched" };
  }

  user.watched.push(movie);
  await user.save();

  console.log(`Added ${movie.title} to ${email}'s watched`);
  return { added: true, message: "Added to watched" };
}
