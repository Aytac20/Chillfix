"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function addFavorite(movie) {
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

const alreadyExists = user.favorites.some(
  (fav) => String(fav.id) === String(movie.id)
);
  if (alreadyExists) {
    console.log("Movie already in favorites");
    return { added: false, message: "Already in favorites" };
  }

  user.favorites.push(movie);
  await user.save();

  console.log(`Added ${movie.title} to ${email}'s favorites`);
  return { added: true, message: "Added to favorites" };
}
