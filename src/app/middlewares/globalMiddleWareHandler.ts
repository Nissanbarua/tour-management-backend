/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../../config/env";
import AppError from "../errorHelpers/appError";
import { handelDuplicateError } from "../helpers/handelDuplicateError";
import { handelCastError } from "../helpers/handelCastError";
import { handelZodError } from "../helpers/handelZodError";
import { handelValidationError } from "../helpers/handelValidationError";
import { TErrorSources } from "../interfaces/error.types";

export const globalErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Somthing Went Wrong!!";
  let errorSources: TErrorSources[] = [
    // {
    //   path: "isdeleted",
    //   message: "cast Failed",
    // },
  ];

  if (err.code === 1100) {
    // console.log("Duplicate error", err.message);
    const simplifiedError = handelDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  } else if (err === "CastError") {
    const simplifiedError = handelCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }
  // zod error
  else if (err === " ZodError") {
    const simplifiedError = handelZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    // console.log(err.issues);
    errorSources = simplifiedError.errorSources as TErrorSources[];
  }
  // mongoose error
  else if (err === "ValidationError") {
    const simplifiedError = handelValidationError(err);
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources as TErrorSources[];
    message = simplifiedError.message;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    err: envVars.NODE_ENV === "development" ? err : null,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
    errorSources,
  });
};
