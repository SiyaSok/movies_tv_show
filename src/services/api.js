/** @format */

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export async function getMovieGenres() {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`,
    );
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error("Error fetching movie genres:", error);
    return [];
  }
}
export async function getMoviesByGenre({ genreId, page = 1 }) {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`,
    );

    if (!response.ok) {
      throw new Error(`TMDB request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return [];
  }
}
export async function getMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=2&sort_by=popularity.Asc`,
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

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

export async function getPopularMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
}

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query,
    )}`,
  );
  const data = await response.json();
  return data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
  );
  const data = await response.json();
  return data;
};
export const getTVShowDetails = async (tvShowId) => {
  const response = await fetch(
    `${BASE_URL}/tv/${tvShowId}?api_key=${API_KEY}&language=en-US`,
  );
  const data = await response.json();
  return data;
};

export const getMovieCredits = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
  );
  const data = await response.json();
  return data;
};

export const getMovieVideos = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`,
  );
  const data = await response.json();
  return data;
};

export const getMovieReviews = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
  );
  const data = await response.json();
  return data.results;
};
