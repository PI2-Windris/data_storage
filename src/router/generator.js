const express = require('express');
const generatorController = require('../controllers/generator');
const generator = require('../models/generator');

const router = express.Router();

router.post('/', generatorController.create);

router.get('/:userId', generatorController.findByUser);

router.get('/:userId/energy', generatorController.energyDataByUser);

router.get('/:userId/climate', generatorController.climateDataByUser);

module.exports = router;