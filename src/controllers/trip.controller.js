const prisma = require("../prisma.js");

exports.getTrips = async (req, res) => {
  try {
    const { locationId } = req.query;
    const trips = await prisma.trip.findMany({
      where: locationId ? { provinceId: Number(locationId) } : {}
    });

    res.json({
      status: 'success',
      message: 'Trips retrieved successfully',
      data: trips
    });
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to fetch trips' }
    });
  }
};

exports.getTripById = async (req, res) => {
  try {
    const trip = await prisma.trip.findUnique({
      where: { id: Number(req.params.id) }
    });

    res.json({
      status: 'success',
      message: 'Trip retrieved successfully',
      data: trip
    });
  } catch (error) {
    console.error('Error fetching trip:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to fetch trip' }
    });
  }
};

exports.createTrip = async (req, res) => {
  try {
    const trip = await prisma.trip.create({
      data: req.body
    });

    res.json({
      status: 'success',
      message: 'Trip created successfully',
      data: trip
    });
  } catch (error) {
    console.error('Error creating trip:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to create trip' }
    });
  }
};

exports.updateTrip = async (req, res) => {
  try {
    const updated = await prisma.trip.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });

    res.json({
      status: 'success',
      message: 'Trip updated successfully',
      data: updated
    });
  } catch (error) {
    console.error('Error updating trip:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to update trip' }
    });
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    await prisma.trip.delete({
      where: { id: Number(req.params.id) }
    });

    res.json({
      status: 'success',
      message: 'Trip deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting trip:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to delete trip' }
    });
  }
};
