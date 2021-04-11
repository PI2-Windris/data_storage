const mqtt = require("mqtt");
const logger = require('pino')({ prettyPrint: true });
const helper = require('./helpers');
const climateData = require('../models/climateData');
const energyData = require('../models/energyData');
const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const receiver = {
  connect: (connectCallback, messageCallback) => {
    const options = {
      port: process.env.MQTT_PORT,
      host: process.env.MQTT_HOST,
      rejectUnauthorized: false,
      protocol: 'mqtts'
    };

    logger.info('Connecting to Mqtt Broker', process.env.MQTT_HOST)

    receiver.client = mqtt.connect(options);

    receiver.client.on('connect', () => {
      logger.info('Connected to Mqtt broker');

      receiver.client.subscribe('climate');
      receiver.client.on('message', (topic, message) => {
        if(topic === 'climate') {
          let parsed = helper.parseMessage(message);
          // parsed.generator = new ObjectId(parsed.generator);
          console.log(typeof(parsed.generator));
          climateData.create(parsed);
          messageCallback(helper.parseMessage(message)) 
        }
      })
      receiver.client.subscribe('energy');
      receiver.client.on('message', (topic, message) => {
        if(topic === 'energy') {
          messageCallback(helper.parseMessage(message)) 
        }
      })

    })

    connectCallback();
  }
}

module.exports = receiver;