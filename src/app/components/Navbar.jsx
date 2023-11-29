import Link from 'next/link'
import React from 'react'
import { IoPersonCircleSharp, IoSearchOutline } from "react-icons/io5";
import { RiMenu3Line } from "react-icons/ri";
import { mulish } from '../fonts';

const Navbar = () => {
  return (
    <main className='w-screen flex justify-between items-center px-10 py-4'>
        <Link href={'/'} className={`text-3xl font-bold ${mulish.className}`}>Movies-Hub</Link>
        <div className='flex space-x-5 text-xl'>
            <p><IoPersonCircleSharp className='cursor-pointer' /></p>
            <p><IoSearchOutline className='cursor-pointer' /></p>
            <p><RiMenu3Line className='cursor-pointer' /></p>
        </div>
    </main>
  )
}

export default Navbar