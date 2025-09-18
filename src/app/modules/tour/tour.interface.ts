import { Types } from "mongoose";

export interface ITourType {
  name: string;
}
export interface ITour {
  name: string;
  slug: string;
  descrition?: string;
  image?: string;
  location?: string;
  costFrom?: number;
  startDate?: Date;
  endDate?: Date;
  included?: string[];
  excluded?: string[];
  amenities?: string[];
  tourPlan?: string[];
  maxGuest?: number;
  minAge?: number;
  division: Types.ObjectId;
  tourType: Types.ObjectId;
}
