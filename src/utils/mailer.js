const nodemailer = require('nodemailer');

const mailer = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const mailOptions = (params) => {
  const { 
    latitude,
    longitude,
    healthStatus,
    evaluatedAt,
    attachments,
    userMail,
    message 
  } = params;

  return {
    from: '"Windris Team" <no-reply@windris.com>',
    to: userMail,
    subject: 'Notificação de Funcionamento',
    text: `Olá, houve um problema com seu gerador localizado em ${latitude}, ${longitude} avaliado em ${evaluatedAt}`,
    html: `<b>Olá<b>, 
      <br> Foi detectado um comportamento atípico ${message} de seu gerador localizado em ${latitude}, ${longitude}.
      <br> Avaliou-se, em ${evaluatedAt}, um estado de saúde ${healthStatus}`,
    ...attachments
  }
}

module.exports = { 
  mailer, 
  mailOptions
}