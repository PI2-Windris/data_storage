const Generator = require("../models/generator");
const climate = require("../models/climateData");
const energy = require("../models/energyData");
const logger = require("../utils/logger");

const dataController = {
  registerClimate: async (data) => {
    try {
      logger.info(data);
      const { generatorId, ...climateData } = data;

      const currentGenerator = await Generator.findOrCreate({
        _id: generatorId,
      });

      if (!currentGenerator) throw Error("Não foi possível criar o gerador");

      const climateReading = await climate.create({ generator: generatorId, ...climateData});

      currentGenerator.climateData.push(climateReading);

      await currentGenerator.save();
    } catch (e) {
      logger.error(e);
    }
  },
  registerEnergy: async (data) => {
    try {
      const { generatorId, ...energyData } = data;
      const currentGenerator = await Generator.findOrCreate({
        _id: generatorId,
      });

      if (!currentGenerator) throw Error("Não foi possível criar o gerador");

      const energyReading = await energy.create({ generator: generatorId, ...energyData });

      currentGenerator.energyData.push(energyReading);
      currentGenerator.save();
    } catch (e) {
      logger.error(e);
    }
  },
};

module.exports = dataController;
