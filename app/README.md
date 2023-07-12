# camp10-midterm

https://www.figma.com/file/TOCJzJFMXE7PL1dQyGWqXZ/midterm?type=design&node-id=193-51&mode=design&t=4jEuQWIjPhpPolEq-0

## How to use `.env` in vite project

Note: Make sure you already have TMDB's api key, if not, register an account and request for one.

https://vitejs.dev/guide/env-and-mode.html

- create a file named `.env`
- make sure that `*.env` is already in your `.gitignore` (you don't want to commit this file)
- add `VITE_TMDB_KEY="{your_api_key}"` to `.env` (please remove `{}` it's just a placeholder for api key)

Usage:

```ts
const res = await axios.get(
  `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
    import.meta.env.VITE_TMDB_KEY
  }`
);
```

## List API Endpoints:

API Documentation: https://developer.themoviedb.org/docs
API Reference: https://developer.themoviedb.org/reference/intro/getting-started

- genres of all the movies: `https://api.themoviedb.org/3/genre/movie/list`
- movie detail: `https://api.themoviedb.org/3/movie/{movie_id}`
- list of upcoming movies: `https://api.themoviedb.org/3/movie/upcoming` (List of Movies that will release soon)
- list of now playing movies: `https://api.themoviedb.org/3/movie/now_playing` (List of Movies that are currently playing)
- credits: `https://api.themoviedb.org/3/movie/{movie_id}/credits` (this includes cast and crew)
- person: `https://api.themoviedb.org/3/person/{person_id}`

### Access to images (for poster_path, backdrop_path, profile_path, etc.)

**Example URL**

Original:

```
https://image.tmdb.org/t/p/original/{img_path}
```

Width 500px:

```
https://image.tmdb.org/t/p/w500/{img_path}
```

Check out documentation to learn more:
https://developer.themoviedb.org/docs/image-basics
