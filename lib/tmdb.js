const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function fetchGenres() {
  const res = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );
  const data = await res.json();
  return data.genres;
}

export async function discoverMovies(genreIds, page = 1) {
  const genres = genreIds.join(",");
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genres}&sort_by=popularity.desc&page=${page}&language=en-US`
  );
  return res.json();
}

export async function getMovieDetails(movieId) {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
  return res.json();
}

export async function getMovieRecommendations(movieId) {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US`
  );
  const data = await res.json();
  return data.results;
}

export function getPosterUrl(posterPath, size = "w500") {
  if (!posterPath) return null;
  return `https://image.tmdb.org/t/p/${size}${posterPath}`;
}
