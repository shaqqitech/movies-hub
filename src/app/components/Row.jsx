"use client";
import axios from "axios";
import Image from "next/image";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import React, { useEffect, useRef, useState } from "react";
import Movie from "./Movie";
import bgImage from "../../../public/background.jpg";

const Row = ({ title, fetchURL, rowID }) => {
  const [movies, setMovies] = useState([]);
  const scrollContainer = useRef();

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);
  // console.log(movies);

  const scrollRight = () => {
    if (scrollContainer.current) {
      let slider = document.getElementById("slider" + rowID);
      scrollContainer.current.scrollBy({ left: 500, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollContainer.current) {
      let slider = document.getElementById("slider" + rowID);
      scrollContainer.current.scrollBy({ left: -500, behavior: "smooth" });
    }
  };

  return (
    <main className="py-2 relative">
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src={bgImage}
          alt="selected movie"
          width={1}
          height={1}
          sizes="100%"
          className="w-full h-full -z-10 object-cover"
        />
      </div>
      <div className="absolute w-full h-full top-0 left-0 bg-black/80 z-10"></div>
      <div className="z-30 relative">
        <h2 className="text-white font-bold text-xl md:text-3xl px-3 py-1">
          {title}
        </h2>
        <div className="flex relative items-center">
          <MdChevronLeft
            size={40}
            className="bg-white left-0 cursor-pointer rounded-full absolute opacity-50 hover:opacity-100 z-50 text-black bottom-1/3 transform -translate-y-1/2"
            onClick={scrollLeft}
          />
          <div
            id={"slider" + rowID}
            ref={scrollContainer}
            className="w-full flex overflow-x-auto pl-8 scrollbar-hide whitespace-nowrap scroll-smooth space-x-8"
            style={{ minWidth: "100%" }}
          >
            {movies.map((item, id) => {
              return <Movie item={item} key={id} />;
            })}
          </div>
          <MdChevronRight
            size={40}
            className="bg-white right-0 cursor-pointer rounded-full absolute opacity-50 hover:opacity-100 z-50 text-black bottom-1/3 transform -translate-y-1/2"
            onClick={scrollRight}
          />
        </div>
      </div>
    </main>
  );
};

export default Row;
