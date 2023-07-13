import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { Button } from '../components/Button';
import { useGenreStore } from '../stores/genres';
import { GenreIcon } from '../components/GenreIcon';

export function Genres() {
  const { genres, selectGenre, reset } = useGenreStore();
  const selectedGenres = Object.keys(genres).filter(
    genre => genres[genre].isSelected
  );

  return (
    <div className="bg-dark flex flex-col m-auto w-[375px] h-[667px] rounded-3xl pt-8 pb-6 px-5">
      <div className="flex relative items-center justify-center">
        <Link to="/" className="text-white text-xl absolute left-0">
          <MdOutlineKeyboardArrowLeft />
        </Link>
        <h2 className="text-white text-l font-700">Genres</h2>
      </div>
      <div className="w-full grid grid-cols-4 gap-y-8 mt-12 mb-auto place-items-center">
        {Object.keys(genres).map((genre, idx) => {
          return (
            <GenreIcon
              icon={genres[genre].icon}
              genre={genre}
              key={idx}
              isSelected={genres[genre].isSelected}
              onClick={() => selectGenre(genre)}
            />
          );
        })}
      </div>
      <div className="text-white-dimmed text-m mt-auto flex justify-between">
        <div>
          <span className="text-white">{selectedGenres.length}</span> genres
          selected.
        </div>
        <button className="hover:text-yellow" onClick={reset}>
          Unselect all
        </button>
      </div>
      <Link to="/" className="w-full mt-4">
        <Button className="w-full" size="small">
          Confirm Selected Genres
        </Button>
      </Link>
    </div>
  );
}
