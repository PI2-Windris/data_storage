const mongoose = require("mongoose");
const toCsv = require ("../utils/csv");

const { Schema } = mongoose;

const ClimateDataSchema = new Schema(
  {
    generator: {
      type: String,
      ref: "Generator",
    },
    umidity: {
      type: String,
    },
    temperature: {
      type: String,
    },
    windVelocity: {
      type: String,
    },
    windDirection: {
      type: String,
    },
    rain: {
      type: String,
    },
    co2: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

ClimateDataSchema.methods.toCsv = async function(){
  const latitude = this.generator.latitude;
  const longitude = this.generator.longitude;

  const fields = [
    { label: "Latitude", value: () => latitude },
    { label: "Longitude", value: () => longitude},
    { label: "Umidade(RH)", value: "umidity" },
    { label: "Temperatura(ºC)", value: "temperature", default: null },
    { label: "Vento(m/s)", value: "windVelocity", default: null },
    { label: "Direção do Vento", value: "windDirection", default: null },
    { label: "Nível de Chuva(mm)", value: "rain", default: null },
    { label: "CO² Gasoso(ppm)", value: "co2", default: null },
    { label: "Horário da Medição", value: "createdAt", default: null }
  ]

  const csv = await toCsv.transform(this.climateData, fields)
  return csv;
}

module.exports = mongoose.model("ClimateData", ClimateDataSchema);
