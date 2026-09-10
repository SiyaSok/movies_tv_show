/** @format */

import { useState } from "react";
import {
  Star,
  Heart,
  Clock,
  Globe,
  ExternalLink,
  ChevronLeft,
} from "lucide-react";
import { Link } from "react-router";
import { useMovieContext } from "../context/MovieContext";

const MovieInfo = ({ movie }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);
  const [showFullOverview, setShowFullOverview] = useState(false);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const specs = [
    { label: "Status", value: movie.status },
    { label: "Release date", value: formatDate(movie.release_date) },
    { label: "Runtime", value: `${movie.runtime} min` },
    { label: "Budget", value: formatCurrency(movie.budget) },
    { label: "Revenue", value: formatCurrency(movie.revenue) },
  ];

  return (
    <div className='min-h-screen bg-[#0c0c0d] text-[#f3f1ea]'>
      {/* Back link */}
      <div className='container mx-auto px-4 py-5'>
        <Link
          to='/'
          className='inline-flex items-center gap-1.5 text-sm text-[#93919a] hover:text-[#e8b34a] transition-colors duration-200'>
          <ChevronLeft size={16} />
          <span>Back to movies</span>
        </Link>
      </div>

      {/* Hero */}
      <div className='relative'>
        <div className='relative h-[38vh] md:h-[46vh] lg:h-[54vh] overflow-hidden'>
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-[#0c0c0d] via-[#0c0c0d]/40 to-transparent' />
          <div className='absolute inset-0 bg-gradient-to-r from-black/70 to-transparent' />
        </div>

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
                  <span>
                    {favorite ? "In your favorites" : "Add to favorites"}
                  </span>
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
      </div>

      {/* Content */}
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-10'>
          {/* Main column */}
          <div className='lg:col-span-2'>
            <section className='mb-10'>
              <div className='flex items-center gap-2 mb-3'>
                <span className='w-1 h-4 bg-[#e8b34a]' />
                <h2 className='text-lg font-semibold'>Overview</h2>
              </div>
              <p
                className={`text-[#c9c7cf] leading-relaxed max-w-[65ch] ${
                  !showFullOverview && "line-clamp-4"
                }`}>
                {movie.overview}
              </p>
              {movie.overview.length > 200 && (
                <button
                  onClick={() => setShowFullOverview(!showFullOverview)}
                  className='mt-2 text-sm text-[#e8b34a] hover:text-[#f0c470] font-medium'>
                  {showFullOverview ? "Show less" : "Read more"}
                </button>
              )}
            </section>

            <div className='h-px bg-white/10 mb-10' />

            <section>
              <div className='flex items-center gap-2 mb-5'>
                <span className='w-1 h-4 bg-[#e8b34a]' />
                <h2 className='text-lg font-semibold'>Production</h2>
              </div>

              <div className='mb-6'>
                <h3 className='text-sm text-[#93919a] mb-3'>
                  Production companies
                </h3>
                <div className='flex flex-wrap gap-3'>
                  {movie.production_companies.map((company) => (
                    <div
                      key={company.id}
                      className='flex items-center gap-2 border border-white/10 px-3 py-2'>
                      {company.logo_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                          alt={company.name}
                          className='h-5 object-contain brightness-0 invert opacity-80'
                        />
                      ) : (
                        <span className='text-sm text-[#c9c7cf]'>
                          {company.name}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className='text-sm text-[#93919a] mb-3'>
                  Production countries
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {movie.production_countries.map((country) => (
                    <span
                      key={country.iso_3166_1}
                      className='flex items-center gap-1.5 border border-white/10 px-3 py-1 text-sm text-[#c9c7cf]'>
                      <Globe size={13} />
                      {country.name}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className='space-y-10'>
            {/* Rating */}
            <div>
              <div className='flex items-baseline gap-3'>
                <span className="font-['Bebas_Neue'] text-6xl leading-none text-[#e8b34a]">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className='text-[#7a7880] text-sm'>/ 10</span>
              </div>
              <div className='flex items-center gap-1 mt-2'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.round(movie.vote_average / 2)
                        ? "text-[#e8b34a] fill-[#e8b34a]"
                        : "text-white/15"
                    }
                  />
                ))}
              </div>
              <p className='text-xs text-[#7a7880] mt-2'>
                From {movie.vote_count.toLocaleString()} ratings
              </p>
            </div>

            <div className='h-px bg-white/10' />

            {/* Spec sheet — receipt-style dotted rows */}
            <div>
              <h3 className='text-sm text-[#93919a] mb-3'>Details</h3>
              <dl className='space-y-2.5'>
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className='flex items-baseline justify-between gap-2 text-sm'>
                    <dt className='text-[#93919a] whitespace-nowrap'>
                      {spec.label}
                    </dt>
                    <span className='flex-1 border-b border-dotted border-white/15 translate-y-[-3px]' />
                    <dd className='font-medium whitespace-nowrap'>
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className='h-px bg-white/10' />

            {/* Languages */}
            <div>
              <h3 className='text-sm text-[#93919a] mb-3'>Languages</h3>
              <div className='flex flex-wrap gap-2'>
                {movie.spoken_languages.map((lang) => (
                  <span
                    key={lang.iso_639_1}
                    className='border border-white/10 px-2.5 py-1 text-xs text-[#c9c7cf]'>
                    {lang.english_name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
