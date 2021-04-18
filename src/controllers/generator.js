const generator = require("../models/generator");
const climateData = require("../models/climateData");
const energyData = require("../models/energyData");
const receiver = require("../mqtt/receiver");
const toCsv = require("../utils/csv");
const prepareQuery = require("../utils/query");

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

      res.json(currentGenerator);
      receiver.publish(`generator/${currentGenerator._id}`, `userId: ${currentGenerator.userId}`)
      return;
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
      const { format, skip, limit, dateQuery } = prepareQuery(req.query)

      const data = await energyData
                          .find(dateQuery)
                          .skip(skip)
                          .limit(limit)
                          .where(`generator.userId = ${req.params.userId}`)
                          .populate('generator');
      /* Sadly the above query returns an array of instances of energyData
      * so it's not possible to use instance methods to generate the csv, which would be
      * a cleaner way of doing so. 
      */
      if (format === 'csv' ) {
        const fields = [
          { label: "Latitude", value: "generator.location.latitude"  },
          { label: "Longitude", value: "generator.location.longitude" },
          { label: "Tensão de Entrada(V)", value: "averageInputTension" },
          { label: "Tensão Média de Saída (V)", value: "averageOutputTension", default: null },
          { label: "Tensão Pico de Saída (V)", value: "outputTensionSpike", default: null },
          { label: "Corrente Média de Saída(A)", value: "averageOutputCurrent", default: null },
          { label: "Pico de Corrente de Saída(A)", value: "outputCurrentSpike", default: null },
          { label: "Frequência Média das Pás(RPM)", value: "averageBladeFrequency", default: null },
          { label: "Fornecimento Médio(VA)", value: "averageSupply", default: null },
          { label: "Tensão(V)", value: "tension", default: null },
          { label: "Horário da Medição", value: "createdAt", default: null }
        ]
            
        const csv = await toCsv.transform(data, fields)      
        res.header('Content-Type', 'text/csv');
        res.attachment('data.csv')
        return res.status(200).send(csv)
      }

      return res.json(data);
    } catch (e) {
      return res.json(e).status(400);
    }
  },
  climateDataByUser: async (req, res) => {
    try {
      const { format, skip, limit, dateQuery } = prepareQuery(req.query)

      const data = await climateData
                          .find(dateQuery)
                          .skip(skip)
                          .limit(limit)
                          .where(`generator.userId = ${req.params.userId}`)
                          .populate('generator.location');

      if (format === 'csv' ) {
        const fields = [
          { label: "Latitude", value: "generator.location.latitude"  },
          { label: "Longitude", value: "generator.location.longitude" },
          { label: "Umidade(RH)", value: "umidity" },
          { label: "Temperatura(ºC)", value: "temperature", default: null },
          { label: "Vento(m/s)", value: "wind", default: null },
          { label: "CO² Gasoso(ppm)", value: "co2", default: null },
          { label: "Horário da Medição", value: "createdAt", default: null }
        ]
      
        const csv = await toCsv.transform(data, fields)      
        res.header('Content-Type', 'text/csv');
        res.attachment('data.csv')
        return res.status(200).send(csv)
      }
      
      return res.json(data);
    } catch (e) {
      return res.json(e).status(400);
    }
  },

  energyDataByGenerator: async (req, res) => {
    try {
      const { generatorId } = req.params;
      const { format, skip, limit, dateQuery } = prepareQuery(req.query)

      const data = await generator
                          .findById(generatorId)
                          .populate({
                            path: 'energyData',
                            options: {
                              limit: limit,
                              skip: skip
                            },
                            match: dateQuery
                          })

      if (format == 'csv' ) {
        const csv = await data.energyDataToCsv();
        res.header('Content-Type', 'text/csv');
        res.attachment('data.csv')
        return res.status(200).send(csv)
      }

      return res.json(data);
    } catch (e) {
      return res.json(e).status(400);
    }
  },
  climateDataByGenerator: async (req, res) => {
    try {
      const { generatorId } = req.params;
      const { format, skip, limit, dateQuery } = prepareQuery(req.query)

      const data = await generator
                          .findById(generatorId)
                          .populate({
                            path: 'climateData',
                            options: {
                              limit: limit,
                              skip: skip
                            },
                            match: dateQuery
                          })

      if (format == 'csv' ) {
        const csv = await data.climateDataToCsv();
        res.header('Content-Type', 'text/csv');
        res.attachment('data.csv')
        return res.status(200).send(csv)
      }

      return res.json(data);
    } catch (e) {
      return res.json(e).status(400);
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
  },
  getAll: async (req, res) => {
    try {
      const data = await generator.find({userId: null})
      return res.json(data)
    } catch (e) {
      return res.json(e).status(400)
    }
  }
};

module.exports = generatorController;
