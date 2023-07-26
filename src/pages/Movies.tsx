import { useLoaderData } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { MovieModel } from '../types/api';
import { useGenreStore } from '../stores/genres';
import { getUpcomingMovies } from '../api/movies';

export function Movies() {
  getUpcomingMovies();
  const nowPlayingMovies = useLoaderData() as MovieModel[];
  const { selectedGenres } = useGenreStore();
  const filteredMovies =
    selectedGenres.length === 0
      ? nowPlayingMovies
      : nowPlayingMovies.filter(movie =>
          movie.genres.some(id => selectedGenres.some(g => g === id))
        );

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="h-full grid grid-cols-2 gap-4 overflow-y-scroll">
        {filteredMovies.map((movie: MovieModel) => (
          <MovieCard movie={movie} variant="now_playing" key={movie.id} />
        ))}
      </div>
    </div>
  );
}
