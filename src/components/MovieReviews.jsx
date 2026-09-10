/** @format */

import { useQuery } from "@tanstack/react-query";
import { getMovieReviews } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import ReviewItem from "./ReviewItem";
import ReviewSkeleton from "./ReviewSkeleton";
import { MessageCircle } from "lucide-react";

const MovieReviews = ({ id }) => {
  const {
    data: reviews = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movieReviews", id],
    queryFn: () => getMovieReviews(id),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  if (isLoading) {
    return (
      <div className='space-y-2'>
        {[...Array(3)].map((_, i) => (
          <ReviewSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='flex flex-col items-center justify-center py-12 px-4 text-center'>
        <div className='w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4'>
          <MessageCircle size={32} className='text-red-400' />
        </div>
        <p className='text-sm font-medium text-[#d64545]'>
          Couldn't load reviews
        </p>
        <p className='text-xs text-[#6b6974] mt-1'>
          {error.message || "Please try again later"}
        </p>
        <button
          type='button'
          onClick={() => window.location.reload()}
          className='mt-4 px-4 py-2 text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[#f3f1ea] transition-colors duration-200'>
          Retry
        </button>
      </motion.div>
    );
  }

  if (reviews.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-white/10 rounded-2xl'>
        <div className='w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4'>
          <MessageCircle size={32} className='text-[#6b6974]' />
        </div>
        <p className='text-sm font-medium text-[#93919a]'>No reviews yet</p>
        <p className='text-xs text-[#6b6974] mt-1 max-w-sm'>
          Be the first to share your thoughts about this movie!
        </p>
      </motion.div>
    );
  }

  return (
    <div className='min-h-screen bg-[#0c0c0d] text-[#f3f1ea]'>
      {/* Back link */}
      <div className='container mx-auto px-4 py-5'>
        {/* Header with count */}
        <div className='flex items-center justify-between px-3 py-2 mb-2'>
          <div className='flex items-center gap-2'>
            <span className='text-sm font-medium text-[#f3f1ea]'>
              All Reviews
            </span>
            <span className='text-xs px-2 py-0.5 rounded-full bg-white/5 text-[#6b6974] border border-white/5'>
              {reviews.length}
            </span>
          </div>
          <span className='text-xs text-[#6b6974]'>
            {reviews.length > 1 ? "reviews" : "review"}
          </span>
        </div>

        {/* Reviews list */}
        <AnimatePresence mode='wait'>
          {reviews.map((review, index) => (
            <ReviewItem
              key={review.id || index}
              review={review}
              index={index}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MovieReviews;
