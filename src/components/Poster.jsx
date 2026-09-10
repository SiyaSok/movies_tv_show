/** @format */

import { Clock, ExternalLink, Heart, Star } from "lucide-react";
import { useMovieContext } from "../context/MovieContext";

const Poster = ({ movie }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }
  return (
    <div className='container mx-auto px-4 relative -mt-28 md:-mt-36 lg:-mt-44'>
      <div className='flex flex-col md:flex-row gap-6 md:gap-8'>
        {/* Poster */}
        <div className='flex-shrink-0 w-44 md:w-52 lg:w-60 mx-auto md:mx-0'>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className='w-full border border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)]'
          />
        </div>

        {/* Details */}
        <div className='flex-1 pb-2'>
          <h1 className="font-['Bebas_Neue'] text-4xl md:text-5xl lg:text-6xl tracking-wide leading-none mb-2">
            {movie.title}
          </h1>

          {movie.tagline && (
            <p className='text-base md:text-lg text-[#e8b34a]/80 italic mb-4'>
              {movie.tagline}
            </p>
          )}

          <div className='flex flex-wrap items-center gap-x-3 gap-y-2 text-sm mb-5 text-[#c9c7cf]'>
            <span className='flex items-center gap-1.5'>
              <Star size={16} className='text-[#e8b34a] fill-[#e8b34a]' />
              <span className='font-semibold text-white'>
                {movie.vote_average.toFixed(1)}
              </span>
              <span className='text-[#7a7880]'>
                ({movie.vote_count.toLocaleString()})
              </span>
            </span>

            <span className='w-px h-3 bg-white/15' />

            <span className='flex items-center gap-1.5'>
              <Clock size={16} />
              {movie.runtime} min
            </span>

            <span className='w-px h-3 bg-white/15' />

            <span>{movie.release_date?.slice(0, 4)}</span>

            <span className='w-px h-3 bg-white/15' />

            <span>{movie.original_language.toUpperCase()}</span>
          </div>

          {/* Actions */}
          <div className='flex flex-wrap gap-3 mb-5'>
            <button
              onClick={onFavoriteClick}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                favorite
                  ? "bg-[#d64545] text-white"
                  : "border border-white/20 text-white hover:border-[#e8b34a] hover:text-[#e8b34a]"
              }`}>
              <Heart size={17} fill={favorite ? "currentColor" : "none"} />
              <span>{favorite ? "In your favorites" : "Add to favorites"}</span>
            </button>

            {movie.homepage && (
              <a
                href={movie.homepage}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 px-4 py-2 text-sm font-medium border border-white/20 text-white hover:border-[#e8b34a] hover:text-[#e8b34a] transition-colors duration-200'>
                <ExternalLink size={17} />
                <span>Official site</span>
              </a>
            )}
          </div>

          {/* Genres */}
          <div className='flex flex-wrap gap-2'>
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className='px-2.5 py-1 border border-white/15 text-xs text-[#c9c7cf]'>
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poster;
