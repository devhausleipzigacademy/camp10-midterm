import { Combobox } from '@headlessui/react';
import { CgSearch } from 'react-icons/cg';
import { Fragment, useState } from 'react';

// Mock data for fuzzy search
const movies = [
  'The Matrix',
  'Dune',
  'Alice in Wonderland',
  'Star Trek',
  'Starwars',
  'Sherlock Holmes',
  'John Wick',
  'The Lion King',
  'The Dark Knight',
  'Inception',
  'The Godfather',
  'The Lord of the Rings',
  'The Silence of the Lambs',
  'The Green Mile',
  'The Pianist',
  'The Great Dictator',
];

export function SearchInput() {
  const [selectedMovie, setSelectedMovie] = useState('');
  const [query, setQuery] = useState('');

  const filteredMovies =
    query.trim() === ''
      ? []
      : movies.filter(movie => {
          return movie.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox value={selectedMovie} onChange={setSelectedMovie}>
      <Combobox.Label className="relative flex items-center">
        <Combobox.Input
          className="bg-dark-light text-white rounded-full h-12 pl-[3.75rem] w-full outline-none focus:ring-2 focus:ring-white-dimmed"
          placeholder="Search"
          onChange={event => setQuery(event.target.value)}
        />
        <Combobox.Options className="absolute leading-8 top-10 inset-x-0 bg-dark-light mt-4 rounded-lg text-white-dimmed max-h-40 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded scrollbar-track-white/0 scrollbar-thumb-white-dimmed">
          {filteredMovies.map(movie => (
            <Combobox.Option key={movie} value={movie} as={Fragment}>
              {({ active }) => (
                <li
                  className={`${
                    active ? 'bg-yellow text-dark' : 'bg-dark-light'
                  } pl-[3.75rem]`}
                >
                  {movie}
                </li>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
        <CgSearch className="absolute left-5 text-[1.5rem] text-white-dimmed-heavy focus:text-white" />
      </Combobox.Label>
    </Combobox>
  );
}
