const generator = require("../models/generator");
const climateData = require("../models/climateData");
const energyData = require("../models/energyData");

const generatorController = {
  create: async (req, res) => {
    try {
      const { generatorId, userId } = req.body;
      const currentGenerator = await generator.findOrCreate({
        _id: generatorId,
      });

      if (currentGenerator.userId) return res.json(currentGenerator);

      currentGenerator.userId = userId;
      currentGenerator.save((err, result) => {
        if (err) throw new Error("Não foi possível atualizar o gerador");
        return result;
      });

      return res.json(currentGenerator);
    } catch (e) {
      return res.json(e).status(400);
    }
  },
  findByUser: async (req, res) => {
    try {
      const data = await generator.find({ userId: req.params.userId});

      return res.json(data);
    } catch (e) {
      return res.json(e).status(400);
    }
  },
  energyDataByUser: async (req, res) => {
    try {
      const generators = await generator
        .find({ userId: req.params.userId })
        .select("_id");
      /* eslint-disable-next-line no-underscore-dangle */
      const generatorIds = generators.map((item) => item._id);

      const data = await energyData.find().where("generator").in(generatorIds);

      return res.json(data);
    } catch (e) {
      return res.json(e).status(400);
    }
  },
  climateDataByUser: async (req, res) => {
    try {
      const generators = await generator
        .find({ userId: req.params.userId })
        .select("_id");
      /* eslint-disable-next-line no-underscore-dangle */
      const generatorIds = generators.map((item) => item._id);
      const data = await climateData.find().where("generator").in(generatorIds);

      return res.json(data);
    } catch (e) {
      return res.json(e).status(400);
    }
  },

  energyDataByGenerator: async (req, res) => {
    try {
      const { generatorId } = req.params;

      const data = await generator.findById(generatorId).populate('energyData')

      res.json(data);
    } catch (e) {
      res.json(e).status(400);
    }
  },
  climateDataByGenerator: async (req, res) => {
    try {
      const { generatorId } = req.params;

      const data = await generator.findById(generatorId).populate('climateData')

      res.json(data);
    } catch (e) {
      res.json(e).status(400);
    }
  },
  get: async (req, res) => {
    try {
      const { generatorId } = req.params;

      const data = await generator.findById(generatorId);

      res.json(data);
    } catch (e) {
      res.json(e).status(400);
    }
  }
};

module.exports = generatorController;
