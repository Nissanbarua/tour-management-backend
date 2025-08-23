import { NextFunction, Request, Response } from "express";
import httpstatus from "http-status-codes";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendRespone } from "../../utils/sendResponse";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../../config/env";
import { JwtPayload } from "jsonwebtoken";

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
    sendRespone(res, {
      success: true,
      statusCode: httpstatus.CREATED,
      message: "Create user successfully",
      data: user,
    });
  }
);
const updateUser = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const token = req.headers.authorization;
    const verifiedToken = verifyToken(
      token as string,
      envVars.JWT_ACCESS_SECRET
    ) as JwtPayload;
    const payload = req.body;
    const user = await userService.updateUser(userId, payload, verifiedToken);

    sendRespone(res, {
      success: true,
      statusCode: httpstatus.CREATED,
      message: "User Updated successfully",
      data: user,
    });
  }
);

const getAllUsers = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.getAllusers();
    sendRespone(res, {
      success: true,
      statusCode: httpstatus.OK,
      message: "All users retrive successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

export const userController = {
  createUser,
  getAllUsers,
  updateUser,
};
