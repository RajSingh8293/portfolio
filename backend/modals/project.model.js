import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    projectLink: {
      type: String,
      required: true,
    },
    btnText: {
      type: String,
      required: true,
    },

    projectImage: {
      type: String,
      default: "",
    },
    projectImagePublicId: { type: String },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
