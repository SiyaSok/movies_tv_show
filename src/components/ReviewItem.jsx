/** @format */

import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { getRatingColor } from "../../utils/getRatingColor";
import { formatDate } from "../../utils/formatDate";
import { getStarFill } from "../../utils/getStarFill";

const ReviewItem = ({ review, index }) => {
  const REVIEW_PREVIEW_LENGTH = 320;

  const [expanded, setExpanded] = useState(false);
  const isLong = review.content?.length > REVIEW_PREVIEW_LENGTH;

  const text = useMemo(() => {
    if (!review.content) return "";
    return expanded
      ? review.content
      : review.content.slice(0, REVIEW_PREVIEW_LENGTH);
  }, [review.content, expanded]);

  const rating = review.author_details?.rating;
  const initial = review.author?.charAt(0)?.toUpperCase() ?? "?";
  const createdAt = formatDate(review.created_at);
  const ratingColor = rating ? getRatingColor(rating) : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className='group relative border-b border-white/5 hover:border-white/10 transition-colors duration-300 py-6 px-3 first:pt-0 last:border-b-0 hover:bg-white/5 rounded-xl'>
      {/* Decorative gradient line */}
      <div className='absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

      {/* Header */}
      <div className='flex items-center gap-3 mb-3 flex-wrap'>
        {/* Avatar with gradient */}
        <div className='relative'>
          <div className='w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#18181a] to-[#2a2a2e] border border-white/10 rounded-full text-sm font-semibold text-[#f3f1ea] shadow-lg'>
            {initial}
          </div>
          <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0f0f11]' />
        </div>

        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2 flex-wrap'>
            <span className='text-sm font-semibold text-[#f3f1ea] truncate'>
              {review.author || "Anonymous"}
            </span>
            {review.author_details?.username && (
              <span className='text-xs text-[#6b6974]'>
                @{review.author_details.username}
              </span>
            )}
          </div>
          {createdAt && (
            <span className='text-xs text-[#6b6974]'>{createdAt}</span>
          )}
        </div>

        {/* Rating badge */}
        {rating && (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 ${ratingColor} text-sm font-medium backdrop-blur-sm`}>
            <div className='relative'>
              <Star size={14} className='text-[#6b6974]' />
              <div
                className='absolute inset-0 overflow-hidden'
                style={{ width: `${getStarFill(rating)}%` }}>
                <Star size={14} fill='currentColor' className={ratingColor} />
              </div>
            </div>
            {rating.toFixed(1)}
          </motion.div>
        )}
      </div>

      {/* Review content */}
      <div className='relative'>
        <p className='text-sm text-[#c9c7cf] leading-relaxed whitespace-pre-line transition-colors duration-300'>
          {text}
          {isLong && !expanded && <span className='text-[#6b6974]'>…</span>}
        </p>
      </div>

      {/* Expand button */}
      {isLong && (
        <motion.button
          type='button'
          onClick={() => setExpanded((prev) => !prev)}
          className='mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#e8b34a] hover:text-[#f0c470] transition-colors duration-200 group/btn'
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}>
          {expanded ? (
            <>
              <ChevronUp
                size={14}
                className='transition-transform duration-300'
              />
              Show less
            </>
          ) : (
            <>
              <ChevronDown
                size={14}
                className='transition-transform duration-300 group-hover/btn:translate-y-0.5'
              />
              Read more ({review.content.length - REVIEW_PREVIEW_LENGTH}{" "}
              characters)
            </>
          )}
        </motion.button>
      )}
    </motion.div>
  );
};

export default ReviewItem;
