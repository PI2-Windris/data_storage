const generator = require('../models/generator');
const climate = require('../models/climateData');
const energyData = require('../models/energyData');

const generatorController = {
  create: async (req, res) => {
    try {
      const { userId, generatorId } = req.body;
      if(!userId || !generatorId) throw new Error('Dados incompletos');

      const generator = await Generator.create({
        _id: generatorId,
        userId
      })

      if(!generator) throw new Error('Não foi possível cadastrar o gerador');

      return res.json(generator);
    } catch (e) {
      return res.json(e).status(400);
    }
  },
  findByUser: async (req, res) => {
    try {
      const data = await generator.find({userId: req.params.userId}).select('_id', 'userId')
      return res.json(data)
    } catch (e) {
      return res.json(e).status(400);
    }
  },
  energyDataByUser: async(req, res) => {
    try {
      const generators = await generator.find({userId: req.params.userId}).select('_id')
      let generatorIds = generators.map( item => item._id)

      const data = await energyData.find().where('generator._id').in(generatorIds)

      return res.json(data);
    } catch (e) {
      return res.json(e).status(400);
    }
  },
  climateDataByUser: async(req, res) => {
    try {
      const generators = await generator.find({userId: req.params.userId}).select('_id')
      let generatorIds = generators.map( item => item._id)
      const data = await energyData.find().where('generator._id').in(generatorIds)

      return res.json(data);
    } catch (e) {
      return res.json(e).status(400);
    }
  }
}

module.exports = generatorController;