import { NextFunction, Request, Response } from "express";
import httpstatus from "http-status-codes";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const user = await userService.createUser(req.body);

//     res
//       .status(httpstatus.CREATED)
//       .json({ message: "User created successfully", user });
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: any) {
//     // eslint-disable-next-line no-console
//     console.log(error);
//     next(error);
//   }
// };
const createUser = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.createUser(req.body);
    res
      .status(httpstatus.CREATED)
      .json({ message: "User created successfully", user });
  }
);

const getAllUsers = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userService.getAllusers();
    res.status(httpstatus.OK).json({
      success: true,
      message: "All users Retrive Succesfully",
      users,
    });
  }
);

export const userController = {
  createUser,
  getAllUsers
};
