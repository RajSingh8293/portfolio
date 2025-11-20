import cloudinary from "../config/cloudinary.js";
import About from "../modals/about.model.js";

// Create About Section
export const createAboutSection = async (req, res) => {
  const {
    title,
    description,
    frontendSkills,
    backendSkills,
    versionControl,
    projectDesc,
    myGoal,
  } = req.body;

  if (!title && !description) {
    return res.status(400).json({
      success: false,
      message: "All fields is required",
    });
  }

  try {
    const aboutData = await About.create({
      title,
      description,
      frontendSkills,
      backendSkills,
      versionControl,
      projectDesc,
      myGoal,
      //   aboutImage: req.file?.path || "",
    });

    res.status(200).json({
      success: true,
      message: "About section created successfully",
      aboutData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating about section",
      error,
    });
  }
};

// Get About Section
export const getAboutSectionData = async (req, res) => {
  try {
    const aboutData = await About.findOne();
    res.status(200).json({
      success: true,
      aboutData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching about section",
      error,
    });
  }
};

// Update About Title
export const updateAboutSectionData = async (req, res) => {
  try {
    const aboutId = req.params.id;
    const {
      title,
      description,
      frontendSkills,
      backendSkills,
      versionControl,
      projectDesc,
      myGoal,
    } = req.body;

    const updatedAboutData = await About.findByIdAndUpdate(
      aboutId,
      {
        title,
        description,
        frontendSkills,
        backendSkills,
        versionControl,
        projectDesc,
        myGoal,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "About data updated successfully",
      aboutData: updatedAboutData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update about data",
      error,
    });
  }
};

// Upload / Change About image
export const uploadAboutImage = async (req, res) => {
  try {
    const aboutId = req.params.id;
    const aboutImage = req.file?.path;
    const publicId = req.file?.filename || req.file?.public_id;
    if (!aboutImage) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const about = await About.findById(aboutId);

    // Delete old image if exists
    if (about?.aboutImagePublicId) {
      await cloudinary.uploader.destroy(about.aboutImagePublicId);
    }
    about.aboutImage = aboutImage;
    about.aboutImagePublicId = publicId;
    await about.save();
    // const updatedAboutData = await About.findByIdAndUpdate(
    //   aboutId,
    //   { aboutImage },
    //   { new: true }
    // );

    res.status(200).json({
      success: true,
      message: "About image updated successfully",
      aboutData: about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update about image",
      error,
    });
  }
};
