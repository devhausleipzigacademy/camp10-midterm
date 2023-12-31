import { useLoaderData } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { Movie } from '../types/api';
import PaginationButton from '../components/PaginationButton';
import { useState } from 'react';
import { useGenreStore } from '../stores/genres';
import { getUpcomingMovies } from '../api/movies';
// import { discoverMoviesWithGenres } from '../api/movies';

export function Movies() {
  getUpcomingMovies();
  const nowPlayingMovies = useLoaderData() as Movie[];
  const [currentPage, setCurrentPage] = useState(1);
  const { selectedGenres } = useGenreStore();
  const filteredMovies =
    selectedGenres.length === 0
      ? nowPlayingMovies
      : nowPlayingMovies.filter(movie =>
          movie.genres.some(genre => selectedGenres.some(g => g === genre.id))
        );

  const moviesDisplay = filteredMovies.slice(
    (currentPage - 1) * 4,
    currentPage * 4
  );
  // spawn an array from 1 to n (length)
  const numberOfPages = Array.from(
    { length: Math.ceil(filteredMovies.length / 4) },
    (_, index) => index + 1
  );

  const maxNumberOfPages = 5

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="grid grid-cols-2 gap-4">
        {moviesDisplay.map((movie: Movie) => (
          <MovieCard movie={movie} variant="now_playing" key={movie.id} />
        ))}
      </div>
      <div className="flex justify-around">
        {numberOfPages.splice(0, maxNumberOfPages).map(page => (
          <PaginationButton
            key={page}
            currentPage={currentPage}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </PaginationButton>
        ))}
      </div>
    </div>
  );
}
