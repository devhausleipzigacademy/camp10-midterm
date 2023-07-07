import { UpcomingMovie } from '../types/api';
import MovieCard from './MovieCard';

export function MovieSlider({ movies }: { movies: UpcomingMovie[] }) {
  return (
    <div className="flex flex-row gap-8 container-snap snap-x snap-mandatory h-screen overflow-scroll w-full">
      {movies.map(movie => (
        <div key={movie.id} className="snap-center">
          <MovieCard movie={movie} variant="upcoming" />
        </div>
      ))}
    </div>
  );
}

export default MovieSlider;
