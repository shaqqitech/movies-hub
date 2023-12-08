"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { mulish } from "../fonts";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "@/store/cartSlice";

const Data = ({ data, title }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  //functinality for redux and redux toolkit
  const products = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCart = (productId) => {
    //Checking if the prodcut is available in the cart list
    const index = products.findIndex((product) => product.id === productId);

    //If the product is available in the cart then remove it from the cart list by using its index value
    //findindex method return -1 if the given condition is false
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
    <main className="w-screen min-h-screen bg-black px-10 py-28">
      {loading ? (
        <Spinner />
      ) : (
        <div className="space-y-6">
          <h1
            className={`text-white w-full text-center font-bold text-4xl ${mulish.className}`}
          >
            Your Favorites
          </h1>
          <div className="flex justify-center items-center flex-wrap gap-20">
            {products.length === 0 ? (
              <div className="w-full h-72 grid place-content-center text-center text-white">
                <div className="p-5 space-y-7">
                  <p className="font-bold text-3xl text-yellow-500">No Favorite Found</p>
                  <p className="text-lg w-80">
                    Please Click on the Menubar and Add Some Movies
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center flex-wrap gap-20">
                {products.map((item, index) => {
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
                        <button
                          className="w-3/4 px-2 py-1 border-2 bg-yellow-400 hover:bg-yellow-600 rounded-xl font-semibold text-sm "
                          onClick={() => removeFromCart(item.id)}
                        //   onClick={() => addToCart(item)}
                        >
                            Remove
                        </button>
                        <span className="text-red-600 h-full text-2xl cursor-pointer">
                          <FaHeart />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Data;
