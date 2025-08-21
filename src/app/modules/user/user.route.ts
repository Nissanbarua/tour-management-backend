import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import { createZodUserSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/appError";
import { Role } from "./user.interface";

const router = Router();
router.post(
  "/register",
  validateRequest(createZodUserSchema),
  userController.createUser
);
router.get(
  "/all-users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(403, "No token rececived");
      }

      const verifiedToken = jwt.verify(accessToken, "secret");
      if (!verifiedToken) {
        throw new AppError(403, "You are not permitted");
      }

      if (
        (verifiedToken as JwtPayload).role !== Role.ADMIN ||
        Role.SUPER_ADMIN
      ) {
        throw new AppError(403, "You are not Authorized to view this page");
      }
    } catch (error) {
      next(error);
    }
  },
  userController.getAllUsers
);

export const UserRoute = router;
