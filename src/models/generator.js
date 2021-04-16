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
  let result =  await self.findOne(condition);

  if(!result) result = await self.create(condition);

  return result;
};

module.exports = mongoose.model("Generator", GeneratorSchema);
