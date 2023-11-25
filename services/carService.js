const { Car } = require('../models');

async function getAllCars(req, res) {
    try {
        const cars = await Car.findAll();
        res.json(cars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function createCar(req, res) {
    const { make, model } = req.body;
    const createdBy = req.user.username;

    try {
        const car = await Car.create({ make, model, createdBy });
        res.json(car);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getCarById(req, res) {
    const carId = req.params.id;

    try {
        const car = await Car.findByPk(carId);

        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        res.json(car);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function updateCar(req, res) {
    const carId = req.params.id;
    const { make, model } = req.body;
    const updatedBy = req.user.username;

    try {
        const car = await Car.findByPk(carId);

        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        car.make = make;
        car.model = model;
        car.updatedBy = updatedBy;

        await car.save();

        res.json(car);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function deleteCar(req, res) {
    const carId = req.params.id;
    const deletedBy = req.user.username;

    try {
        const car = await Car.findByPk(carId);

        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        car.deletedBy = deletedBy;
        await car.destroy();

        res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    getAllCars,
    createCar,
    getCarById,
    updateCar,
    deleteCar,
};
