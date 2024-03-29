import axios from 'axios'

export const api = axios;

const api_key = process.env.THE_MOVIE_DB_API_KEY;

export const theMovieDb = {
    cover:'https://image.tmdb.org/t/p/original/',
    image:'https://image.tmdb.org/t/p/w500/',
    movies: `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=pt-BR`,
    tv: `https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&language=pt-BR`,
};