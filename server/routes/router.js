const express = require('express');
const route = express.Router();
const services = require('../services/render');
const controller = require('../controller/controller');

// home routes for

route.get('/',services.clientRoutes);

route.get('/driver',services.driverRoutes);

route.get('/send-bookings',services.bookingRoutes);

route.get('/send-loc',services.locationRoutes);

route.post('/send-loc', services.locationRoutes);


// API routes
route.post('/send-loc/api/drivers',controller.create);
route.get('/send-loc/api/drivers',controller.find);
route.put('/send-loc/api/drivers/:id',controller.update);

module.exports = route;