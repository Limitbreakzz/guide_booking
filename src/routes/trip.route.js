const express = require('express');
const app = express.Router();
const controller = require('../controllers/trip.controller');

app.get('/', controller.getTrips);

app.get('/:id', controller.getTripById);

app.post('/', controller.createTrip);

app.put('/:id', controller.updateTrip);

app.delete('/:id', controller.deleteTrip);

module.exports = app;