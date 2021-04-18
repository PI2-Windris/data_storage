const mongoose = require("mongoose");
const toCsv = require ("../utils/csv");

const { Schema } = mongoose;

const GeneratorSchema = new Schema(
  {
    _id: {
      type: String,
    },
    userId: {
      type: String,
    },
    location: {
      latitude: {
        type: String
      },
      longitude: {
        type: String
      }
    },
    energyData: [{ type: mongoose.Schema.Types.ObjectId, ref: "EnergyData" }],
    climateData: [{ type: mongoose.Schema.Types.ObjectId, ref: "ClimateData" }],
  },
  { _id: false }
);

GeneratorSchema.statics.findOrCreate = async function (condition, callback) {
  const self = this;
  /* eslint-disable-next-line arrow-body-style */
  return self.findOne(condition, (err, result) => {
    if(!result) {
      result = self.create(condition, (err, res) => {
        return res;
      })
    }
    return result;
  });
};

GeneratorSchema.methods.climateDataToCsv = async function () {
  const fields = [
    { label: "Latitude", value: () => this.latitude },
    { label: "Longitude", value: () => this.longitude},
    { label: "Umidade(RH)", value: "umidity" },
    { label: "Temperatura(ºC)", value: "temperature", default: null },
    { label: "Vento(m/s)", value: "wind", default: null },
    { label: "CO² Gasoso(ppm)", value: "co2", default: null },
    { label: "Horário da Medição", value: "createdAt", default: null }
  ]

  const csv = await toCsv.transform(this.climateData, fields)
  return csv;
}

GeneratorSchema.methods.energyDataToCsv = async function () {
  const fields = [
    { label: "Latitude", value: () => this.latitude },
    { label: "Longitude", value: () => this.longitude},
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

  const csv = await toCsv.transform(this.energyData, fields)
  return csv;
}


module.exports = mongoose.model("Generator", GeneratorSchema);
