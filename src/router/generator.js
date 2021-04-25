const express = require("express");
const generatorController = require("../controllers/generator");

const router = express.Router();
router.post("/", generatorController.create);

router.get("/", generatorController.getAll);

router.get("/user/:userId", generatorController.findByUser);

router.get("/user/:userId/energy", generatorController.energyDataByUser);

router.get("/user/:userId/climate", generatorController.climateDataByUser);

router.get("/:generatorId/climate", generatorController.climateDataByGenerator);

router.get("/:generatorId/energy", generatorController.energyDataByGenerator);

router.get("/:generatorId", generatorController.get);

module.exports = router;
