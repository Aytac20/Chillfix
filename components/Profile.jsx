"use client";
import Link from "next/link";
import profileDefault from "@/assets/images/profile.png";
import Image from "next/image";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
const Profile = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  return (
    <div className="relative ml-3">
      <div>
        <button
          type="button"
          className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          onClick={() => {
            setIsProfileMenuOpen((prev) => !prev);
          }}
        >
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">Open user menu</span>
          <Image
            className="h-8 w-8 rounded-full"
            alt=""
            src={profileImage || profileDefault}
            width={32}
            height={32}
          />
        </button>
      </div>

      {/* <!-- Profile dropdown --> */}
      {isProfileMenuOpen && (
        <div
          className=" absolute right-0 z-10 mt-3 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          tabIndex="-1"
        >
          
          <Link
            href="/watchlist"
            className="block px-4 py-2 text-sm text-gray-700"
            tabIndex="-1"
          >
            Watchlist
          </Link>
          <Link
            href="/favorites"
            className="block px-4 py-2 text-sm text-gray-700"
            tabIndex="-1"
          >
            Favorites
          </Link>
          <Link
            href="/watched"
            className="block px-4 py-2 text-sm text-gray-700"
            tabIndex="-1"
          >
            Watched
          </Link>
          <button
            className="block px-4 py-2 text-sm text-gray-700"
            tabIndex="-1"
            onClick={() => {
              signOut();
              isProfileMenuOpen(false);
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
