/** @format */

import { useState } from "react";
import { Star, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";
import Backdrop from "./Backdrop";
import Poster from "./Poster";
import MovieOverview from "./MovieOverview";

const MovieInfo = ({ movie, isTVShow = false }) => {
  const [showFullOverview, setShowFullOverview] = useState(false);
  const navigate = useNavigate();

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const specs = [
    { label: "Status", value: movie.status },
    { label: "Release date", value: formatDate(movie.release_date) },
    { label: "Runtime", value: `${movie.runtime} min` },
    { label: "Budget", value: formatCurrency(movie.budget) },
    { label: "Revenue", value: formatCurrency(movie.revenue) },
  ];

  return (
    <div className='min-h-screen bg-[#0c0c0d] text-[#f3f1ea]'>
      {/* Back link */}
      <div className='container mx-auto px-4 py-5'>
        <button
          onClick={() => navigate(-1)}
          className='inline-flex items-center gap-1.5 text-sm text-[#93919a] hover:text-[#e8b34a] transition-colors duration-200'>
          <ChevronLeft size={16} />
          <span>Back to {isTVShow ? "TV Shows" : "Movies"}</span>
        </button>
      </div>

      {/* Hero */}
      <div className='relative'>
        <Backdrop movie={movie} />
        <Poster movie={movie} />
      </div>

      {/* Content */}
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-10'>
          {/* Main column */}
          <MovieOverview
            movie={movie}
            setShowFullOverview={setShowFullOverview}
            showFullOverview={showFullOverview}
          />
          {/* Sidebar */}
          <div className='space-y-10'>
            {/* Rating */}
            <div>
              <div className='flex items-baseline gap-3'>
                <span className="font-['Bebas_Neue'] text-6xl leading-none text-[#e8b34a]">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className='text-[#7a7880] text-sm'>/ 10</span>
              </div>
              <div className='flex items-center gap-1 mt-2'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.round(movie.vote_average / 2)
                        ? "text-[#e8b34a] fill-[#e8b34a]"
                        : "text-white/15"
                    }
                  />
                ))}
              </div>
              <p className='text-xs text-[#7a7880] mt-2'>
                From {movie.vote_count.toLocaleString()} ratings
              </p>
            </div>

            <div className='h-px bg-white/10' />

            {/* Spec sheet — receipt-style dotted rows */}
            <div>
              <h3 className='text-sm text-[#93919a] mb-3'>Details</h3>
              <dl className='space-y-2.5'>
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className='flex items-baseline justify-between gap-2 text-sm'>
                    <dt className='text-[#93919a] whitespace-nowrap'>
                      {spec.label}
                    </dt>
                    <span className='flex-1 border-b border-dotted border-white/15 translate-y-[-3px]' />
                    <dd className='font-medium whitespace-nowrap'>
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className='h-px bg-white/10' />

            {/* Languages */}
            <div>
              <h3 className='text-sm text-[#93919a] mb-3'>Languages</h3>
              <div className='flex flex-wrap gap-2'>
                {movie.spoken_languages.map((lang) => (
                  <span
                    key={lang.iso_639_1}
                    className='border border-white/10 px-2.5 py-1 text-xs text-[#c9c7cf]'>
                    {lang.english_name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
