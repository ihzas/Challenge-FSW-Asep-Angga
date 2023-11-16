// src/routes/mobilRoutes.js
const express = require('express');
const router = express.Router();
const multer = require("multer")
const mobilController = require('../controllers/mobilController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get('/', mobilController.getAllMobil);
router.get('/:id', mobilController.getMobilById);
router.post('/', upload.single('image'), mobilController.createMobil);
router.put('/:id', upload.single('image'), mobilController.updateMobil);
router.delete('/:id', mobilController.deleteMobil);

module.exports = router;
