/** @format */

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export async function getTvGenres() {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=en-US`,
    );
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error("Error fetching TV genres:", error);
    return [];
  }
}

export async function getTvShows() {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching TV shows:", error);
    return [];
  }
}

export async function getTVByGenre(genreId, page = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`,
    );

    if (!response.ok) {
      throw new Error(`TMDB request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching TV shows by genre:", error);
    return [];
  }
}

export async function getPopularTVShows() {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching popular TV shows:", error);
    return [];
  }
}

export const searchTVShows = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(
      query,
    )}`,
  );
  const data = await response.json();
  return data.results;
};

export const getTVShowDetails = async (tvShowId) => {
  const response = await fetch(
    `${BASE_URL}/tv/${tvShowId}?api_key=${API_KEY}&language=en-US`,
  );
  const data = await response.json();
  return data;
};

export const getTvVideos = async (tvShowId) => {
  const response = await fetch(
    `${BASE_URL}/tv/${tvShowId}/videos?api_key=${API_KEY}&language=en-US`,
  );
  const data = await response.json();
  return data;
};

export const getTvReviews = async (tvShowId) => {
  const response = await fetch(
    `${BASE_URL}/tv/${tvShowId}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
  );
  const data = await response.json();
  return data.results;
};
