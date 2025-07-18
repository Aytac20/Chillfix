import "@/assets/styles/globals.css";
import AuthProvider from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";
export const metadata = {
  title: "ChillFix | Discover & Track Movies",
  keywords:
    "ChillFix, movies, film tracker, movie database, watchlist, TMDB, entertainment, new releases, trending movies, popular films, upcoming movies",
  description:
    "ChillFix is your personal movie companion — discover trending, popular, and upcoming films, save your favorites, and manage your watchlist effortlessly.",
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body className="bg-[#222433] text-white">
          <div className="xl:w-[82rem] bg-[#2b2e41] mx-auto w-full min-h-screen ">
            <Navbar />
            <main className="grid grid-cols-1 xl:grid-cols-[14rem_1fr]">
              <section className="hidden xl:block">
                <Sidebar />
              </section>
              <section>{children}</section>
            </main>
          </div>
          <Toaster position="bottom-center"  />
        </body>
      </html>
    </AuthProvider>
  );
};
export default MainLayout;
