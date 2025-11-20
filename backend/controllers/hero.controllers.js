import cloudinary from "../config/cloudinary.js";
import Hero from "../modals/hero.model.js";

// Create Hero Section (description only)
export const createHeroSection = async (req, res) => {
  const { description, username } = req.body;

  if (!description && !username) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const heroData = await Hero.create({
      description,
      username,
      // heroImage: req.file?.path || "",
    });

    res.status(200).json({
      success: true,
      message: "Hero section created successfully",
      heroData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating hero section",
      error,
    });
  }
};

// Get Hero Section
export const getHeroSectionData = async (req, res) => {
  try {
    const heroData = await Hero.findOne();
    res.status(200).json({
      success: true,
      heroData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching hero section",
      error,
    });
  }
};

// Update Hero description
export const updateHeroSectionData = async (req, res) => {
  try {
    const heroId = req.params.id;
    const { description, username } = req.body;

    const updatedHeroData = await Hero.findByIdAndUpdate(
      heroId,
      { description, username },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Hero description updated successfully",
      heroData: updatedHeroData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update hero description",
      error,
    });
  }
};

// Upload / Change hero image
export const uploadHeroImage = async (req, res) => {
  try {
    const heroId = req.params.id;
    const heroImage = req.file?.path;
    const publicId = req.file?.filename || req.file?.public_id;
    if (!heroImage) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    // Find existing user
    const hero = await Hero.findById(heroId);

    // Delete old image if exists
    if (hero?.heroImagePublicId) {
      await cloudinary.uploader.destroy(hero.heroImagePublicId);
    }
    hero.heroImage = heroImage;
    hero.heroImagePublicId = publicId;
    await hero.save();
    // const updatedHeroData = await Hero.findByIdAndUpdate(
    //   heroId,
    //   { heroImage, heroImagePublicId: publicId },
    //   { new: true }
    // );

    res.status(200).json({
      success: true,
      message: "Hero image updated successfully",
      heroData: hero,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update hero image",
      error,
    });
  }
};
