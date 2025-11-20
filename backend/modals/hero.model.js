import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    heroImage: {
      type: String,
      default: "",
    },
    heroImagePublicId: { type: String },
  },
  { timestamps: true }
);

const Hero = mongoose.model("Hero", heroSchema);
export default Hero;
