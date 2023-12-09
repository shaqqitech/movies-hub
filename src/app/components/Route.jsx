"use client";
import { key } from "@/Requests";
import { add, remove } from "@/store/cartSlice";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";

const Route = ({ params }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${params}?api_key=${key}&language=en-US`
        );
        if (response.status === 200) {
          setMovieDetails(response.data);
        } else {
          throw new Error("Failed to fetch movie details");
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (params) {
      fetchData();
    }
  }, [params]);

  const isItemInCart = (itemId) => {
    return cart.some((cartItem) => cartItem.id === itemId);
  };

  const addToCart = (item) => {
    if (!isItemInCart(item.id)) {
      dispatch(add(item));
    }
  };

  const removeFromCart = (productId) => {
    const index = cart.findIndex((cart) => cart.id === productId);

    if (index !== -1) {
      dispatch(remove(productId));
    }
  };

  useEffect(() => {
    // Simulate a delay to represent loading data
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Change the duration as needed

    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="w-screen h-screen relative">
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {movieDetails && (
            <div className="w-screen h-screen absolute top-0 left-0 px-4 lg:px-10 py-32 md:px-20 lg:py-40 flex justify-start items-start flex-col ">
              <div className="w-full h-full flex-col lg:flex-row flex lg:space-x-5 space-y-5 md:space-y-8">
                <div className="absolute top-0 left-0 w-screen h-screen -z-50">
                  <Image
                    src={`https://image.tmdb.org/t/p/original${movieDetails?.backdrop_path}`}
                    alt="selected movie"
                    width={1}
                    height={1}
                    sizes="100%"
                    className="w-full h-full"
                  />
                </div>
                <div className="w-32 h-60 md:w-36 md:h-72 lg:w-full lg:h-full rounded-xl shadow-xl">
                  <Image
                    src={`https://image.tmdb.org/t/p/original${movieDetails?.poster_path}`}
                    alt={movieDetails?.title}
                    width={1}
                    height={1}
                    sizes="100%"
                    className="w-full h-full rounded-xl shadow-lg"
                  />
                </div>

                <div className="space-y-4 w-full flex flex-col justify-center lg:w-5/6">
                  <h2 className="text-2xl lg:text-4xl text-white font-bold">
                    {movieDetails?.title}
                  </h2>
                  <div className="flex flow-row w-screen space-x-5">
                    <p className="flex flex-col text-yellow-500">
                      Release Date:{" "}
                      <span className="font-bold text-white">
                        {movieDetails?.release_date}
                      </span>
                    </p>
                    <p className="flex flex-col text-yellow-500">
                      Rating:{" "}
                      <span className="font-bold text-white">
                        {movieDetails?.vote_average}
                      </span>
                    </p>
                    <p className="flex flex-col text-yellow-500">
                      Runtime:{" "}
                      <span className="font-bold text-white">
                        {movieDetails?.runtime
                          ? `${movieDetails?.runtime} mins`
                          : "N/A"}
                      </span>
                    </p>
                    <p className="flex flex-col text-yellow-500">
                      Genre:{" "}
                      <span className="font-bold text-white">
                        {movieDetails?.genres
                          ? movieDetails?.genres
                              .map((genre) => genre.name)
                              .join(", ")
                          : "N/A"}
                      </span>
                    </p>
                    {/* Add more fields as needed */}
                  </div>
                  <p className="w-full lg:w-1/2 text-white text-sm">
                    {/* {params.overview.split(" ").slice(0, 30).join(" ")}
                        {params.overview.split(" ").length > 30 ? "..." : ""} */}
                    {movieDetails?.overview}
                  </p>
                  <p className="w-full lg:w-1/2 text-white text-sm flex items-center space-x-3">
                    <span className="font-semibold text-xl">Add to Favorite</span>{" "}
                    {isItemInCart(movieDetails?.id) ? (
                      <FaHeart
                        className="cursor-pointer text-red-500 text-2xl"
                        onClick={() => removeFromCart(movieDetails?.id)}
                      />
                    ) : (
                      <FaRegHeart
                        className="cursor-pointer text-2xl"
                        onClick={() => addToCart(movieDetails)}
                      />
                    )}
                  </p>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-screen h-screen -z-40 bg-black/50"></div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Route;
