const _MAINTENANCE_TITLES = {
  first: 'primeira manutenção',
  battery: 'manutenção de bateria',
  eolic: 'manutenção do aerogerador',
  solar: 'manutenção do painel solar',
  structure: 'manutenção dos componentes estruturais'
}

const templates = {
  behaviourNotification: (params) => {
    const { 
      latitude,
      longitude,
      healthStatus,
      evaluatedAt,
      message 
    } = params;
  
    return {
      subject: 'Notificação de Funcionamento',
      text: `Olá, houve um problema com seu gerador localizado em ${latitude}, ${longitude} avaliado em ${evaluatedAt}`,
      html: `<b>Olá</b>, 
        <br> Foi detectado um comportamento atípico ${message} de seu gerador localizado em ${latitude}, ${longitude}.
        <br> Avaliou-se, em ${evaluatedAt}, um estado de saúde ${healthStatus}
        <br> Atenciosamente, equipe Windris.
        `,
    }
  },
  dateNotification: (params) => {
    const {
      latitude,
      longitude,
      date,
      reason,
      elapsedTime
    } = params

    const message = _MAINTENANCE_TITLES[reason]
    return {
      subject: `Notificação de ${message}`,
      text: `Olá, identificamos em nosso sistema que está na data de ${message} de seu gerador localizado em ${latitude}, ${longitude}.`,
      html: `<b>Olá!</b>,
      <br> Identificamos em nosso sistema que na data ${date} é recomendada a manutenção ${message} de seu gerador localizado em ${latitude}, ${longitude}.
      <br> Conforme indica o manual, esta manutenção deve ocorrer a cada ${elapsedTime} dias.
      <br> Por favor, atente-se as instruções localizadas no manual e utilize equipamentos de segurança.
      <br> Atenciosamente, equipe Windris.
      `
    }
  }
}

module.exports = templates;