'use client'
import requests from '@/Requests'
import React, { useRef } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { category } from '../data/data'

const Categories = () => {
    const scrollContainer = useRef(null);

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
  return (
    <main className='relative w-screen h-5 flex justify-center items-center'>
          <div className="w-full lg:w-1/2 absolute flex justify-center items-end ">
            <MdChevronLeft
              size={30}
              className=" left-0 cursor-pointer rounded-full absolute opacity-50 hover:opacity-100 z-50 text-white top-1/2 transform -translate-y-1/2"
              onClick={scrollLeft}
            />
            <div
              ref={scrollContainer}
              className="w-full flex overflow-x-auto scrollbar-hide whitespace-nowrap scroll-smooth space-x-6"
              style={{ minWidth: "100%" }}
            >
                {category.map((title, ind) => {
                    return(
                        <ul key={ind}>
                            <li className='text-white text-xl'>{title}</li>
                        </ul>
                    )
                })}
            </div>
            <MdChevronRight
              size={30}
              className=" right-0 cursor-pointer rounded-full absolute opacity-50 hover:opacity-100 z-50 text-white top-1/2 transform -translate-y-1/2"
              onClick={scrollRight}
            />
          </div>
    </main>
  )
}

export default Categories
