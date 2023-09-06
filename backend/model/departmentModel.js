import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    staffs: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const department = mongoose.model("department", departmentSchema);

export default department;
