const mongoose = require("mongoose");

const { Schema } = mongoose;

const GeneratorSchema = new Schema(
  {
    _id: {
      type: String,
    },
    userId: {
      type: String,
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

module.exports = mongoose.model("Generator", GeneratorSchema);
