import cloudinary from "../config/cloudinary.js";
import Project from "../modals/project.model.js";

// Create About Section
export const createProjectSection = async (req, res) => {
  const { title, description, caption, btnText, projectLink } = req.body;

  if (!title && !description && !projectLink) {
    return res.status(400).json({
      success: false,
      message: "All fields is required",
    });
  }

  if (!req.file || !req.file.path) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  const projectImage = req.file.path;
  const projectImagePublicId = req.file?.filename || req.file?.public_id;
  try {
    const project = await Project.create({
      title,
      description,
      caption,
      btnText,
      projectLink,
      projectImage,
      projectImagePublicId,
    });

    res.status(200).json({
      success: true,
      message: "Project  created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating projects section",
      error,
    });
  }
};

// Get About Section
export const getProjectsSectionData = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching projects section",
      error,
    });
  }
};

// Update About Title
export const updateProjectData = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { title, description, caption, btnText, projectLink } = req.body;

    console.log("req.body :", req.body);

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (caption) updateData.caption = caption;
    if (btnText) updateData.btnText = btnText;
    if (projectLink) updateData.projectLink = projectLink;

    const project = await Project.findByIdAndUpdate(projectId, updateData, {
      new: true,
    });
    // const project = await Project.findByIdAndUpdate(
    //   projectId,
    //   {
    //     title,
    //     description,
    //     caption,
    //     btnText,
    //     projectLink,
    //   },
    //   { new: true }
    // );

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update about data",
    });
  }
};

// // Upload / Change About image
export const uploadProjectImage = async (req, res) => {
  try {
    const projectId = req.params.id;
    const projectImage = req.file?.path;
    const publicId = req.file?.filename || req.file?.public_id;
    if (!projectImage) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const project = await Project.findById(projectId);

    // Delete old image if exists
    if (project?.projectImagePublicId) {
      await cloudinary.uploader.destroy(project.projectImagePublicId);
    }
    project.projectImage = projectImage;
    project.projectImagePublicId = publicId;
    await project.save();
    // const updatedprojectData = await project.findByIdAndUpdate(
    //   projectId,
    //   { projectImage },
    //   { new: true }
    // );

    res.status(200).json({
      success: true,
      message: "Project image updated successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update about image",
      error,
    });
  }
};
