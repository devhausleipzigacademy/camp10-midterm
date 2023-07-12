import axios from 'axios';
import { Credits, Movie } from '../types/api';
import { Params } from 'react-router-dom';

export const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const getCurrentMovie = async ({
  params,
}: {
  params: Params<string>;
}) => {
  const { movieId } = params;
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  );
  const movie = res.data as Movie;
  return movie;
};

export const getCredits = async ({
  params,
}: {
  params: Params<string>;
}) => {
  const { movieId } = params;
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  );
  const credits = res.data as Credits;
  return credits;
};
