const mongoose = require("mongoose");
const uuid = require('uuid')
const Schema = mongoose.Schema;

let GeneratorSchema = new Schema({
  _id: {
    type: String
  },
  userId: {
    type: String
  },
  energyData: [
    {type: mongoose.Schema.Types.ObjectId, ref:'EnergyData'}
  ],
  climateData: [
    {type: mongoose.Schema.Types.ObjectId, ref:'ClimateData'}
  ]
}, { _id: false });

module.exports = mongoose.model('Generator', GeneratorSchema);