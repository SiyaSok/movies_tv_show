/** @format */

const ReviewSkeleton = () => (
  <div className='animate-pulse space-y-4 py-6 px-3'>
    <div className='flex items-center gap-3'>
      <div className='w-10 h-10 bg-[#1a1a1e] rounded-full' />
      <div className='flex-1 space-y-2'>
        <div className='h-4 bg-[#1a1a1e] rounded w-32' />
        <div className='h-3 bg-[#1a1a1e] rounded w-24' />
      </div>
    </div>
    <div className='space-y-2'>
      <div className='h-3 bg-[#1a1a1e] rounded w-full' />
      <div className='h-3 bg-[#1a1a1e] rounded w-5/6' />
      <div className='h-3 bg-[#1a1a1e] rounded w-4/6' />
    </div>
  </div>
);

export default ReviewSkeleton;
