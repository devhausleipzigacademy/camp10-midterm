import { Link, useRouteLoaderData } from 'react-router-dom';
import { Button } from '../components/Button';
import { Credits, Movie } from '../types/api';
import { useState } from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import { BsHeartFill, BsHeart } from 'react-icons/bs';
import { formatName } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

export function MovieDetails() {
  const { movie } = useRouteLoaderData('currentMovie') as { movie: Movie };
  const { resCreditsData } = useRouteLoaderData('currentMovie') as {
    resCreditsData: Credits;
  };
  const [heartIcon, toggleHeart] = useState(false);
  const {
    id,
    title,
    backdrop_path,
    runtime,
    vote_average,
    release_date,
    genres,
    overview,
  } = movie;
  const { crew } = resCreditsData;

  const navigate = useNavigate();

  const filteredCrew: string[] = [];
  crew.map((x, _y) => {
    if (
      x.job === 'Director' ||
      x.job === 'Novel' ||
      (x.job !== 'Novel' && x.known_for_department == 'Writing')
    ) {
      filteredCrew.push(x.name);
    }
  });

  console.log(filteredCrew);

  return (
    <div className="flex flex-col px-5 py-6 justify-between h-full">
      <div className="flex justify-between items-center text-white text-l font-700">
        <IoChevronBackSharp onClick={() => navigate(-1)} />

        <p> Movie Details </p>
        {heartIcon ? (
          <BsHeartFill
            className="text-red"
            onClick={() => toggleHeart(!heartIcon)}
          />
        ) : (
          <BsHeart
            className="text-red"
            onClick={() => toggleHeart(!heartIcon)}
          />
        )}
      </div>
      <img
        className="rounded-lg mt-3"
        src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
        alt=""
      />
      <h1 className="text-white pt-6 pb-3 font-700 text-xl">
        {title.length >= 30 ? title.slice(0, 31) + '..' : title}
      </h1>
      <div className="flex pb-3 justify-between">
        <div className="flex gap-6">
          <p className="text-s text-white font-500">
            {release_date.slice(0, 4)}
          </p>
          <p className="text-s text-white-dimmed font-500">
            {genres && genres.length > 0
              ? genres.length > 1
                ? `${genres[0].name}/${genres[1].name}`
                : genres[0].name
              : 'Unknown'}
          </p>
          <p className="text-s text-white-dimmed font-500">
            {Math.floor(runtime / 60) + 'h ' + ((runtime % 60) + 'm')}
          </p>
        </div>
        <p className="text-s text-white-dimmed font-500 ">
          <span className="text-green">
            {Math.round(vote_average * 10) + '% '}
          </span>
          Score
        </p>
      </div>
      <div className="flex items-center justify-between pb-4">
        <div className="flex flex-col gap-2">
          <p className="flex gap-1 text-s text-white-dimmed font-700">
            Director:
            <span className="text-white font-700">
              {formatName(filteredCrew[0]) ?? ' Unknown '}
            </span>
          </p>
          <p className="flex gap-4 text-s text-white-dimmed font-500">
            Writer:
            <span className="text-white font-500">
              {formatName(filteredCrew[1]) ?? filteredCrew[3] ?? ' Unknown '}
            </span>
          </p>
        </div>
        <Button variant="secondary" size="small" className="w-1/2">
          <Link to={`/movies/${id}/castandcrew`}>Cast & Crew</Link>
        </Button>
      </div>
      <hr className="border-white-dimmed" />
      <div className="flex flex-col pt-4">
        <p className="text-white font-700 text-m pb-3">Synopsis</p>
        <p className="text-white-dimmed text-m font-500 leading-6 h-full line-clamp-2">
          {overview}
        </p>
        <a
          className="text-yellow text-m font-500 underline underline-offset-2"
          href={`https://www.themoviedb.org/movie/${id}`}
        >
          Read more
        </a>
      </div>
      <Button> Get Reservation</Button>
    </div>
  );
}
