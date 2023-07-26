import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SelectSeat } from './pages/SelectSeat';
import { MovieLayout } from './layouts/MovieLayout';
import { CastAndCrew } from './pages/CastAndCrew';
import { SelectTime } from './pages/SelectTime';
import { Ticket } from './pages/Ticket';
import { RootLayout } from './layouts/RootLayout';
import { Genres } from './pages/Genres';
import { Movies } from './pages/Movies';
import { Bookmarks } from './pages/Bookmarks';
import { Home } from './pages/Home';
import { User } from './pages/User';
import { MovieDetails } from './pages/MovieDetails';
import { Login } from './pages/Login';
import { getAllMovies, getCredits, getCurrentMovie, getUpcomingMovies } from './api/movies';
import axios from 'axios';
import { Credits, Movie, ScreeningModel } from './types/api';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: getUpcomingMovies,
        index: true,
      },
      {
        path: 'movies',
        element: <Movies />,
        loader: getAllMovies,
      },
      {
        path: 'bookmarks',
        element: <Bookmarks />,
      },
      {
        path: 'user',
        element: <User />,
      },
    ],
  },
  {
    path: 'movies/:movieId',
    element: <MovieLayout />,
    // this loader is available in all the children routes by using useRouteLoaderData('currentMovie')
    id: 'currentMovie',
    loader: async ({ params }) => {
      const { movieId } = params;
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
          import.meta.env.VITE_TMDB_KEY
        }`
      );
      const resCredits = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${
          import.meta.env.VITE_TMDB_KEY
        }`
      );

      const resScreenings = await axios.get(
        `http://localhost:8000/screening/?movieId=${movieId}`
      );
      const screenings = resScreenings.data as ScreeningModel[]
      const resCreditsData = resCredits.data as Credits;
      const movie = res.data as Movie;
      return { movie, resCreditsData, screenings };
    },
    children: [
      {
        index: true,
        element: <MovieDetails />,
      },
      {
        path: 'castandcrew',
        element: <CastAndCrew />,
        loader: getCredits,
      },
      {
        path: 'select-time',
        element: <SelectTime />,
      },
      {
        path: 'select-seat',
        element: <SelectSeat />,
      },
      {
        path: 'ticket',
        element: <Ticket />,
        loader: getCurrentMovie,
      },
    ],
  },
  {
    path: 'genres',
    element: <Genres />,
  },
  {
    path: 'login',
    element: <Login />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
      <div className="bg-white-dimmed text-white rounded 0.375 py-5 px"></div>
    </QueryClientProvider>
  </React.StrictMode>
);
