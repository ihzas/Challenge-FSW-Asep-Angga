const express = require('express');
const carService = require('../services/carService');
const authService = require('../services/authService');
const router = express.Router();

router.use(authService.authenticateToken);

router.get('/', carService.getAllCars);
router.post('/', carService.createCar);
router.get('/:id', carService.getCarById);
router.put('/:id', carService.updateCar);
router.delete('/:id', carService.deleteCar);

module.exports = router;