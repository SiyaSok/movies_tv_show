/** @format */

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getTVShowDetails } from "../services/api";
import MovieInfo from "../components/MovieInfo";
import MovieSkeleton from "../components/MovieSkeleton";
import MovieVideo from "../components/MoveVideo";
import MovieReviews from "../components/MovieReviews";

const TVShowDetails = () => {
  const params = useParams();

  const {
    data: TVShowDetails,
    isLoading: isLoadingMovie,
    error: movieError,
  } = useQuery({
    queryKey: ["TVShowDetails", params.id],
    queryFn: () => getTVShowDetails(params.id),
  });

  // Loading state with skeleton
  if (isLoadingMovie) {
    return <MovieSkeleton />;
  }

  // Error state
  if (movieError) {
    return (
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center'>
        <div className='text-center max-w-md mx-auto px-4'>
          <div className='text-6xl mb-4'>😢</div>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
            Failed to load movie
          </h2>
          <p className='text-gray-600 dark:text-gray-300 mb-4'>
            {movieError.message ||
              "Something went wrong. Please try again later."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className='px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200'>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!TVShowDetails) {
    return (
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-6xl mb-4'>🎬</div>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
            Movie not found
          </h2>
          <p className='text-gray-600 dark:text-gray-300'>
            The movie you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <MovieInfo movie={TVShowDetails} />
      <MovieVideo id={params.id} />
      <MovieReviews id={params.id} />
    </>
  );
};

export default TVShowDetails;
