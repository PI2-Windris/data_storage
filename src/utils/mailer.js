const nodemailer = require("nodemailer");
const templates = require("./mailTemplates/templates");

const mailer = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const mailOptions = (params) => {
  const { type, userMail, attachments } = params;

  const template = {
    notification: templates.behaviourNotification(params),
    maintenance: templates.dateNotification(params),
  }[type];

  return {
    from: '"Windris Team" <no-reply@windris.com>',
    to: userMail,
    ...template,
    ...attachments,
  };
};

module.exports = {
  mailer,
  mailOptions,
};
