const express = require('express');
const app = express.Router();
const controller = require('../controllers/tourist.controller');

app.get('/', controller.getTourists);

app.get('/:id', controller.getTouristById);

app.post('/', controller.createTourist);

app.put('/:id', controller.updateTourist);

app.delete('/:id', controller.deleteTourist);

module.exports = app;