const express = require('express');
const app = express.Router();
const auth = require("../middlewares/auth");
const { requireRole } = require("../middlewares/role");
const controller = require('../controllers/booking.controller');

app.get('/', auth, controller.getBookings);

app.get('/:id',auth, controller.getBookingById);

app.post('/',auth, controller.createBooking);

app.put('/:id',auth, controller.updateBooking);

app.delete('/:id',auth, controller.deleteBooking);


module.exports = app;