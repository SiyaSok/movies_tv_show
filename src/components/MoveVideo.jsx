/** @format */

import { useQuery } from "@tanstack/react-query";
import { getMovieVideos } from "../services/api";

/** @format */
const MovieVideo = ({ id }) => {
  const {
    data: movieVideo,
    isLoading: isLoading,
    error: Error,
  } = useQuery({
    queryKey: ["movieVideo", id],
    queryFn: () => getMovieVideos(id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (Error) {
    return <div>Error loading video: {Error.message}</div>;
  }

  const OfficialTrailer = movieVideo.results.find(
    (video) => video.type === "Trailer" && video.official === true,
  );

  const videoKey = OfficialTrailer ? OfficialTrailer.key : null;

  if (!videoKey) {
    return <div>No official trailer available.</div>;
  }

  return (
    <div className='bg-[#0c0c0d] text-[#f3f1ea]'>
      {/* Back link */}
      <div className='container mx-auto px-4 py-5'>
        <iframe
          width='100%'
          height='550'
          src={`https://www.youtube.com/embed/${videoKey}`}
          title='YouTube video player'
          frameborder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerpolicy='strict-origin-when-cross-origin'
          allowfullscreen></iframe>
      </div>
    </div>
  );
};

export default MovieVideo;
