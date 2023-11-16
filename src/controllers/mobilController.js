// src/controllers/mobilController.js
const Mobil = require('../models/mobil');

exports.getAllMobil = async (req, res) => {
    try {
        const mobil = await Mobil.getAllMobil();
        res.json(mobil);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getMobilById = async (req, res) => {
    const { id } = req.params;
    try {
        const mobil = await Mobil.getMobilById(id);
        if (mobil) {
            res.json(mobil);
        } else {
            res.status(404).json({ error: 'Mobil not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createMobil = async (req, res) => {
    const mobilData = req.body;
    mobilData.image = req.file.filename;
    try {
        const newMobilId = await Mobil.createMobil(mobilData);
        res.json({ id: newMobilId, message: 'Mobil created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateMobil = async (req, res) => {
    const { id } = req.params;
    const mobilData = req.body;
    mobilData.image = req.file.filename;
    try {
        const updated = await Mobil.updateMobil(id, mobilData);
        if (updated) {
            res.json({ message: 'Mobil updated successfully' });
        } else {
            res.status(404).json({ error: 'Mobil not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteMobil = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Mobil.deleteMobil(id);
        if (deleted) {
            res.json({ message: 'Mobil deleted successfully' });
        } else {
            res.status(404).json({ error: 'Mobil not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
