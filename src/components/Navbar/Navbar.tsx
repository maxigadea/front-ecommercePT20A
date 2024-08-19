'use client'
import { useAuth } from '@/context/AuthContext';
import categoriesToPreLoad from '@/helpers/categories';
import { userSession } from '@/interfaces/Types';
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Navbar = () => {
  const {userData} = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [windowSize, setWindowSize] = useState([
    1200,
    800,
  ]);

  const windowSizeHandler = () => {
    setWindowSize([window.innerWidth, window.innerHeight]);
    window.innerWidth >= 720 ? setIsMenuOpen(true) : setIsMenuOpen(false)
  };

  useEffect(() => {
    window.addEventListener("resize", windowSizeHandler);
    return () => {
      window.removeEventListener("resize", windowSizeHandler);
    };
  }, [windowSize]);

  return (
    <nav className="flex flex-col items-center justify-between p-4 bg-gray-200 w-full min-w-full gap-2 container">
    <div className="w-full flex flex-row items-center justify-between">
      <Link href="/">
        <img  alt="X LOGO" width={20} height={20} />
      </Link>

      <input
        type="text"
        placeholder="Search..."
        className="w-full max-w-[220px] rounded-md p-[2px] outline-none"
      />

      <div className="flex flex-row items-center justify-between gap-2">
        {
          !userData?.token ? (
            <Link href="/login">
              <p>Sign In</p>
            </Link>
          ) : (
            <Link href="/dashboard">
              <p>Profile: {userData?.userData?.name}</p>
            </Link>
          )
        }
        <div
          className="block md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-4 h-0.5 bg-black my-1"></div>
          <div className="w-4 h-0.5 bg-black my-1"></div>
          <div className="w-4 h-0.5 bg-black my-1"></div>
        </div>
      </div>
    </div>
    {isMenuOpen && (
      windowSize[0] > 720 ?  (
        <div className="w-full p-2 flex flex-row items-center gap-[10px] justify-around">
          {categoriesToPreLoad &&
            categoriesToPreLoad.map((category) => {
              return (
                <Link key={category.id} href={`/category/${category.id}`}>
                  <label className="text-xs font-medium">{category.name}</label>
                </Link>
              );
            })}
        </div>
      ) : (
        <div className="w-full p-2 flex flex-row items-center gap-[10px] justify-around">
         {categoriesToPreLoad &&
            categoriesToPreLoad.map((category) => {
              return (
                <Link key={category.id} href={`/category/${category.id}`}>
                  <label className="text-xs font-medium">{category.name}</label>
                </Link>
              );
          })}
      </div> 
      ) 
    )}
  </nav>
  )
}

export default Navbar