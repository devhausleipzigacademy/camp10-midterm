import { useLoaderData } from 'react-router-dom';
import { SearchInput } from '../components/SearchInput';
import MovieSlider from '../components/MovieSlider';
import { UpcomingMovie } from '../types/api';

export function Home() {
  const movies = useLoaderData() as UpcomingMovie[];
  console.log(movies);

  return (
    <>
      <SearchInput />
      <MovieSlider movies={movies} />
    </>
  );
}
