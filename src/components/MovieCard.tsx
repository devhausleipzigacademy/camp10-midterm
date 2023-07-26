import { Link } from 'react-router-dom';
import { MovieModel } from '../types/api';

type Props = {
  movie: MovieModel;
  variant: 'upcoming' | 'now_playing';
};

const MovieCard = ({ movie, variant }: Props) => (
  <Link to={`/movies/${movie.id}`}>
    <div
      className={
        variant === 'upcoming'
          ? 'rounded-lg w-[174px] h-[228px] overflow-hidden transform transition duration-500 hover:scale-110'
          : 'h-60 transform transition duration-500 hover:scale-110'
      }
    >
      <img
        src={
          movie.posterPath
            ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
            : 'https://images.unsplash.com/photo-1607317146126-64b09b69eb4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80'
        }
        alt={movie.id.toString()}
        className="object-cover w-full h-full"
      />
    </div>
  </Link>
);

export default MovieCard;
