"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Image from "next/image";
import axios from "axios";
import requests from "@/Requests";
import { CiPlay1 } from "react-icons/ci";
import { mulish } from "../fonts";
import Link from "next/link";
import { FaArrowUp } from "react-icons/fa";

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState(null);
  const scrollContainer = useRef(null);

  useEffect(() => {
    try {
      axios
        .get(requests.requestPopular)
        .then((response) => {
          // Set movies state with the response data
          setMovies(response.data.results); // Assuming the movies list is in response.data.results
  
          // Display the details of the first movie by default if selectedMovies is null
          if (selectedMovies === null && response.data.results.length > 0) {
            setSelectedMovies(response.data.results[0]);
          }
        })
        .catch((error) => {
          // Handle any potential errors here
          console.error("Error fetching movies:", error);
        });
    } catch (error) {
      // Catch any synchronous errors that occur within the try block
      console.error("Error within useEffect:", error);
    }
  }, [selectedMovies]); // Add selectedMovies to the dependency array
  

  console.log(movies);

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: 208, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: -208, behavior: "smooth" });
    }
  };

  const handleImageClick = (movie) => {
    setSelectedMovies(movie);
  };

  return (
    <main className="w-screen h-screen bg-gray-950 relative">

      {/* Background Image Box */}
      <div className="absolute w-screen h-screen top-0 left-0">
        {selectedMovies && (
          <Image
            src={`https://image.tmdb.org/t/p/original${selectedMovies.backdrop_path}`}
            alt="selected movie"
            width={1}
            height={1}
            sizes="100%"
            className="w-full h-full animate-pulse object-cover ease-in-out transition-all duration-300 delay-300 transform"
          />
        )}
      </div>
      {/* Grid Box */}
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 z-10 ">
        {/* Left Box */}
        <div
          className={`w-2/3 z-10 flex justify-center lg:justify-end items-start flex-col pl-10 pb-10 relative ${mulish.className}`}
        >
          {selectedMovies && (
            <div className="space-y-3">
              <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-yellow-300">
                {selectedMovies.title}
              </h1>
              <div className="flex flow-row w-screen space-x-5">
                <p className="flex flex-col text-yellow-500">
                  Release Date:{" "}
                  <span className="font-bold text-white">
                    {selectedMovies.release_date}
                  </span>
                </p>
                <p className="flex flex-col text-yellow-500">
                  Rating:{" "}
                  <span className="font-bold text-white">
                    {selectedMovies.vote_average}
                  </span>
                </p>
                <p className="flex flex-col text-yellow-500">
                  Total Votes:{" "}
                  <span className="font-bold text-white">
                    {selectedMovies.vote_count}
                  </span>
                </p>
              </div>
              <p className="w-2/3 lg:w-96 text-sm text-white">
                {selectedMovies.overview.split(" ").slice(0, 30).join(" ")}
                {selectedMovies.overview.split(" ").length > 30 ? "..." : ""}
              </p>
              <div className="w-full flex py-5 space-x-5">
                <button className="w-fit py-1 px-3 bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-black font-bold">
                  Check Detail
                </button>
                <button className="w-24 px-2 py-1 border text-white flex justify-between items-center cursor-pointer hover:bg-yellow-600 hover:text-black font-bold">
                  Watch
                  <CiPlay1 />
                </button>
              </div>
            </div>
          )}
        </div>
        {/* Right Box */}
        <div className="w-full h-full relative z-20">
          <div className="w-full h-1/2 absolute bottom-12 flex justify-center items-end ">
            <MdChevronLeft
              size={40}
              className="bg-white left-0 cursor-pointer rounded-full absolute opacity-50 hover:opacity-100 z-50 text-black bottom-1/3 transform -translate-y-1/2"
              onClick={scrollLeft}
            />
            <div
              ref={scrollContainer}
              className="w-full flex overflow-x-auto pl-8 scrollbar-hide whitespace-nowrap scroll-smooth space-x-6"
              style={{ minWidth: "100%" }}
            >
              {movies.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center cursor-pointer"
                  onClick={() => handleImageClick(item)}
                >
                  <div
                    className={` ${
                      selectedMovies === item ? "w-48 h-80" : " w-44 h-72"
                    } overflow-hidden border-2 rounded-xl relative  transform ease-in-out duration-300`}
                  >
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt="poster"
                      width={1}
                      height={1}
                      sizes="100%"
                      className="w-full h-full"
                    />
                    {/* <div className="w-full h-24 bg-cover flex flex-wrap overflow-hidden justify-center items-end text-white font-semibold z-10 absolute bottom-0 pb-2 bg-gradient-to-t from-black/80 via-black/50 to-black/10">
                      {item.title}
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
            <MdChevronRight
              size={40}
              className="bg-white right-0 cursor-pointer rounded-full absolute opacity-50 hover:opacity-100 z-50 text-black bottom-1/3 transform -translate-y-1/2"
              onClick={scrollRight}
            />
          </div>
        </div>
        <div className="absolute w-full h-full bg-gradient-to-t from-black/90 via-black/60 to-black/5 bottom-0"></div>
      </div>
      <Link
        href={"/search"}
        className="w-screen flex justify-center items-center absolute bottom-2 text-white animate-bounce cursor-pointer space-x-1 z-50"
      >
        <button className="">Watch More Movies </button>
        <span>
          <FaArrowUp />
        </span>
      </Link>
    </main>
  );
};

export default Main;
