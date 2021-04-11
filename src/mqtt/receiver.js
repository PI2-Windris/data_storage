const mqtt = require("mqtt");
const logger = require("pino")({ prettyPrint: true });
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

      receiver.client.subscribe("climate");
      receiver.client.on("message", (topic, message) => {
        if (topic === "climate") {
          const parsed = helper.parseMessage(message);
          dataController.registerClimate(parsed);
          messageCallback(parsed);
        }
      });
      receiver.client.subscribe("energy");
      receiver.client.on("message", (topic, message) => {
        if (topic === "energy") {
          const parsed = helper.parseMessage(message);
          dataController.registerEnergy(parsed);
          messageCallback(parsed);
        }
      });
    });

    connectCallback();
  },
};

module.exports = receiver;
