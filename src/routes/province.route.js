const express = require('express');
const app = express.Router();
const controller = require('../controllers/province.controller');

app.get('/', controller.getProvinces);

app.get('/:id', controller.getProvinceById);

app.post('/', controller.createProvince);

app.put('/:id', controller.updateProvince);

app.delete('/:id', controller.deleteProvince);

module.exports = app;