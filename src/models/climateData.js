const mongoose = require("mongoose");

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
    wind: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ClimateData", ClimateDataSchema);
