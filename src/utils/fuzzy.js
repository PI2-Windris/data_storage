const axios = require('axios');
const logger = require('./logger');
const { mailer, mailOptions } = require('./mailer');

PROCESSING_URL = `http://${process.env.PROCESSING_HOST}:${process.env.PROCESSING_PORT}`
USER_SERVICE_URL = `http://${process.env.USER_HOST}:${process.env.USER_PORT}`

const fuzzy = {
  eolicHealth: async (measurements) => {
    try {
      const { wind, potency } = measurements;

      const health = await axios.post(`${PROCESSING_URL}/fuzzy/eolic`, { wind, potency})

      fuzzy.notify({ health, measurements, message: "na turbina eólica"})
      logger.info(health.data)
      return health.data;
    } catch (e) {
      logger.error(e);
    }
  },
  solarHealth: async (measurements) => {
    try {
      const { temperature, potency } = measurements;

      const health = await axios.post(`${PROCESSING_URL}/fuzzy/solar`, { temperature, potency})

      fuzzy.notify({ health, measurements, message: "no painel solar"})
      logger.info(health.data)
      return;
    } catch (e) {
      logger.error(e);
    }
  },
  notify: async (data) =>  {
    try {
      const { measurements, health, message } = data;
      const { userId } = measurements;

      if(health.data.health_status == "Não Saudável" && process.env.MAIL_ENABLED == "true") {
        const userInfo = await axios.get(`${USER_SERVICE_URL}/users/${userId}`)
        const mail = await mailer.sendMail(mailOptions({
          evaluatedAt: health.data.evaluated_at,
          healthStatus: health.data.health_status,
          userMail: userInfo.data.email,
          attachments: null,
          message: message,
          ...measurements,
        }))
        logger.info(mail)
      }  
    } catch(e) {
      logger.error(e)
    }
  } 
}

module.exports = fuzzy