"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import Spinner from "./Spinner";
import { mulish } from "../fonts";

const Data = ({ data, title }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to represent loading data
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Change the duration as needed

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    try {
      axios
        .get(data)
        .then((response) => {
          setMovies(response.data.results);
        })
        .catch((error) => {
          console.log("Error fetching movies", error);
        });
    } catch (error) {
      console.log("Error within useEffect", error);
    }
  }, []);

  return (
    <main className="w-screen min-h-screen bg-black px-10 py-28">
      {loading ? (
        <Spinner />
      ) : (
        <div className="space-y-6">
          <h1 className={`text-white w-full text-center font-bold text-4xl ${mulish.className}`}>
            {title}
          </h1>
          <div className="flex justify-center items-center flex-wrap gap-20">
            {movies.map((item, index) => {
              return (
                <div className="w-48 h-80 space-y-2" key={index}>
                  <div className="w-48 h-72 border-2 rounded-xl shadow-lg overflow-hidden">
                    <Image
                      src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                      alt="Movie Poster"
                      width={1}
                      height={1}
                      sizes="100%"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full flex justify-around items-center">
                    <button className="w-3/4 px-2 py-1 border-2 bg-yellow-400 hover:bg-yellow-600 rounded-xl font-semibold text-sm ">
                      Add To Favorite
                    </button>
                    <span className="text-white h-full text-2xl cursor-pointer">
                      <FaRegHeart />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
};

export default Data;
