const prisma = require("../prisma.js");

exports.getTourists = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { role: "TOURIST" }
    });

    res.json({
      status: 'success',
      message: 'Tourists retrieved successfully',
      data: users
    });
  } catch (error) {
    console.error('Error fetching tourists:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to fetch tourists' }
    });
  }
};

exports.getTouristById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) }
    });

    res.json({
      status: 'success',
      message: 'Tourist retrieved successfully',
      data: user
    });
  } catch (error) {
    console.error('Error fetching tourist:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to fetch tourist' }
    });
  }
};

exports.createTourist = async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: { ...req.body, role: "TOURIST" }
    });

    res.json({
      status: 'success',
      message: 'Tourist created successfully',
      data: user
    });
  } catch (error) {
    console.error('Error creating tourist:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to create tourist' }
    });
  }
};

exports.updateTourist = async (req, res) => {
  try {
    const updated = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });

    res.json({
      status: 'success',
      message: 'Tourist updated successfully',
      data: updated
    });
  } catch (error) {
    console.error('Error updating tourist:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to update tourist' }
    });
  }
};

exports.deleteTourist = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: Number(req.params.id) }
    });

    res.json({
      status: 'success',
      message: 'Tourist deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting tourist:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to delete tourist' }
    });
  }
};
