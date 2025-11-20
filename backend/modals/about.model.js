import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    frontendSkills: {
      type: String,
      required: true,
    },
    backendSkills: {
      type: String,
      required: true,
    },
    versionControl: {
      type: String,
      required: true,
    },
    projectDesc: {
      type: String,
      required: true,
    },
    myGoal: {
      type: String,
      required: true,
    },

    aboutImage: {
      type: String,
      default: "",
    },
    aboutImagePublicId: { type: String },
  },
  { timestamps: true }
);

const About = mongoose.model("About", aboutSchema);
export default About;
