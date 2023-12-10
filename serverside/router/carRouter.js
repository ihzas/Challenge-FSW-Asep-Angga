const express = require('express');
const { getCars, getCarById, createCar, updateCar, deleteCar } = require('../controller/carController');
const uploadMiddleware = require('../middleware/uploadMiddleware');

const router = express.Router();

// Route to get all cars
router.get('/cars', getCars);

// Route to get a car by ID
router.get('/cars/:id', getCarById);

// Route to create a car
router.post('/cars', uploadMiddleware.single('image'), createCar);

// Route to update a car
router.put('/cars/:id', uploadMiddleware.single('image'), updateCar);

// Route to delete a car
router.delete('/cars/:id', deleteCar);

module.exports = router;
