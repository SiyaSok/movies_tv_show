/** @format */

import { Globe } from "lucide-react";

const MovieOverview = ({ movie, setShowFullOverview, showFullOverview }) => {
  return (
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
          <h3 className='text-sm text-[#93919a] mb-3'>Production companies</h3>
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
                  <span className='text-sm text-[#c9c7cf]'>{company.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className='text-sm text-[#93919a] mb-3'>Production countries</h3>
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
  );
};

export default MovieOverview;
