/** @format */

import { useQuery } from "@tanstack/react-query";

import MovieCard from "../components/MovieCard";

import { getTVByGenre } from "../services/api";
import { useParams } from "react-router";
import Pagination from "../components/Pagination";
import { useState } from "react";

const TVGenre = () => {
  const params = useParams();
  const [page = 1, setPage] = useState(1);

  const {
    data: tvShows = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tvDetails", params.id, page],
    queryFn: () => getTVByGenre(params.id, page),
  });

  console.log("TV Shows:", tvShows);

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
          {params.name ? `Results for "${params.name}"` : "Popular TV Shows"}
        </h2>
        {/* single stable status slot instead of stacked, independently-flickering messages */}
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
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={tvShows?.total_pages}
        isLoading={isLoading}
      />
    </div>
  );
};

export default TVGenre;
