import { UpcomingMovie } from '../types/api';
import MovieCard from './MovieCard';

export function MovieSlider({ movies }: { movies: UpcomingMovie[] }) {
  return (
    <div className="flex flex-row gap-8 container-snap snap-x snap-mandatory overflow-scroll w-[375px] absolute -ms-5">
      {movies.map(movie => (
        <div key={movie.id} className="snap-center">
          <MovieCard movie={movie} variant="upcoming" />
        </div>
      ))}
    </div>
  );
}

export default MovieSlider;
