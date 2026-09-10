/** @format */

// Skeleton loading component
const MovieSkeleton = () => {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 animate-pulse'>
      {/* Back Button Skeleton */}
      <div className='container mx-auto px-4 py-4'>
        <div className='h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded'></div>
      </div>

      {/* Hero Section Skeleton */}
      <div className='relative h-[40vh] md:h-[50vh] lg:h-[60vh] bg-gray-300 dark:bg-gray-700'>
        <div className='absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-gray-900 via-transparent to-transparent' />
      </div>

      {/* Movie Info Skeleton */}
      <div className='container mx-auto px-4 relative -mt-32 md:-mt-40 lg:-mt-48'>
        <div className='flex flex-col md:flex-row gap-6 md:gap-8'>
          {/* Poster Skeleton */}
          <div className='flex-shrink-0 w-48 md:w-56 lg:w-64 mx-auto md:mx-0'>
            <div className='w-full aspect-[2/3] bg-gray-300 dark:bg-gray-700 rounded-lg shadow-2xl'></div>
          </div>

          {/* Details Skeleton */}
          <div className='flex-1'>
            <div className='h-10 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-2'></div>
            <div className='h-6 w-1/2 bg-gray-300 dark:bg-gray-700 rounded mb-4'></div>
            <div className='flex gap-3 mb-4'>
              <div className='h-8 w-32 bg-gray-300 dark:bg-gray-700 rounded'></div>
              <div className='h-8 w-32 bg-gray-300 dark:bg-gray-700 rounded'></div>
            </div>
            <div className='flex flex-wrap gap-2 mb-4'>
              <div className='h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded-full'></div>
              <div className='h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded-full'></div>
              <div className='h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded-full'></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2'>
            <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6'>
              <div className='h-8 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-4'></div>
              <div className='space-y-2'>
                <div className='h-4 w-full bg-gray-300 dark:bg-gray-700 rounded'></div>
                <div className='h-4 w-full bg-gray-300 dark:bg-gray-700 rounded'></div>
                <div className='h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded'></div>
              </div>
            </div>
          </div>
          <div>
            <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg'>
              <div className='h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-4'></div>
              <div className='space-y-3'>
                <div className='h-4 w-full bg-gray-300 dark:bg-gray-700 rounded'></div>
                <div className='h-4 w-full bg-gray-300 dark:bg-gray-700 rounded'></div>
                <div className='h-4 w-full bg-gray-300 dark:bg-gray-700 rounded'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieSkeleton;
