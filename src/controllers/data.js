const Generator = require('../models/generator');
const climate = require('../models/climateData');
const energy = require('../models/energyData');

const dataController = {
  registerClimate: async(data) => {
    try {
      const { generatorId, ...climateData } = data;
      const currentGenerator = await Generator.findOrCreate({_id: generatorId })

      if(!currentGenerator) throw Error('Não foi possível criar o gerador');

      const climateReading = await climate.create(climateData);

      currentGenerator.climateData.push(climateReading)
      await currentGenerator.save();
      console.log(currentGenerator);
    } catch (e) {
      console.log(e);
    }
  },
  registerEnergy: async(data) => {
    try {
      const { generatorId, ...energyData } = data;
      const currentGenerator = await Generator.findOrCreate({_id: generatorId })

      if(!currentGenerator) throw Error('Não foi possível criar o gerador');

      const energyReading = await energy.create(energyData);

      currentGenerator.energyData.push(energyReading)
      currentGenerator.save();
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = dataController;