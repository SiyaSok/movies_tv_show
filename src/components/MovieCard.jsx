/** @format */

import { Heart, Star } from "lucide-react";
import { useMovieContext } from "../context/MovieContext";
import { Link } from "react-router";

const MovieCard = ({ movie, isTVShow }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }
  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 w-full max-w-[250px]'>
      <Link to={isTVShow ? `/tv-shows/${movie.id}` : `/movie/${movie.id}`}>
        <div className='relative'>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            loading='lazy'
            className='w-full h-auto object-cover'
          />

          <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none' />

          <div className='absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md text-white flex items-center gap-1 text-xs'>
            <Star size={13} fill='currentColor' className='text-yellow-400' />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>

          <button
            className='absolute top-2 right-2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white transition-all duration-200 hover:scale-110'
            onClick={onFavoriteClick}
            aria-label={`Favorite ${movie.title}`}>
            <Heart
              size={18}
              fill={favorite ? "currentColor" : "none"}
              className={favorite ? "text-red-500" : "text-white"}
            />
          </button>
        </div>
        <div className='p-3'>
          <h3 className='font-semibold text-gray-800 dark:text-white text-sm truncate'>
            {movie.title}
          </h3>

          <div className='flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1'>
            <span>{movie.release_date?.slice(0, 4)}</span>
            <span className='w-1 h-1 rounded-full bg-gray-400' />
            <span>{movie.original_language.toUpperCase()}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
