import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    matches: {
      type: Number,
      required: true,
      default: 0,
    },
    goals: {
      type: Number,
      required: true,
      default: 0,
    },
    assists: {
      type: Number,
      required: true,
      default: 0,
    },
    age: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    creatorId: {
      type: String,
    },
    // position: {
    //   type: mongoose.Schema.Types.ObjectId,
    // },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

PlayerSchema.virtual("creator", {
  ref: "User", // The model to use
  localField: "creatorId", // The field in playerListSchema
  foreignField: "googleId", // The field on videoSchema. This can be whatever you want.
  justOne: true,
});

export default mongoose.model("Player", PlayerSchema);
