"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { key } from "@/Requests";
import Image from "next/image";
import BgImage from "../../../public/background.jpg";
import { IoSearchSharp } from "react-icons/io5";
import Spinner from "../components/Spinner";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  // const [cast, setCast] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMovieDetails, setLoadingMovieDetails] = useState(false);
  const [loadingSimilarMovies, setLoadingSimilarMovies] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    // Simulate a delay to represent loading data
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Change the duration as needed

    return () => clearTimeout(timeout);
  }, []);

  const handleInputChange = async (e) => {
    setQuery(e.target.value);
    setIsOpen(true);

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${e.target.value}`
      );
      if (response.data.results) {
        setSuggestions(response.data.results);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = async (movieId) => {
    try {
      setLoadingMovieDetails(true); // Set loading for movie details

      const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}`
      );
      if (movieResponse.data) {
        setMovie(movieResponse.data);
        fetchSimilarMovies(movieId); // Fetch similar movies after movie details are fetched
        setIsOpen(false); // Close suggestions on movie selection
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setLoadingMovieDetails(false); // Reset movie details loading state
    }
  };

  const fetchSimilarMovies = async (movieId) => {
    try {
      const similarResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${key}`
      );
      if (similarResponse.data.results) {
        setSimilarMovies(similarResponse.data.results.slice(0, 6)); // Limiting to first 6 similar movies
      } else {
        setSimilarMovies([]);
      }
    } catch (error) {
      console.error("Error fetching similar movies:", error);
    }
  };

  const handleSimilarMovieClick = async (movieId) => {
    try {
      setLoadingMovieDetails(true); // Set loading for similar movie details

      const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}`
      );
      if (movieResponse.data) {
        setMovie(movieResponse.data);
        setIsOpen(false); // Close suggestions on similar movie selection
      }
    } catch (error) {
      console.error("Error fetching similar movie details:", error);
    } finally {
      setLoadingMovieDetails(false); // Reset similar movie details loading state
    }
  };

  useEffect(() => {
    if (movie) {
      fetchSimilarMovies(movie.id);
    }
  }, [movie]);

  const searchMovie = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}`
      );
      if (response.data.results && response.data.results.length > 0) {
        setMovie(response.data.results[0]); // For simplicity, displaying details of the first result
        // Call function to fetch cast details
        // fetchMovieCast(response.data.results[0].id);
      } else {
        setMovie(null); // Reset movie details if no results found
        setCast([]); // Reset cast details if no results found
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const fetchMovieCast = async (movieId) => {
  //   try {
  //     const castResponse = await axios.get(
  //       `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${key}`
  //     );
  //     if (castResponse.data && castResponse.data.cast.length > 0) {
  //       setCast(castResponse.data.cast);
  //     } else {
  //       setCast([]);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching cast data:", error);
  //   }
  // };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovie();
  };

  const handleOnClick = () => {
    setIsOpen(true);
  };

  return (
    <main className="container relative w-screen">
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <form
            onSubmit={handleSubmit}
            className="w-screen h-48 md:h-24 flex justify-center items-center z-50"
            ref={menuRef}
          >
            {!isOpen && (
              <div
                className="text-white text-2xl border-2 p-1 rounded-full cursor-pointer z-50"
                onClick={handleOnClick}
              >
                <IoSearchSharp />
              </div>
            )}

            {isOpen && (
              <div className="mt-10 mr-4 text-white p-4 rounded-md flex space-x-2 justify-center items-center z-50">
                <input
                  type="text"
                  placeholder="Search for a movie..."
                  value={query}
                  onChange={handleInputChange}
                  className="bg-gray-900 text-white font-semibold px-4 py-2 rounded-full focus:outline-none ring-2 focus:ring-4 ring-yellow-500 mb-2"
                />
                <button
                  type="submit"
                  className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded-full"
                >
                  Search
                </button>
              </div>
            )}
            {isOpen && suggestions.length > 0 && (
              <div className="w-3/4 md:w-2/4 lg:w-1/4 bg-yellow-500 text-black font-semibold rounded-md p-2 absolute top-36 md:top-24 max-h-40 overflow-y-auto z-20">
                {suggestions.map((suggest) => (
                  <div
                    key={suggest.id}
                    onClick={() => handleSuggestionClick(suggest.id)}
                    className="cursor-pointer p-2 hover:bg-gray-200"
                  >
                    {suggest.title}
                  </div>
                ))}
              </div>
            )}
          </form>
          <div>
            {movie ? (
              <div className="w-screen h-screen absolute top-0 left-0 px-4 lg:px-10 py-32 md:px-20 lg:py-40 flex justify-start items-start flex-col ">
                {loadingMovieDetails ? (
                  <Spinner />
                ) : (
                  <div className="w-full h-full flex-col lg:flex-row flex lg:space-x-5 space-y-5 md:space-y-8">
                    <div className="absolute top-0 left-0 w-screen h-screen -z-50">
                      <Image
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt="selected movie"
                        width={1}
                        height={1}
                        sizes="100%"
                        className="w-full h-full"
                      />
                    </div>
                    <div className="w-32 h-60 md:w-36 md:h-72 lg:w-full lg:h-full rounded-xl shadow-xl">
                      <Image
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt="selected movie"
                        width={1}
                        height={1}
                        sizes="100%"
                        className="w-full h-full rounded-xl shadow-lg"
                      />
                    </div>

                    <div className="space-y-4 w-full lg:w-5/6">
                      <h2 className="text-2xl lg:text-4xl text-white font-bold">
                        {movie.title}
                      </h2>
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
                          Runtime:{" "}
                          <span className="font-bold text-white">
                            {movie.runtime ? `${movie.runtime} mins` : "N/A"}
                          </span>
                        </p>
                        <p className="flex flex-col text-yellow-500">
                          Genre:{" "}
                          <span className="font-bold text-white">
                            {movie.genres
                              ? movie.genres
                                  .map((genre) => genre.name)
                                  .join(", ")
                              : "N/A"}
                          </span>
                        </p>
                        {/* Add more fields as needed */}
                      </div>
                      <p className="w-full lg:w-1/2 text-white text-sm">
                        {movie.overview.split(" ").slice(0, 30).join(" ")}
                        {movie.overview.split(" ").length > 30 ? "..." : ""}
                      </p>
                      <div className="text-white mt pt-5 z-20">
                        <h3 className="text-2xl font-bold mb-2">
                          Similar Movies:
                        </h3>
                        {loadingSimilarMovies ? (
                          <Spinner />
                        ) : (
                          <div className="flex overflow-x-auto space-x-4">
                            {similarMovies.map((similarMovie) => (
                              <div
                                key={similarMovie.id}
                                className="w-24 cursor-pointer"
                                onClick={() =>
                                  handleSimilarMovieClick(similarMovie.id)
                                }
                              >
                                <Image
                                  src={`https://image.tmdb.org/t/p/w200${similarMovie.poster_path}`}
                                  alt={similarMovie.title}
                                  width={200}
                                  height={300}
                                  className="rounded-lg"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {/* <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">Cast:</h3>
                  <ul>
                    {cast.map((actor) => (
                      <li key={actor.id}>{actor.name}</li>
                    ))}
                  </ul>
                </div> */}

                <div className="absolute top-0 left-0 w-screen h-screen -z-40 bg-black/50"></div>
              </div>
            ) : (
              // Null Div
              <div className="w-screen h-screen absolute top-0 left-0 -z-10 flex justify-center items-center text-4xl bg-gray-800 text-white">
                <Image
                  src={BgImage}
                  alt="bg image"
                  className="w-full h-full -z-10"
                />
                <div className="absolute w-screen h-screen z-10 top-0 left-0 bg-black/80"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default MovieSearch;
