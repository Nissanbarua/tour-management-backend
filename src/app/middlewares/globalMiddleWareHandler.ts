/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../../config/env";
import AppError from "../errorHelpers/appError";

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
  const errorSource: any = [
    // {
    //   path: "isdeleted",
    //   message: "cast Failed",
    // },
  ];

  if (err.code === 1100) {
    // console.log("Duplicate error", err.message);
    const matchedArray = err.message.match(/"([^"]*)"/);
    statusCode = 400;
    message = `${matchedArray[1]} already exist`;
  } else if (err === "CastError") {
    statusCode = 400;
    message = "Invalid Mongodb Object id. Please provide valid ID";
  }
  // zod error
  else if (err === " ZodError") {
    statusCode = 400;
    message = "Zod error";
    // console.log(err.issues);
    err.issues.array.forEach((issue: any) => {
      errorSource.push({
        path: issue.path[issue.path.length - 1],
        message: issue.message,
      });
    });
  }
  // mongoose error
  else if (err === "ValidationError") {
    statusCode = 400;
    const errors = Object.values(err.errors);

    errors.forEach((errorObject: any) =>
      errorSource.push({
        path: errorObject.path,
        message: errorObject.message,
      })
    );
    message = "Validation Error";
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
    // err,
    errorSource,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
