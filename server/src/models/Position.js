import mongoose from "mongoose";

const PositionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Position", PositionSchema);
