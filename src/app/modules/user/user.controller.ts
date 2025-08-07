import { NextFunction, Request, Response } from "express";
import httpstatus from "http-status-codes";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.createUser(req.body);

    res
      .status(httpstatus.CREATED)
      .json({ message: "User created successfully", user });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log(error);
    next(error);
  }
};

export const userController = {
  createUser,
};
