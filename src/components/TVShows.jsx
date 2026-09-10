/** @format */

import { useQuery } from "@tanstack/react-query";

import MovieCard from "./MovieCard";

import { getTvShows } from "../services/api";

const TVShows = () => {
  const {
    data: tvShows = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getTvShows"],
    queryFn: getTvShows,
  });

  console.log("TV Shows Data:", tvShows);

  return (
    <div className='min-h-screen bg-[#0c0c0d] text-[#f3f1ea]'>
      {/* Back link */}
      <div className='container mx-auto'>
        <div className='min-h-6 mb-4' role='status' aria-live='polite'>
          {isLoading && (
            <p className='text-sm text-[#93919a]'>"Loading TV shows…"</p>
          )}

          {error && (
            <p className='text-sm text-[#d64545]'>
              `Couldn't load TV shows: ${error.message}`
            </p>
          )}
        </div>
        {!isLoading && !error && tvShows.length > 0 && (
          <div className='grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-3.5 sm:gap-5 mt-4'>
            {tvShows.map((tvShow) => (
              <MovieCard key={tvShow.id} movie={tvShow} isTVShow={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TVShows;
