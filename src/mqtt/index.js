const receiver = require('./receiver');
const helper = require('./helpers');
const climateData = require('../models/climateData');

const mqttListener = {
  listen: () => {
    receiver.connect(() => {
      receiver.subscribe('climate', (message) => {
        helper.saveMessage(message, (message) => {
          try {
            climateData.create(message);
          } catch (e) {
            console.log(e)
          }
        })
      });
    });
  }
}

module.exports = mqttListener;