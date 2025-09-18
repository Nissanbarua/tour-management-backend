import mongoose from "mongoose";
import { TGenericErrorResponse } from "../interfaces/error.types";

export const handelCastError = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  return {
    statusCode: 400,
    message: "Invalid Mongodb Object id. Please provide valid ID",
  };
};