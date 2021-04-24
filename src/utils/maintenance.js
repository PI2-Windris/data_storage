const { mailer, mailOptions } = require('./mailer');
const axios = require('axios');

USER_SERVICE_URL = `http://${process.env.USER_HOST}:${process.env.USER_PORT}`
const _MS_PER_DAY = 1000 * 60 * 60 * 24;
/* This is calculated according to the manual. It's the amount of time required, in days.
*/
const _MAINTENANCE_DATES = {
  battery: 180,
  eolic: 1095,
  solar: 180,
  structure: 365,
  first: 90
}

const dateDiff = (date) => {
  const currentDate = new Date();
  
  return Math.floor((currentDate - date)/ _MS_PER_DAY);
}

const getUserInfo = async (userId) => {
  const userInfo = await axios.get(`${USER_SERVICE_URL}/users/${userId}`)
  return userInfo.data;
}

const maintenance = {
    checkMaintenance: (date) => {
    const daysDiff = dateDiff(date)
    let manReasons = [];

    for ( man_date in _MAINTENANCE_DATES) {
      const dateRef = _MAINTENANCE_DATES[man_date]
      if( daysDiff % dateRef === 0) manReasons.push(man_date);
    }
    return manReasons;
  },
  sendMaintenanceMail: async(generator, maintenanceReasons) => {
    const { userId } = generator;
    const userInfo = await getUserInfo(userId);

    maintenanceReasons.forEach( reason => {
      const elapsedTime = _MAINTENANCE_DATES[reason]
      mailer.sendMail(mailOptions({
        type: 'maintenance',
        userMail: userInfo.email,
        attachments: null,
        date: new Date().toLocaleDateString(['pt-BR']),
        elapsedTime,
        reason,
        ...generator.location
      }))
    })
  }
}

module.exports = maintenance;