const mqtt = require("mqtt");
const logger = require('pino')({ prettyPrint: true });
const helper = require('./helpers');

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

      receiver.client.subscribe(process.env.MQTT_TOPIC);

      receiver.client.on('message', (topic, message) => {
        if(topic === process.env.MQTT_TOPIC) {
          messageCallback(helper.parseMessage(message)) 
        }
      })
    })

    connectCallback();
  }
}

module.exports = receiver;