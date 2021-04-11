const mongoose = require("mongoose");
const uuid = require('uuid')
const Schema = mongoose.Schema;

let EnergyDataSchema = new Schema({
  generator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Generator'
  },
  watts: {
    type:String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('EnergyData', EnergyDataSchema);