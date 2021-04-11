const mongoose = require("mongoose");
const uuid = require('uuid')
const Schema = mongoose.Schema;

let ClimateDataSchema = new Schema({
  generator: {
    type: String,
    ref:'Generator'
  },
  umidity: {
    type:String
  },
  temperature: {
    type:String
  },
  wind: {
    type:String
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('ClimateData', ClimateDataSchema);