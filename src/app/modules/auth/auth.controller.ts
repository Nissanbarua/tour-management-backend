import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import httpstatus from "http-status-codes";
import { sendRespone } from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import AppError from "../../errorHelpers/appError";

const credentialLogin = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.credentialLogin(req.body);

    res.cookie("accessToken", loginInfo.accessToken, {
      httpOnly: true,
      secure: true,
    });

    res.cookie("refreshToken", loginInfo.refreshToken, {
      httpOnly: true,
      secure: false,
    });

    sendRespone(res, {
      success: true,
      statusCode: httpstatus.OK,
      message: "User Logged in succesfully",
      data: loginInfo,
    });
  }
);
const getNewAccessToken = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new AppError(
        httpstatus.BAD_REQUEST,
        "No refresh token found in cookie"
      );
    }

    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken);

    sendRespone(res, {
      success: true,
      statusCode: httpstatus.OK,
      message: "User Logged in succesfully",
      data: tokenInfo,
    });
  }
);

export const AuthControllers = {
  credentialLogin,
  getNewAccessToken,
};
