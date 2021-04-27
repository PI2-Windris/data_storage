const seeder = require('mongoose-seed');
const uuid = require('uuid');
const faker = require('faker');
const id = require('mongoose').Types.ObjectId;
const helper = require('./helper');
const gen1 = uuid.v4();
const gen2 = uuid.v4();

let data = [
  {
    model: 'Generator',
    documents: [{
      location: {
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude()
      },
      _id: gen1,
      climateData: [],
      energyData: []
    },
    {
      location: {
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude()
      },
      _id: gen2,
      climateData: [],
      energyData: []
    }]
  },
  {
    model: 'ClimateData',
    documents: []
  },
  {
    model: 'EnergyData',
    documents: []
  }
]

let climate = [];
let energy = [];

for(let j = 0; j < 20; j++){
  climate.push({
    generator: j % 2 == 0 ? gen1 : gen2,
    temperature: helper.randomNumber(-40, 125).toString(),
    umidity: helper.randomNumber(0, 100).toString(),
    windSpeed: helper.randomNumber(0, 33).toString(),
    windDirection: faker.address.direction(),
    co2: helper.randomNumber(0, 2000).toString(),
    rain: helper.randomNumber(0, 20).toString(),
    createdAt: new Date().setHours(new Date().getHours() + j),
    _id: id()
  })
}

for(let j = 0; j < 20; j++){
  energy.push({
    generator: j % 2 == 0 ? gen1 : gen2,
    type: j % 2 == 0 ? "turbine" : "panel",
    averageInputTension: helper.randomNumber(0, 50).toString(),
    averageOutputTension: helper.randomNumber(190, 240).toString(),
    averageOutputCurrent: helper.randomNumber().toString(),
    outputTensionSpike: faker.datatype.number(0, 240).toString(),
    outputCurrentSpike: helper.randomNumber(0, 5).toString(),
    averageBladeFrequency: faker.datatype.number().toString(),
    averageSupply: helper.randomNumber(0, 1000).toString(),
    tension: helper.randomNumber(0, 50).toString(),
    createdAt: new Date().setHours(new Date().getHours() + j),
    _id: id()
  })
}

for(let i = 0; i<2; i++){
  for(let j = 0; j<20; j++) {
    if(j%2 == 0){
      data[0].documents[0].climateData.push(climate[j]._id)
      data[0].documents[0].energyData.push(energy[j]._id)
    } else {
      data[0].documents[1].climateData.push(climate[j]._id)
      data[0].documents[1].energyData.push(energy[j]._id)
    }
  }
}

data[1].documents = (climate);
data[2].documents = (energy);

seeder.connect(process.env.MONGO_URI, () => {
  seeder.loadModels([
    './src/models/climateData.js',
    './src/models/energyData.js',
    './src/models/generator.js'
  ]),
  seeder.populateModels(data, function() {
    seeder.disconnect();
  });
})
