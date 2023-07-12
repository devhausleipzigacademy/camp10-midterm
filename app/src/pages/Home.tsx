import { Link, useLoaderData } from 'react-router-dom';
import { SearchInput } from '../components/SearchInput';
import MovieSlider from '../components/MovieSlider';
import { UpcomingMovie } from '../types/api';
import UserInfo from '../components/UserInfo';
import { GenreIcon } from '../components/GenreIcon';
import { HiChevronRight } from 'react-icons/hi';

export function Home() {
  const movies = useLoaderData() as UpcomingMovie[];
  console.log(movies);

  return (
    <>
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
          <div className="flex flex-row justify-between mt-4">
            {[1, 2, 3, 4].map(iconNumber => (
              <GenreIcon
                genre={{
                  icon: '',
                  name: '',
                }}
              >
                {iconNumber}
              </GenreIcon>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-white text-l font-700 mb-4">Upcoming Movies</h3>
          <MovieSlider movies={movies} />
        </div>
      </section>
    </>
  );
}
