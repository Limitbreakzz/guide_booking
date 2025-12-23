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
    
    res.json({ 
      status: "success", 
      message: 'Bookings retrieved successfully',
      data: booking 
    });
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
    const { tripId } = req.body;
    const touristId = req.user.id;

    const trip = await prisma.trip.findUnique({ where: { id: Number(tripId) } });
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    const booking = await prisma.booking.create({
      data: {
        tripId: trip.id,
        touristId: touristId,
        guideId: trip.guideId,
        provinceId: trip.provinceId,
        status: "PENDING",
        datetime: new Date(req.body.datetime)
      }
    });

    const thaiDatetime = new Date(booking.datetime);
    thaiDatetime.setHours(thaiDatetime.getHours() + 7);

    res.json({ 
      status: "success", 
      message: 'Bookings created successfully',
      data: {
        ...booking,
        datetime: thaiDatetime.toISOString().replace("Z", "+07:00")
      }
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message,
    });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const { datetime, status } = req.body;

    const updated = await prisma.booking.update({
      where: { id: Number(req.params.id) },
      data: {
        datetime: datetime ? new Date(datetime) : undefined,
        status
      }
    });

    const thaiDatetime = new Date(updated.datetime);
    thaiDatetime.setHours(thaiDatetime.getHours() + 7);

    res.json({
      status: "success",
      message: "Booking updated successfully",
      data: {
        ...updated,
        datetime: thaiDatetime.toISOString().replace("Z", "+07:00")
      }
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({
      status: "error",
      message: "Unable to update booking",
      error: { detail: 'Unable to update booking' },
    });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    await prisma.booking.delete({
      where: { id: Number(req.params.id) }
    });

    res.json({ 
      status: 'success',
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to delete booking' },
    });
  }
};

