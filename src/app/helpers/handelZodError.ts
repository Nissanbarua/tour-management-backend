/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from "../interfaces/error.types";

export const handelZodError = (err: any): TGenericErrorResponse => {
  const errorSources: TErrorSources[] = [];

  // console.log(err.issues);
  err.issues.array.forEach((issue: any) => {
    errorSources.push({
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    });
  });

  return {
    statusCode: 400,
    message: "Zod error",
    errorSources,
  };
};