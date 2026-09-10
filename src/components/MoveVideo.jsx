/** @format */

import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import { getTvVideos } from "../services/tvshowsApi";
import { getMovieVideos } from "../services/moviesApi";

/** @format */
const MovieVideo = ({ id, isTVShow = false }) => {
  const {
    data: movieVideo,
    isLoading: isLoading,
    error: Error,
  } = useQuery({
    queryKey: ["movieVideo", id],
    queryFn: isTVShow ? () => getTvVideos(id) : () => getMovieVideos(id),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (Error) {
    return <div>Error loading video: {Error.message}</div>;
  }

  console.log("Movie Video Data:", movieVideo);

  const OfficialTrailer = movieVideo.results.find(
    (video) => video.type === "Trailer",
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
