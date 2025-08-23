import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/appError";
import { envVars } from "../../config/env";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(403, "No token rececived");
      }

      const verifiedToken = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;
      // if (!verifiedToken) {
      //   throw new AppError(403, "You are not permitted");
      // }

      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(403, "You are not Authorized to view this page");
      }
      req.user = verifiedToken;
    } catch (error) {
      next(error);
    }
  };
