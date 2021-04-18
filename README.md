# Data_Storage

Este repositório é reponsável pelo "Serviço de Dispositivo" mapeado na nossa arquitetura.

Ele expõe rotas de uma API REST para associação entre geradores e usuários, além de possuir um Listener MQTT que realiza subscribe no Gateway de eletrônica para receptar dados nos tópicos de energia e clima.

A descrição de como subir todos os serviços está presente no Software_Gateway.

Exemplo de script para envio de mensagens MQTT em Node:

```
var mqtt = require('mqtt')
// As variáveis de opção devem ser as mesmas definidas no docker-compose
// Caso o script seja executado fora de um container docker o host deve ser localhost
// Caso seja executado em um container docker deve-se utilizar o nome do container

var options = {
	port: 8883,
	host: 'localhost',
	rejectUnauthorized: false,
	protocol: 'mqtts'
}

var client  = mqtt.connect(options)

client.on('connect', function () {
  client.subscribe('climate', function (err) {
    if (!err) {
      client.publish('climate', '{"generatorId": "e21e048f-45f6-4a0e-88fc-ba4dcd0e1f9c", "umidity": "400000.0", "tempearture": "30.0", "wind": "4.3"}')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})
```
Exemplo de mensagem de Coleta de Energia do Painel Solar:
```
client.on('connect', function () {
  client.subscribe('energy', function (err) {
    if (!err) {
      client.publish('energy', '{"generatorId": "4733dcb3-35d9-4d3d-ab0b-4532abcd3da", "type": "panel", "potencyFactor":  "50", "averageInputTension":  "200", "averageOutputTension":  "200", "averageOutputCurrent":  "200", "outputTensionSpike":  "200", "outputCurrentSpike":  "200", "averageBladeFrequency":  "200", "averageSupply":  "200", "tension":  "200"}')
    }
  })
})
```
Exemplo de mensagem de Coleta de Energia do Gerador Eólico
```
client.on('connect', function () {
  client.subscribe('energy', function (err) {
    if (!err) {
      client.publish('energy', '{"generatorId": "4733dcb3-35d9-4d3d-ab0b-4532abcd3da", "type": "turbine", "potencyFactor":  "50", "averageInputTension":  "200", "averageOutputTension":  "200", "averageOutputCurrent":  "200", "outputTensionSpike":  "200", "outputCurrentSpike":  "200", "averageBladeFrequency":  "200", "averageSupply":  "200", "tension":  "200"}')
    }
  })
})
```