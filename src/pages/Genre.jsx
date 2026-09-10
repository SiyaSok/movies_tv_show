/** @format */

import { useQuery } from "@tanstack/react-query";
import MovieCard from "../components/MovieCard";
import { getMoviesByGenre } from "../services/moviesApi";
import { useParams } from "react-router";
import { useState } from "react";
import Pagination from "../components/Pagination";

const Genres = () => {
  const params = useParams();
  const [page = 1, setPage] = useState(1);
  const {
    data: movies = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movieDetails", params.id, page],
    queryFn: () => getMoviesByGenre({ genreId: params.id, page }),
  });

  return (
    <div className='min-h-screen bg-[#0c0c0d] text-[#f3f1ea]'>
      {/* Back link */}
      <div className='container mx-auto px-4 py-5'>
        {" "}
        {/* <Search
          searchQuery={searchQuery}
          setSearchQuery={handleSearchQueryChange}
          onSearch={handleSearch}
        /> */}
        <h2 className="font-['Bebas_Neue'] text-2xl tracking-wide text-[#f2f0ea] mt-8 mb-2">
          {params.name ? `Results for "${params.name}"` : "Popular Movies"}
        </h2>
        {/* single stable status slot instead of stacked, independently-flickering messages */}
        <div className='min-h-6 mb-4' role='status' aria-live='polite'>
          {isLoading && (
            <p className='text-sm text-[#93919a]'>"Loading movies…"</p>
          )}

          {error && (
            <p className='text-sm text-[#d64545]'>
              `Couldn't load movies: ${error.message}`
            </p>
          )}
        </div>
        {!isLoading && !error && movies.length > 0 && (
          <div className='grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-3.5 sm:gap-5 mt-4'>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={movies?.total_pages}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Genres;
