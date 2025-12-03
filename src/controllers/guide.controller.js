const prisma = require("../prisma.js");

exports.getGuides = async (req, res) => {
  try {
    const guides = await prisma.user.findMany({
      where: { role: "GUIDE" }
    });

    res.json({
      status: 'success',
      message: 'Guides retrieved successfully',
      data: guides
    });
  } catch (error) {
    console.error('Error fetching guides:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to fetch guides' }
    });
  }
};

exports.getGuideById = async (req, res) => {
  try {
    const guide = await prisma.user.findUnique({
      where: { id: Number(req.params.id) }
    });

    res.json({
      status: 'success',
      message: 'Guide retrieved successfully',
      data: guide
    });
  } catch (error) {
    console.error('Error fetching guide:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to fetch guide' }
    });
  }
};

exports.createGuide = async (req, res) => {
  try {
    const { name, email, password, experience, language } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Email already exists'
      });
    }

    const guide = await prisma.user.create({
      data: {
        name,
        email,
        password,
        experience,
        language,
        role: "GUIDE"
      }
    });

    res.json({
      status: 'success',
      message: 'Guide created successfully',
      data: guide
    });

  } catch (error) {
    console.error('Error creating guide:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message
    });
  }
};

exports.updateGuide = async (req, res) => {
  try {
    const updated = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });

    res.json({
      status: 'success',
      message: 'Guide updated successfully',
      data: updated
    });
  } catch (error) {
    console.error('Error updating guide:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to update guide' }
    });
  }
};

exports.deleteGuide = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: Number(req.params.id) }
    });

    res.json({
      status: 'success',
      message: 'Guide deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting Guide:', error);

    if (error.code === 'P2025') {
      return res.status(404).json({
        status: 'fail',
        message: 'Guide not found',
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to delete user' },
    });
  }
};
