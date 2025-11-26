import Contact from "../modals/contact.model.js";

export const createContactSection = async (req, res) => {
  const { location, emailAddress, gitHubAccount } = req.body;

  try {
    const contact = await Contact.create({
      location,
      emailAddress,
      gitHubAccount,
    });

    res.status(200).json({
      success: true,
      message: "Contact section created successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating contact section",
      error,
    });
  }
};

export const getContactSectionData = async (req, res) => {
  try {
    const contactData = await Contact.findOne();
    res.status(200).json({
      success: true,
      contactData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching contact section",
      error,
    });
  }
};

export const updateContactSection = async (req, res) => {
  try {
    const contactId = req.params.id;
    const { location, emailAddress, gitHubAccount } = req.body;

    const updatedContactData = await Contact.findByIdAndUpdate(
      contactId,
      { location, emailAddress, gitHubAccount },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Contact data updated successfully",
      contactData: updatedContactData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update contact data",
      error,
    });
  }
};
