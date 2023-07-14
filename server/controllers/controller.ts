import { Request, Response, NextFunction } from "express";

type Sth = {
  id: string;
  username: string;
  bio: string;
};

const DUMMY: Sth[] = [
  { id: "p1", username: "foo", bio: " lorem" },
  { id: "p2", username: "bar", bio: "lorem" },
];

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.params);
  const { userId } = req.params;
  const user = DUMMY.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json("User not found.");
  }

  res.status(200).json(user);
};

export const createBooking = (
  req: Request<{}, {}, Sth>,
  res: Response,
  next: NextFunction
) => {
  res.status(201).json(DUMMY);
};

export const createUser = (
  req: Request<{}, {}, Sth>,
  res: Response,
  next: NextFunction
) => {
  res.status(201).json(DUMMY);
};
