/** @format */

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";

const HomeCarousel = ({ movies = [], interval = 6000 }) => {
  const [index, setIndex] = useState(0);

  const goTo = (i) => setIndex((i + movies.length) % movies.length);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // Autoplay
  useEffect(() => {
    if (movies.length <= 1) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [index, movies.length, interval]);

  if (movies.length === 0) return null;

  console.log("HomeCarousel movies:", movies);

  return (
    <div
      className='relative h-[500px] w-full aspect-video overflow-hidden mt-2
    '>
      {movies.map((movie, i) => (
        <Link
          key={movie.id}
          to={`/movie/${movie.id}`}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100 z-10" : "opacity-0 pointer-events-none"
          }`}>
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className='w-full h-full object-top object-cover'
          />

          <div className='absolute inset-0 bg-gradient-to-t from-[#0c0c0d] via-[#0c0c0d]/20 to-transparent' />

          <div className='absolute bottom-6 left-6 right-6'>
            <h3 className="font-['Bebas_Neue'] text-2xl md:text-4xl text-[#f3f1ea] tracking-wide">
              {movie.title ? movie.title : movie.name}
            </h3>
          </div>
        </Link>
      ))}

      <button
        type='button'
        onClick={prev}
        aria-label='Previous slide'
        className='absolute left-3 top-1/2 -translate-y-1/2 z-20
                   w-10 h-10 flex items-center justify-center
                   bg-black/50 border border-white/15 text-[#f3f1ea]
                   hover:border-[#e8b34a] hover:text-[#e8b34a]
                   transition-colors duration-200'>
        <ChevronLeft size={20} />
      </button>

      <button
        type='button'
        onClick={next}
        aria-label='Next slide'
        className='absolute right-3 top-1/2 -translate-y-1/2 z-20
                   w-10 h-10 flex items-center justify-center
                   bg-black/50 border border-white/15 text-[#f3f1ea]
                   hover:border-[#e8b34a] hover:text-[#e8b34a]
                   transition-colors duration-200'>
        <ChevronRight size={20} />
      </button>

      <div className='absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5'>
        {movies.map((_, i) => (
          <button
            key={i}
            type='button'
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2 h-2 transition-colors duration-200 ${
              i === index ? "bg-[#e8b34a]" : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeCarousel;
