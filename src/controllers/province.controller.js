const prisma = require("../prisma.js");

exports.getProvinces = async (req, res) => {
  try {
    const provinces = await prisma.province.findMany();
    res.json({
      status: 'success',
      message: 'Provinces retrieved successfully',
      data: provinces
    });
  } catch (error) {
    console.error('Error fetching provinces:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to fetch provinces' }
    });
  }
};

exports.getProvinceById = async (req, res) => {
  try {
    const province = await prisma.province.findUnique({
      where: { id: Number(req.params.id) }
    });
    res.json({
      status: 'success',
      message: 'Province retrieved successfully',
      data: province
    });
  } catch (error) {
    console.error('Error fetching province:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to fetch province' }
    });
  }
};

exports.createProvince = async (req, res) => {
  try {
    const province = await prisma.province.create({ data: req.body });
    res.json({
      status: 'success',
      message: 'Province created successfully',
      data: province
    });
  } catch (error) {
    console.error('Error creating province:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to create province' }
    });
  }
};

exports.updateProvince = async (req, res) => {
  try {
    const updated = await prisma.province.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.json({
      status: 'success',
      message: 'Province updated successfully',
      data: updated
    });
  } catch (error) {
    console.error('Error updating province:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to update province' }
    });
  }
};

exports.deleteProvince = async (req, res) => {
  try {
    await prisma.province.delete({ where: { id: Number(req.params.id) } });
    res.json({
      status: 'success',
      message: 'Province deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting province:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to delete province' }
    });
  }
};
