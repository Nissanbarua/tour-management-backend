import { Division } from "./dicision.model";
import { IDivision } from "./division.interface";

const createDivision = async (payload: IDivision) => {
  const existingDivision = await Division.findOne({ name: payload.name });
  if (existingDivision) {
    throw new Error("A division with name is already exist");
  }

  const baseSlug = payload.name.toLowerCase().split(" ").join("-");
  let slug = `${baseSlug}-division`;

  let counter = 0;
  while (await Division.exists({ slug })) {
    slug = `${slug}-${counter++}`;
  }

  payload.slug = slug;
  const division = Division.create(payload);
  return division;
};

const getAllDivision = async () => {
  const division = await Division.find({});
  const totalDivision = await Division.countDocuments();
  return {
    data: division,
    meta: {
      total: totalDivision,
    },
  };
};

const getSingleDivision = async (slug: string) => {
  const division = await Division.findOne({ slug });
  return {
    data: division,
  };
};

const updateDivision = async (id: string, payload: Partial<IDivision>) => {
  const existingDivision = await Division.findById({ id });
  if (!existingDivision) {
    throw new Error("Division not found");
  }

  const dulicateDivision = await Division.findOne({
    name: payload.name,
    _id: { $ne: id },
  });

  if (dulicateDivision) {
    throw new Error("A division with this name already exists.");
  }
  const updateDivision = await Division.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return updateDivision;
};

const deleteDivision = async (id: string) => {
  await Division.findByIdAndDelete(id);
  return null;
};

export const divisionService = {
  createDivision,
  getAllDivision,
  updateDivision,
  deleteDivision,
  getSingleDivision,
};
