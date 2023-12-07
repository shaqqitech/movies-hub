import Image from "next/image";
import React from "react";

const Movie = ({ item }) => {
  return (
    <main>
      <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 z-30">
        <div className="w-44 h-72 overflow-hidden border-2 rounded-xl">
          <Image
            src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
            alt={item.title}
            width={1}
            height={1}
            sizes="100%"
            className="w-full h-full"
          />
        </div>
      </div>
    </main>
  );
};

export default Movie;
