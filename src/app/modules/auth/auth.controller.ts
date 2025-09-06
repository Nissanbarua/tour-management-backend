/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import httpstatus from "http-status-codes";
import { sendRespone } from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import AppError from "../../errorHelpers/appError";
import { setAuthCookie } from "../../utils/setCookie";
import { JwtPayload } from "jsonwebtoken";
import { creatUserToken } from "../../utils/userTokens";
import { envVars } from "../../../config/env";

const credentialLogin = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.credentialLogin(req.body);

    setAuthCookie(res, loginInfo);

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

    const tokenInfo = await AuthServices.getNewAccessToken(
      refreshToken as string
    );

    setAuthCookie(res, tokenInfo.accessToken);

    sendRespone(res, {
      success: true,
      statusCode: httpstatus.OK,
      message: "User Logged in succesfully",
      data: tokenInfo,
    });
  }
);
const logout = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    sendRespone(res, {
      success: true,
      statusCode: httpstatus.OK,
      message: "User Logged out succesfully",
      data: null,
    });
  }
);
const resetPassword = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const decodedToken = req.user;
    await AuthServices.resetPassword(
      oldPassword,
      newPassword,
      decodedToken as JwtPayload
    );

    sendRespone(res, {
      success: true,
      statusCode: httpstatus.OK,
      message: "Password Change succesfully",
      data: null,
    });
  }
);
const googleCallbackController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      throw new AppError(httpstatus.NOT_FOUND, "User Not Found");
    }
    const tokenInfo = creatUserToken(user);

    setAuthCookie(res, tokenInfo);

    res.redirect(envVars.FRONTEND_URL);
  }
);

export const AuthControllers = {
  credentialLogin,
  getNewAccessToken,
  logout,
  resetPassword,
  googleCallbackController,
};
