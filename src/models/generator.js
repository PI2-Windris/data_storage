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

GeneratorSchema.statics.findOrCreate = async function (condition, callback) {
  const self = this;
  return self.findOne(condition, (err, result) => {
    return result ? result : self.create(condition, (err, result) => { callback(err, result)})
  })
}


module.exports = mongoose.model('Generator', GeneratorSchema);