import { Request, Response, NextFunction } from "express";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // console.log(req.params);
  const { userId } = req.params;
  const user = await prisma.user.findFirst({
    where: {
      id: Number(userId),
    },
  });
  if (!user) {
    return res.status(404).json("User not found.");
  }

  res.status(200).json(user);
}
export async function createBooking(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(200).json({
    message: "Some Action can be done here",
    from: "Bookings",
  });
}

export async function createUser(
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction
) {
  console.log(req.body);
  const { username, mail } = req.body;
  if (!username || !mail) {
    return res.status(400).json("invalid body");
  }
  const newUser = await prisma.user.create({
    data: {
      username,
      mail,
    },
  });
  res.status(201).json(newUser);
}
