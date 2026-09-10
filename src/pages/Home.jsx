/** @format */

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import MovieCard from "../components/MovieCard";
import Search from "../components/Search";
import {
  getPopularMovies,
  getPopularTVShows,
  searchMovies,
  searchTVShows,
} from "../services/api";
import HomeCarousel from "../components/HomeCarousel";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const {
    data: popularMovies = [],
    isLoading: isLoadingPopular,
    error: popularError,
  } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: getPopularMovies,
  });

  const {
    data: popularTVShows = [],
    isLoading: isLoadingPopularTVShows,
    error: popularTVShowsError,
  } = useQuery({
    queryKey: ["popularTVShows"],
    queryFn: getPopularTVShows,
  });

  const {
    mutate: searchTV,
    data: searchTVResults = [],
    isPending: isSearchingTv,
    error: searchErrorTV,
    reset: resetSearchTV,
  } = useMutation({
    mutationFn: searchTVShows,
    onSuccess: () => setHasSearched(true),
    onError: (err) => {
      console.error(err);
      setHasSearched(true);
    },
  });
  const {
    mutate: search,
    data: searchResults = [],
    isPending: isSearching,
    error: searchError,
    reset: resetSearch,
  } = useMutation({
    mutationFn: searchMovies,
    onSuccess: () => setHasSearched(true),
    onError: (err) => {
      console.error(err);
      setHasSearched(true);
    },
  });

  // Clearing the search box returns to Popular Movies
  const handleSearchQueryChange = (value) => {
    setSearchQuery(value);

    if (hasSearched && value.trim() === "") {
      setHasSearched(false);
      resetSearch();
      resetSearchTV();
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query || isSearching || isSearchingTv) return;
    search(query);
    searchTV(query);
  };

  const movies = hasSearched ? searchResults : popularMovies;
  const tvShows = hasSearched ? searchTVResults : popularTVShows;

  const isLoading = hasSearched
    ? isSearching || isSearchingTv
    : (isLoadingPopular && !hasSearched) ||
      (isLoadingPopularTVShows && !hasSearched);

  const isLoadingTv = hasSearched
    ? isSearchingTv
    : (isLoadingPopular && !hasSearched) ||
      (isLoadingPopularTVShows && !hasSearched);

  const error = hasSearched ? searchError && searchErrorTV : popularError;

  const errorTv = hasSearched
    ? searchError && searchErrorTV
    : popularTVShowsError;

  const isEmpty =
    !isLoading &&
    !error &&
    hasSearched &&
    movies.length === 0 &&
    tvShows.length === 0;

  return (
    <div className='min-h-screen bg-[#0c0c0d] text-[#f3f1ea]'>
      {/* Back link */}
      <div className='container mx-auto px-4 py-5'>
        {" "}
        <Search
          searchQuery={searchQuery}
          setSearchQuery={handleSearchQueryChange}
          onSearch={handleSearch}
        />
        <HomeCarousel
          movies={[...popularMovies.slice(0, 6), ...popularTVShows.slice(0, 6)]}
        />{" "}
        <h2 className="font-['Bebas_Neue'] text-2xl tracking-wide text-[#f2f0ea] mt-8 mb-2">
          {hasSearched ? `Results for "${searchQuery}"` : "Popular Movies"}
        </h2>
        {/* single stable status slot instead of stacked, independently-flickering messages */}
        <div className='min-h-6 mb-4' role='status' aria-live='polite'>
          {isLoading && (
            <p className='text-sm text-[#93919a]'>
              {hasSearched ? "Searching…" : "Loading popular movies…"}
            </p>
          )}

          {error && (
            <p className='text-sm text-[#d64545]'>
              {hasSearched
                ? `Couldn't find results for "${searchQuery}": ${error.message}`
                : `Couldn't load movies: ${error.message}`}
            </p>
          )}

          {isEmpty && (
            <p className='text-sm text-[#93919a]'>
              No matches for "{searchQuery}" — try a different title.
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
      <div className='container mx-auto px-4 py-5'>
        <h2 className="font-['Bebas_Neue'] text-2xl tracking-wide text-[#f2f0ea] mt-8 mb-2">
          {hasSearched ? `Results for "${searchQuery}"` : "Popular TV Shows"}
        </h2>
        {/* single stable status slot instead of stacked, independently-flickering messages */}
        <div className='min-h-6 mb-4' role='status' aria-live='polite'>
          {isLoadingTv && (
            <p className='text-sm text-[#93919a]'>
              {hasSearched ? "Searching…" : "Loading popular TV shows…"}
            </p>
          )}

          {errorTv && (
            <p className='text-sm text-[#d64545]'>
              {hasSearched
                ? `Couldn't find results for "${searchQuery}": ${errorTv.message}`
                : `Couldn't load TV shows: ${errorTv.message}`}
            </p>
          )}

          {isEmpty && (
            <p className='text-sm text-[#93919a]'>
              No matches for "{searchQuery}" — try a different title.
            </p>
          )}
        </div>
        {!isLoadingTv && !errorTv && tvShows.length > 0 && (
          <div className='grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-3.5 sm:gap-5 mt-4'>
            {tvShows.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
