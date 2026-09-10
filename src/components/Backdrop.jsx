/** @format */

const Backdrop = ({ movie }) => {
  return (
    <div className='relative h-[38vh] md:h-[46vh] lg:h-[54vh] overflow-hidden'>
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className='w-full h-full object-top object-cover'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-[#0c0c0d] via-[#0c0c0d]/40 to-transparent' />
      <div className='absolute inset-0 bg-gradient-to-r from-black/70 to-transparent' />
    </div>
  );
};

export default Backdrop;
