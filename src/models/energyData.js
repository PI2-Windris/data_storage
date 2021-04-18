const mongoose = require("mongoose");

const { Schema } = mongoose;

const EnergyDataSchema = new Schema(
  {    
    generator: {
      type: String,
      ref: "Generator",
    },
    potencyFactor: {
      type: String
    },
    averageInputTension: {
      type: String,
    },
    averageOutputTension: {
      type: String
    },
    averageOutputCurrent: {
      type: String
    },
    outputTensionSpike: {
      type: String
    },
    outputCurrentSpike: {
      type: String
    },
    averageBladeFrequency: {
      type: String
    },
    averageSupply: {
      type: String
    },
    tension: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("EnergyData", EnergyDataSchema);
