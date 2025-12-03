const prisma = require("../prisma.js");

exports.getBookings = async (req, res) => {
  try {
    const { touristId, guideId } = req.query;
    const where = {};
    if (touristId) where.touristId = Number(touristId);
    if (guideId) where.guideId = Number(guideId);
    const bookings = await prisma.booking.findMany({ where });

    res.json({
      status: 'success',
      message: 'Bookings retrieved successfully',
      data: bookings,
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to fetch bookings' },
    });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: Number(req.params.id) }
    });
    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to fetch booking' },
    });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const booking = await prisma.booking.create({
      data: req.body
    });
    res.json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to create booking' },
    });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const updated = await prisma.booking.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.json(updated);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to update booking' },
    });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    await prisma.booking.delete({
      where: { id: Number(req.params.id) }
    });
    res.json({ message: "Booking cancelled" });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to delete booking' },
    });
  }
};
