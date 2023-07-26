import { app, prismaClient } from '../../index';
import { ZodError, z } from 'zod';
import { Prisma, Screening } from '@prisma/client';

export async function screeningModule() {
  const screeningArrayPostModel = z.object({
    body: z
      .object({
        datetime: z.coerce.date(),
        movieId: z.number(),
        seatAvailability: z
          .number()
          .int({ message: 'seat availability can only be 0 or 1' })
          .lte(1, { message: 'seat availability can only be 0 or 1' })
          .gte(0, { message: 'seat availability can only be 0 or 1' })
          .array()
          .length(54),
      })
      .array(),
    pathParams: z.object({}),
    queryParams: z.object({}),
  });

  const screeningGetModel = z.object({
    body: z.object({}),
    pathParams: z.object({}),
    queryParams: z.object({
      movieId: z.string().refine((value) => {
        return !isNaN(Number(value));
      }, {
        message: 'Invalid number format. Expected a valid number as a string.',
      }),
      date: z
        .string()
        .refine(
          value => {
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            return dateRegex.test(value);
          },
          {
            message: 'Invalid date format. Expected format: "YYYY-MM-DD"',
          }
        )
        .optional(),
    }),
  });

  app.post('/screening', async (req, res) => {
    try {
      const { body: screeningsInfo } = screeningArrayPostModel.parse({
        body: req.body,
        pathParams: req.params,
        queryParams: req.params,
      });
      const response = await prismaClient.screening.createMany({
        data: [...screeningsInfo] as Screening[],
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
        res.status(403).send(error.message);
        return;
      }
      if (error instanceof ZodError) {
        res.send(error.message);
      }
      res.status(500).send(error);
    }
  });

  app.get('/screening', async (req, res) => {
    try {
      const { queryParams } = screeningGetModel.parse({
        body: req.body,
        pathParams: req.params,
        queryParams: req.query,
      });

      const filters = {};

      if (queryParams.movieId) {
        Object.assign(filters, { movieId: Number(queryParams.movieId) });
      }

      if (queryParams.date) {
        const queryDate = new Date(queryParams.date as string);
        const endDate = new Date(queryParams.date as string);
        endDate.setDate(queryDate.getDate() + 1);
        Object.assign(filters, { datetime: { gte: queryDate ?? undefined,lt: endDate ?? undefined }})
      }

      console.log({ filters })

      const screenings = await prismaClient.screening.findMany({
        where: filters
      });
      console.log(screenings.length);
      res.json(screenings);
    } catch (err) {
      res.send(err);
    }
  });

  app.delete('/screening', async (_, res) => {
    try {
      const response = await prismaClient.screening.deleteMany({});
      res.status(200).json(response);
    } catch (err) {
      res.send(err);
    }
  });
}
