import { Schema, model, models } from "mongoose";

const movieSchema = new Schema(
  {
    id: Number,
    title: String,
    poster_path: String,
    backdrop_path: String,
    release_date: String,
    overview: String,
    vote_average: Number,
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    username: {
      type: String,
      unique: [true, "Username already exists"],
      required: [true, "Username is required"],
    },
    image: {
      type: String,
    },

    // New fields for your movie app
    favorites: [movieSchema],
    watchlist: [movieSchema],
    watched: [movieSchema],
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);
export default User;
