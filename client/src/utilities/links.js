const API_KEY = process.env.REACT_APP_MOVIEDB_API_KEY

export function searchUrl(term) {
  return `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${term}&page=1&include_adult=false`
}

export function nextUrl(number) {
  return `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${number}`
}

export function movieDetails(paramId) {
  return `https://api.themoviedb.org/3/movie/${paramId}?api_key=${API_KEY}&language=en-US`
}

export function getActors(paramId) {
  return `https://api.themoviedb.org/3/movie/${paramId}/credits?api_key=${API_KEY}`
}

export function getVideos(paramId) {
  return `https://api.themoviedb.org/3/movie/${paramId}/videos?api_key=${API_KEY}`
}

export const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
