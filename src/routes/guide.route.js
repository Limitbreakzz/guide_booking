const express = require('express');
const app = express.Router();
const controller = require('../controllers/guide.controller');

app.get('/', controller.getGuides);

app.get('/:id', controller.getGuideById);

app.post('/', controller.createGuide);

app.put('/:id', controller.updateGuide);

app.delete('/:id', controller.deleteGuide);

module.exports = app;