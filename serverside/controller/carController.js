const db = require('../database/db');

const getCars = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM cars');
        res.json(rows);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal Server Error');
    }
};

const getCarById = async (req, res) => {
    const { id } = req.params;

    try {
        const { rows } = await db.query('SELECT * FROM cars WHERE id = $1', [id]);

        if (rows.length === 0) {
            res.status(404).send('Car not found');
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal Server Error');
    }
};

const createCar = async (req, res) => {
    const { name, model, transmissions, year } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        const result = await db.query(
            'INSERT INTO cars (name, model, image, transmissions, year) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, model, image, transmissions, year]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating car', error);
        res.status(500).send('Internal Server Error');
    }
};

const updateCar = async (req, res) => {
    const { id } = req.params;
    const { name, model, transmissions, year } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        const result = await db.query(
            'UPDATE cars SET name = $1, model = $2, image = $3, transmissions = $4, year = $5 WHERE id = $6 RETURNING *',
            [name, model, image, transmissions, year, id]
        );

        if (result.rows.length === 0) {
            res.status(404).send('Car not found');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error('Error updating car', error);
        res.status(500).send('Internal Server Error');
    }
};

const deleteCar = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('DELETE FROM cars WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            res.status(404).send('Car not found');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error('Error deleting car', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
};
