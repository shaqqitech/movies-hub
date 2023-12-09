"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { RiMenu3Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { FaHeart } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { mulish } from "../fonts";
import { useMediaQuery } from "react-responsive";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isSmallDevice = useMediaQuery({ query: "(max-width: 768px)" });
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main className="w-screen flex justify-between items-center px-10 py-4">
      {/* Logo */}
      <Link href={"/"} className={`text-3xl font-bold ${mulish.className}`}>
        {isSmallDevice ? (
          <div className="flex">M<p className="italic text-yellow-400">H</p></div>
        ) : (
          <div className="flex">Movies<p className="italic text-yellow-400">Hub</p></div>
        )}
      </Link>
      {/* Menus Tabs */}
      <div className="flex space-x-5 text-xl">
        {/* Search Logo */}
      <Link href={'/search'} className="cursor-pointer hover:text-yellow-500">
          <IoSearchSharp />
        </Link>
        {/* Favorite Movies Logo */}
        <Link href={'/favorites'} className="cursor-pointer hover:text-red-600">
          <FaHeart />
        </Link>
        {/* Profile Logo */}
        <Link href={'/signup'} className="cursor-pointer hover:text-yellow-500">
          <IoPersonCircleSharp />
        </Link>
        {/* Menubar */}
        <p className="cursor-pointer relative hover:text-yellow-500" onClick={handleOnClick}>
          {isOpen ? <RxCross2 /> : <RiMenu3Line />}
          {isOpen && (
            <ul
              ref={menuRef}
              className="absolute top-8 right-3 w-32 py-2 px-3 text-sm font-semibold rounded-lg space-y-3 bg-yellow-500 text-black flex flex-col"
            >
              <Link href={"/airing-today"} className="hover:text-yellow-700">Airing Today</Link>
              <Link href={"/latest"} className="hover:text-yellow-700">Latest</Link>
              <Link href={"/now-playing"} className="hover:text-yellow-700">Now Playing</Link>
              <Link href={"/popular"} className="hover:text-yellow-700">Popular</Link>
              <Link href={"/playing-on-tv"} className="hover:text-yellow-700">Playing On Tv</Link>
              <Link href={"/popular-tv"} className="hover:text-yellow-700">Tv Popular</Link>
              <Link href={"/top-rated"} className="hover:text-yellow-700">Top Rated</Link>
              <Link href={"/trending"} className="hover:text-yellow-700">Trending</Link>
              <Link href={"/top-rated-tv"} className="hover:text-yellow-700">Tv Top-Rated</Link>
              <Link href={"/upcoming"} className="hover:text-yellow-700">Up Coming</Link>
            </ul>
          )}
        </p>
      </div>
    </main>
  );
};

export default Navbar;
