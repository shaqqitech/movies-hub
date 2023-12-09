"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import Spinner from "./Spinner";
import { mulish } from "../fonts";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "@/store/cartSlice";
import Link from "next/link";

const Data = ({ data, title, route }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

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
    <main className="w-screen min-h-screen bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 px-10 py-28">
      {loading ? (
        <Spinner />
      ) : (
        <div className="space-y-6">
          <h1
            className={`text-white w-full text-center font-bold text-4xl ${mulish.className}`}
          >
            {title}
          </h1>
          <div className="flex justify-center items-center flex-wrap gap-20">
            {movies.map((item, index) => {
              const addedToCart = isItemInCart(item.id);
              return (
                <div className="w-48 h-80 space-y-2" key={index}>
                  <div className="w-48 h-72 border-2 rounded-xl shadow-lg overflow-hidden cursor-pointer">
                    <Link href={`/${route}/${item.id}`}>
                      <Image
                        src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                        alt="Movie Poster"
                        width={1}
                        height={1}
                        sizes="100%"
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  </div>
                  <div className="w-full flex justify-around items-center">
                    <button
                      className="w-3/4 px-2 py-1 border-2 bg-yellow-400 hover:bg-yellow-600 rounded-xl font-semibold text-sm "
                      onClick={() => addToCart(item)}
                    >
                      {addedToCart ? "ADDED" : "Add to Favorites"}
                    </button>
                    <span
                      className="text-white h-full text-2xl cursor-pointer"
                      onClick={() => removeFromCart(item.id)}
                    >
                      {addedToCart ? (
                        <FaHeart className="text-red-600" />
                      ) : (
                        <FaRegHeart />
                      )}
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
