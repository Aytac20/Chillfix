import connectDB from "@/config/database";
import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful sign-in
    async signIn({ profile }) {
      await connectDB();
      const userExists = await User.findOne({ email: profile.email });

      if (!userExists) {
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }

      return true;
    },

    // Runs whenever a session is checked
    async session({ session }) {
      await connectDB();
      const user = await User.findOne({ email: session.user.email });
      session.user.id = user._id.toString();
      session.user.favorites = user.favorites || [];
      session.user.watched = user.watched || [];
      session.user.watchlist = user.watchlist || [];

      return session;
    },
  },
};
