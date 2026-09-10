/** @format */

import { Search as SearchIcon, X } from "lucide-react";

const Search = ({ searchQuery, setSearchQuery, onSearch }) => {
  return (
    <form onSubmit={onSearch} className='flex items-center gap-3 w-full'>
      <div className='relative flex-1'>
        <SearchIcon
          size={17}
          className='absolute left-3 top-1/2 -translate-y-1/2 text-[#7a7880] pointer-events-none'
        />

        <input
          type='text'
          name='search'
          placeholder='Search for a movie…'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full bg-[#18181a] border border-white/10 text-[#f3f1ea] placeholder-[#7a7880]
                     pl-9 pr-9 py-2.5 text-sm  rounded-md
                     focus:outline-none focus:border-[#e8b34a]
                     transition-colors duration-200'
        />

        {searchQuery && (
          <button
            type='button'
            onClick={() => setSearchQuery("")}
            aria-label='Clear search'
            className='absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7a7880] hover:text-[#f3f1ea]
                       transition-colors duration-150'>
            <X size={16} />
          </button>
        )}
      </div>

      <button
        type='submit'
        className='px-4 py-2 text-sm font-medium border border-[#e8b34a] text-[#e8b34a]
                   hover:bg-[#e8b34a] hover:text-[#1a1204]
                   transition-colors duration-200 whitespace-nowrap  rounded-md'>
        Search
      </button>
    </form>
  );
};

export default Search;
