import { app, prismaClient } from '../../index';
import { z } from 'zod';
import { Prisma } from '@prisma/client';

export async function movieModule() {
  const moviePostModel = z.object({
    body: z.object({
      id: z.number(),
      releaseDate: z.coerce.date(),
      posterPath: z.string(),
      genres: z.number().array()
    }),
    pathParams: z.object({}),
    queryParams: z.object({}),
  });

  app.post('/movie', async (req, res) => {
    try {
      const { body: movieInfo } = moviePostModel.parse({
        body: req.body,
        pathParams: req.params,
        queryParams: req.params,
      });
      const response = await prismaClient.movie.create({
        data: {
          ...movieInfo,
        },
      });
      res.status(201).json(response);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        res.status(422).send(error.message);
        return;
      }
      if (error instanceof Prisma.PrismaClientValidationError) {
        res.send(error.message);
        return;
      }
      res.status(500).send(error);
    }
  });

  app.get('/movie', async (_, res) => {
    try {
      const movies = await prismaClient.movie.findMany({
        orderBy: {
          releaseDate: 'asc',
        }
      });
      res.status(200).json(movies);
    } catch (err) {
      res.send(err);
    }
  });

  app.get('/movie/upcoming', async (_, res) => {
    try {
      const movies = await prismaClient.movie.findMany({
        where: {
          releaseDate: {
            gt: new Date (Date.now())
          }
        }
      });
      res.status(200).json(movies);
    } catch (err) {
      res.send(err);
    }
  });

  app.get('/movie/nowplaying', async (_, res) => {
    try {
      const movies = await prismaClient.movie.findMany({
        where: {
          releaseDate: {
            lte: new Date (Date.now())
          }
        }
      });
      res.status(200).json(movies);
    } catch (err) {
      res.send(err);
    }
  });

  app.get('/movie/:movieId', async (req, res) => {
    const { movieId } = req.params
    try {
      const movie = await prismaClient.movie.findFirst({
        where: {
          id: Number(movieId)
        }
      });
      res.status(200).json(movie);
    } catch (err) {
      res.send(err);
    }
  });

  app.delete('/movie', async (_, res) => {
    try {
      const movie = await prismaClient.movie.deleteMany({})
      res.status(200).json(movie);
    } catch (err) {
      res.send(err);
    }
  });
}
