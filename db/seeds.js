const seeder = require('mongoose-seed');
const uuid = require('uuid');
const faker = require('faker');
const id = require('mongoose').Types.ObjectId;
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
    temperature: faker.datatype.number(40).toString(),
    umidity: faker.datatype.number(60).toString(),
    windSpeed: faker.datatype.number(25).toString(),
    windDirection: faker.address.direction(),
    co2: faker.datatype.number(1000).toString(),
    rain: faker.datatype.number(20).toString(),
    _id: id()
  })
}

for(let j = 0; j < 20; j++){
  energy.push({
    generator: j % 2 == 0 ? gen1 : gen2,
    type: j % 2 == 0 ? "turbine" : "panel",
    averageInputTension: faker.datatype.number(500).toString(),
    averageOutputTension: faker.datatype.number(1000).toString(),
    averageOutputCurrent: faker.datatype.number(500).toString(),
    outputTensionSpike: faker.datatype.number(300).toString(),
    outputCurrentSpike: faker.datatype.number(400).toString(),
    averageBladeFrequency: faker.datatype.number(800).toString(),
    averageSupply: faker.datatype.number(600).toString(),
    tension: faker.datatype.number(200).toString(),
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
