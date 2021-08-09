import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    number: {
      type: Number,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    position: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Position",
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// PlayerSchema.virtual("creator", {
//   ref: "User", // The model to use
//   localField: "creatorId", // The field in playerListSchema
//   foreignField: "googleId", // The field on videoSchema. This can be whatever you want.
//   justOne: true,
// });

export default mongoose.model("Profile", ProfileSchema);
