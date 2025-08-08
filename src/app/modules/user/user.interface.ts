import { Types } from "mongoose";

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
  GUIDE = "GUIDE",
}

export interface IAuthProvider {
  provider: string; //"google" or "credential"
  providerId: string;
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}
export interface IUser {
  name: string;
  email: string;
  password?: string;
  address?: string;
  picture?: string;
  phone?: string;
  isDeleted?: string;
  isActive?: IsActive;
  isVerified?: string;
  role: Role;
  auths: IAuthProvider[];
  bookings: Types.ObjectId[];
  guide: Types.ObjectId[];
}
