import { Link, useLoaderData } from 'react-router-dom';
import { SearchInput } from '../components/SearchInput';
import MovieSlider from '../components/MovieSlider';
import { MovieModel } from '../types/api';
import { useGenreStore } from '../stores/genres';
import UserInfo from '../components/UserInfo';
import { GenreIcon } from '../components/GenreIcon';
import { HiChevronRight } from 'react-icons/hi';

export function Home() {
  const movies = useLoaderData() as MovieModel[];
  const { genres, homePageGenres, selectedGenres, selectGenre } =
    useGenreStore();
  const filteredMovies =
    selectedGenres.length === 0
      ? movies
      : movies.filter(movie =>
          movie.genres.some(id => selectedGenres.some(g => g === id))
        );

  return (
    <section className="flex flex-col gap-y-6">
      <UserInfo />
      <SearchInput />
      <div>
        <div className="flex justify-between items-center">
          <p className="text-white-dimmed font-700 text-l">Genre</p>
          <div className=" flex text-yellow/50 text-s  font-500 gap-3 items-center">
            <Link to={'/genres'}>See All</Link>
            <HiChevronRight className="w-4 h-4" />
          </div>
        </div>
        <div className="flex justify-between mt-4">
          {homePageGenres.map((g, idx) => (
            <GenreIcon
              icon={genres[g].icon}
              genre={g}
              key={idx}
              isSelected={genres[g].isSelected}
              onClick={() => selectGenre(g, true)}
            />
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-white text-l font-700 mb-4">Upcoming Movies</h3>
        <MovieSlider movies={filteredMovies} />
      </div>
    </section>
  );
}
