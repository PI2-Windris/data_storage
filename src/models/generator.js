const mongoose = require("mongoose");
const toCsv = require("../utils/csv");

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
        type: String,
      },
      longitude: {
        type: String,
      },
    },
    energyData: [{ type: mongoose.Schema.Types.ObjectId, ref: "EnergyData" }],
    climateData: [{ type: mongoose.Schema.Types.ObjectId, ref: "ClimateData" }],
  },
  { _id: false, timestamps: true }
);

GeneratorSchema.statics.findOrCreate = async function (condition, callback) {
  const self = this;
  /* eslint-disable-next-line arrow-body-style */
  let result = await self.findOne(condition);
  if (!result) result = await self.create(condition);
  return result;
};

GeneratorSchema.methods.climateDataToCsv = async function () {

  const fields = [
    { label: "Latitude", value: () => this.location.latitude },
    { label: "Longitude", value: () => this.location.longitude },
    { label: "Umidade(RH)", value: "umidity" },
    { label: "Temperatura(ºC)", value: "temperature", default: null },
    { label: "Vento(m/s)", value: "windVelocity", default: null },
    { label: "Direção do Vento", value: "windDirection", default: null },
    { label: "Nível de Chuva(mm)", value: "rain", default: null },
    { label: "CO² Gasoso(ppm)", value: "co2", default: null },
    { label: "Horário da Medição", value: "createdAt", default: null },
  ];

  const csv = await toCsv.transform(this.climateData, fields);
  return csv;
};

GeneratorSchema.methods.energyDataToCsv = async function () {
  const fields = [
    { label: "Latitude", value: () => this.location.latitude },
    { label: "Longitude", value: () => this.location.longitude },
    { label: "Tensão de Entrada(V)", value: "averageInputTension" },
    {
      label: "Tensão Média de Saída (V)",
      value: "averageOutputTension",
      default: null,
    },
    {
      label: "Tensão Pico de Saída (V)",
      value: "outputTensionSpike",
      default: null,
    },
    {
      label: "Corrente Média de Saída(A)",
      value: "averageOutputCurrent",
      default: null,
    },
    {
      label: "Pico de Corrente de Saída(A)",
      value: "outputCurrentSpike",
      default: null,
    },
    {
      label: "Frequência Média das Pás(RPM)",
      value: "averageBladeFrequency",
      default: null,
    },
    { label: "Fornecimento Médio(Watts)", value: "averageSupply", default: null },
    { label: "Horário da Medição", value: "createdAt", default: null },
  ];

  const csv = await toCsv.transform(this.energyData, fields);
  return csv;
};

module.exports = mongoose.model("Generator", GeneratorSchema);
