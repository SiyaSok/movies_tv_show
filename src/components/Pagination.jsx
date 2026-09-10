/** @format */

import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page, setPage, totalPages, isLoading }) => {
  const isFirstPage = page <= 1;
  const isLastPage = totalPages != null && page >= totalPages;

  return (
    <div className='flex items-center justify-center gap-4 mt-8'>
      <button
        type='button'
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={isFirstPage || isLoading}
        aria-label='Previous page'
        className='flex items-center gap-1.5 px-4 py-2 text-sm font-medium
                   border border-white/15 text-[#f3f1ea]
                   hover:border-[#e8b34a] hover:text-[#e8b34a]
                   disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:text-[#f3f1ea] disabled:cursor-not-allowed
                   transition-colors duration-200'>
        <ChevronLeft size={16} />
        Previous
      </button>

      <span className='text-sm text-[#93919a]'>
        Page {page}
        {totalPages != null && <> of {totalPages}</>}
      </span>

      <button
        type='button'
        onClick={() =>
          setPage((prev) =>
            totalPages != null ? Math.min(prev + 1, totalPages) : prev + 1,
          )
        }
        disabled={isLastPage || isLoading}
        aria-label='Next page'
        className='flex items-center gap-1.5 px-4 py-2 text-sm font-medium
                   border border-white/15 text-[#f3f1ea]
                   hover:border-[#e8b34a] hover:text-[#e8b34a]
                   disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:text-[#f3f1ea] disabled:cursor-not-allowed
                   transition-colors duration-200'>
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
