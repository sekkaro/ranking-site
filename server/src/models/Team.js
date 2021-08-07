import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    league: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "League",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Team", TeamSchema);
