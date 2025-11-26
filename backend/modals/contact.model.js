import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    gitHubAccount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
