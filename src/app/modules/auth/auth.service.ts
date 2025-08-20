import AppError from "../../errorHelpers/appError";
import { IUser } from "../user/user.interface";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { User } from "../user/user.model";

const credentialLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Doesn't exist");
  }

  const isPasswordMatched = await bcryptjs.compare(
    password as string,
    isUserExist.password as string
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password");
  }

  return {
    email: isUserExist.email,
  };
};

export const AuthServices = {
  credentialLogin,
};
