import { Request, Response } from "express";
import httpstatus from "http-status-codes";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = userService.createUser(req.body);

    res
      .status(httpstatus.CREATED)
      .json({ message: "User created successfully", user });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    res
      .status(httpstatus.BAD_GATEWAY)
      .json({ message: `something went wrong ${error}` });
  }
};

export const userController = {
  createUser,
};
