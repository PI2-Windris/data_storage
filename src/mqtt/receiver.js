const mqtt = require("mqtt");
const logger = require("../utils/logger");
const helper = require("./helpers");
const dataController = require("../controllers/data");

const receiver = {
  connect: (connectCallback, messageCallback) => {
    const options = {
      port: process.env.MQTT_PORT,
      host: process.env.MQTT_HOST,
      rejectUnauthorized: false,
      protocol: "mqtts",
    };

    logger.info("Connecting to Mqtt Broker", process.env.MQTT_HOST);

    receiver.client = mqtt.connect(options);

    receiver.client.on("connect", () => {
      logger.info("Connected to Mqtt broker");

      receiver.client.subscribe("energy");
      receiver.client.subscribe("generator/+");
      receiver.client.subscribe("climate");
      receiver.client.on("message", (topic, message) => {
        const parsed = helper.parseMessage(message);
        logger.info("Topico:", topic);
        if (topic === "climate") {
          dataController.registerClimate(parsed);
          messageCallback(parsed);
        }
        if (topic === "energy") {
          dataController.registerEnergy(parsed);
          messageCallback(parsed);
        }
      });
    });

    connectCallback();
  },
  publish: (topic, message) => {
    receiver.client.publish(topic, message.toString());
  },
};

module.exports = receiver;
