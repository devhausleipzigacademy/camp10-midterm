export type Genre = {
  id: number;
  name: string;
};

export type UpcomingMovie = {
  id: number;
  title: string;
  backdrop_path: string | null;
  poster_path: string | null;
  genre_ids: number[];
  overview: string;
  release_date: string;
  vote_average: number;
};

// Movie (aka MovieDetail) to include length
export type Movie = {
  runtime: number;
} & UpcomingMovie;

export type UpcomingMovies = UpcomingMovie[];

export type Person = {
  id: number;
  name: string;
  known_for_department: string;
  profile_path: string | null;
};

export type Cast = Person & {
  character: string;
};
export type Crew = Person & {
  job: string;
};

export type Credits = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};
