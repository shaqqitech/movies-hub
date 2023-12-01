"use client";
import React, { useState } from "react";
import axios from "axios";
import { key } from "@/Requests";
import Image from "next/image";

const MovieSearch = () => {
    const [query, setQuery] = useState("");
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
  
    const searchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}`
        );
        if (response.data.results && response.data.results.length > 0) {
          setMovie(response.data.results[0]); // For simplicity, displaying details of the first result
          // Call function to fetch cast details
          fetchMovieCast(response.data.results[0].id);
        } else {
          setMovie(null); // Reset movie details if no results found
          setCast([]); // Reset cast details if no results found
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    const fetchMovieCast = async (movieId) => {
      try {
        const castResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${key}`
        );
        if (castResponse.data && castResponse.data.cast.length > 0) {
          setCast(castResponse.data.cast);
        } else {
          setCast([]);
        }
      } catch (error) {
        console.error("Error fetching cast data:", error);
      }
    };
  
    const handleInputChange = (e) => {
      setQuery(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      searchMovie();
    };

  return (
    <main className="container relative">
      <form onSubmit={handleSubmit} className="w-screen h-24 flex justify-center items-center">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={handleInputChange}
          className="bg-gray-900 text-white font-semibold px-4 py-2 rounded-full focus:outline-none focus:ring-4"
        />
        <button
          type="submit"
          className="ml-1 bg-blue-500 text-white px-4 py-2 rounded-full"
        >
          Search
        </button>
      </form>
      {movie ? (
        <div className="w-screen h-screen p-20 flex justify-start items-start flex-col space-y-4">
          <div className="absolute top-0 left-0 w-screen h-screen -z-50">
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt="selected movie"
              width={1}
              height={1}
              sizes="100%"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-3xl lg:text-4xl text-white font-bold">{movie.title}</h2>
          <div className="flex flow-row w-screen space-x-5">
                <p className="flex flex-col text-yellow-500">
                  Release Date:{" "}
                  <span className="font-bold text-white">
                    {movie.release_date}
                  </span>
                </p>
                <p className="flex flex-col text-yellow-500">
                  Rating:{" "}
                  <span className="font-bold text-white">
                    {movie.vote_average}
                  </span>
                </p>
                <p className="flex flex-col text-yellow-500">
                  Total Votes:{" "}
                  <span className="font-bold text-white">
                    {movie.vote_count}
                  </span>
                </p>
              </div>
          <p className="w-full lg:w-1/2 text-white">{movie.overview}</p>
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-2">Cast:</h3>
            <ul>
              {cast.map((actor) => (
                <li key={actor.id}>{actor.name}</li>
              ))}
            </ul>
          </div>
          <div className="absolute top-0 left-0 w-screen h-screen -z-40 bg-black/50"></div>
        </div>
          ) : (
            <div className="w-screen h-screen absolute top-0 left-0 -z-10 flex justify-center items-center text-4xl bg-gray-800 text-white">Search A movie </div>
          )}
    </main>
  );
};

export default MovieSearch;
