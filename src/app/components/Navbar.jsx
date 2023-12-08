"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { RiMenu3Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
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
        {/* Profile Logo */}
        <p className="cursor-pointer">
          <IoPersonCircleSharp />
        </p>
        {/* Menubar */}
        <p className="cursor-pointer relative" onClick={handleOnClick}>
          {isOpen ? <RxCross2 /> : <RiMenu3Line />}
          {isOpen && (
            <ul
              ref={menuRef}
              className="absolute top-8 right-3 w-fit border-2 py-2 px-3 text-sm font-semibold rounded-lg space-y-3 bg-white text-black flex flex-col"
            >
              <Link href={"/"}>Home</Link>
              <Link href={"/"}>About</Link>
              <Link href={"/"}>Contact</Link>
              <Link href={"/"}>Feedback</Link>
            </ul>
          )}
        </p>
      </div>
    </main>
  );
};

export default Navbar;
