/** @format */

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getMovieGenres } from "../services/moviesApi";
import { getTvGenres } from "../services/tvshowsApi";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTV, setIsOpenTV] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownRefTV = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const { data: Genres = [] } = useQuery({
    queryKey: ["movieGenres"],
    queryFn: getMovieGenres,
  });

  const { data: TvGenres = [] } = useQuery({
    queryKey: ["tvGenres"],
    queryFn: getTvGenres,
  });

  return (
    <nav className='bg-gray-900 text-white shadow-lg px-6 py-4 flex items-center justify-between'>
      <button
        type='button'
        className='flex items-center gap-1.5 text-2xl font-bold text-white hover:text-gray-300 transition-colors duration-200'>
        Movies
      </button>

      <div className='flex items-center gap-6'>
        <Link
          to='/'
          className='text-gray-300 hover:text-white transition-colors duration-200 font-medium'>
          Home
        </Link>
        <div className='relative' ref={dropdownRef}>
          <button
            type='button'
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-haspopup='true'
            className='flex items-center gap-1  hover:text-gray-300 transition-colors duration-200 text-gray-300  font-medium'>
            Movies
            <ChevronDown
              size={18}
              className={`mt-1 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <div
              role='menu'
              className='absolute left-0 top-full mt-2 w-48 bg-gray-800 border border-white/10 shadow-xl py-1 z-50'>
              {Genres.map((category) => (
                <Link
                  key={category.name}
                  to={`/genre/${category.id}`}
                  role='menuitem'
                  onClick={() => setIsOpen(false)}
                  className='block px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-150'>
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className='relative' ref={dropdownRefTV}>
          <button
            type='button'
            onClick={() => setIsOpenTV((prev) => !prev)}
            aria-expanded={isOpenTV}
            aria-haspopup='true'
            className='flex items-center gap-1  hover:text-gray-300 transition-colors duration-200 text-gray-300  font-medium'>
            TV Shows
            <ChevronDown
              size={18}
              className={`mt-1 transition-transform duration-200 ${
                isOpenTV ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpenTV && (
            <div
              role='menu'
              className='absolute left-0 top-full mt-2 w-48 bg-gray-800 border border-white/10 shadow-xl py-1 z-50'>
              {TvGenres.map((category) => (
                <Link
                  key={category.name}
                  to={`/tv-genre/${category.id}`}
                  role='menuitem'
                  onClick={() => setIsOpenTV(false)}
                  className='block px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-150'>
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link
          to='/favorites'
          className='text-gray-300 hover:text-white transition-colors duration-200 font-medium'>
          Favorites
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
