import { model, Schema } from "mongoose";
import { ITour, ITourType } from "./tour.interface";

const tourTypeSchema = new Schema<ITourType>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export const TourType = model<ITourType>("TourType", tourTypeSchema);

const tourSchema = new Schema<ITour>(
  {
    name: { type: String, require: true },
    slug: { type: String, required: true, unique: true },
    descrition: { type: String },
    image: { type: [String], default: [] },
    location: { type: String },
    costFrom: { type: Number },
    startDate: { type: Number },
    endDate: { type: Number },
    included: { type: [String], default: [] },
    excluded: { type: [String], default: [] },
    amenities: { type: [String], default: [] },
    tourPlan: { type: [String], default: [] },
    maxGuest: { type: Number },
    minAge: { type: Number },
    division: { type: Schema.Types.ObjectId, ref: "Division", required: true },
    tourType: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "TourType",
    },
  },
  {
    timestamps: true,
  }
);

export const Tour = model<ITour>("Tour", tourSchema);
