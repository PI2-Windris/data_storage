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
      client.publish('climate', '{"generatorId": "5eef621c-9d0e-4235-94df-47393c84d294", "temperature": "10", "umidity": "20", "windVelocity": "10", "windDirection": "west", "rain": "1", "co2": "100" }')
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
      client.publish('energy', '{"generatorId": "5eef621c-9d0e-4235-94df-47393c84d294", "type": "panel", "averageInputTension":  "200", "averageOutputTension":  "200", "averageOutputCurrent":  "200", "outputTensionSpike":  "200", "outputCurrentSpike":  "200", "averageBladeFrequency":  "200", "averageSupply":  "10", "tension":  "200"}')
    }
  })
})```
Exemplo de mensagem de Coleta de Energia do Gerador Eólico
```
client.on('connect', function () {
  client.subscribe('energy', function (err) {
    if (!err) {
      client.publish('energy', '{"generatorId": "5eef621c-9d0e-4235-94df-47393c84d294", "type": "turbine", "averageInputTension":  "200", "averageOutputTension":  "200", "averageOutputCurrent":  "200", "outputTensionSpike":  "200", "outputCurrentSpike":  "200", "averageBladeFrequency":  "200", "averageSupply":  "10", "tension":  "200"}')
    }
  })
})```