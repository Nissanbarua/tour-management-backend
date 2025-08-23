import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import httpstatus from "http-status-codes";
import { sendRespone } from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const credentialLogin = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.credentialLogin(req.body);

    sendRespone(res, {
      success: true,
      statusCode: httpstatus.OK,
      message: "User Logged in succesfully",
      data: loginInfo,
    });
  }
);

export const AuthControllers = {
  credentialLogin,
};
