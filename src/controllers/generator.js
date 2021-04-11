const generator = require('../models/generator');
const climateData = require('../models/climateData');
const energyData = require('../models/energyData');

const generatorController = {
  create: async (req, res) => {
    try {
      const { generatorId, userId } = data;
      const currentGenerator = await Generator.findOrCreate({_id: generatorId })

      if (currentGenerator.userId) return res.json(currentGenerator)

      currentGenerator.userId = userId;
      currentGenerator.save((err, result) => {
        if(err) throw new Error('Não foi possível atualizar o gerador');
        return result;
      });

      return res.json(currentGenerator);
    } catch (e) {
      return res.json(e).status(400);
    }
  },
  findByUser: async (req, res) => {
    try {
      const { climate, energy } = req.query;

      const data = await generator.find().populate();

      return res.json(data)
    } catch (e) {
      return res.json(e).status(400);
    }
  },
  energyDataByUser: async(req, res) => {
    try {
      const generators = await generator.find({userId: req.params.userId}).select('_id')
      let generatorIds = generators.map( item => item._id)

      const data = await energyData.find().where('generator').in(generatorIds)

      return res.json(data);
    } catch (e) {
      return res.json(e).status(400);
    }
  },
  climateDataByUser: async(req, res) => {
    try {
      const { limit, offset } = req.query;
      const generators = await generator.find({userId: req.params.userId}).select('_id')
      let generatorIds = generators.map( item => item._id)
      const data = await climateData.find().where('generator').in(generatorIds)

      return res.json(data);
    } catch (e) {
      return res.json(e).status(400);
    }
  }
}

module.exports = generatorController;