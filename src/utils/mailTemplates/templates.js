const templates = {
  notification: (params) => {
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
      html: `<b>Olá<b>, 
        <br> Foi detectado um comportamento atípico ${message} de seu gerador localizado em ${latitude}, ${longitude}.
        <br> Avaliou-se, em ${evaluatedAt}, um estado de saúde ${healthStatus}`,
    }
  }
}

module.exports = templates;