import { Request, Response } from "express";
import httpstatus from "http-status-codes";
import { User } from "./user.model";

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    const user = await User.create({
      name,
      email,
    });
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
