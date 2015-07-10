exports.handler = function(event, context) {

  var request = require('request');

  /** Verifica se é um objeto SNS válido */
  if (!event.hasOwnProperty('Records')) {
    context.fail("invalid sns event");
  } else if (event.Records.length>1) {
    context.fail("only one record is supported, we received "+event.Records.length);
  }

  /** Transforma a mensagem json vinda do SNS em um objeto */
  if (!event = JSON.parse(event.Records[0].Sns.Message)) {
    context.fail("error while parsing json message");
  }

  /** Faz a validação dos campos obrigatórios user, from, to e msg */
  if (!event.hasOwnProperty('user') || !event.hasOwnProperty('password')) {
    context.fail("username or password invalid");
  } else if (!event.hasOwnProperty('from')) {
    context.fail("from not informed");
  } else if (!event.hasOwnProperty('to')) {
    context.fail("to not informed");
  } else if (!event.hasOwnProperty('msg')) {
    context.fail("msg not informed");
  }

  /** Criptografa em base64 usuario:senha para autenticação HTTP básica da API Zenvia */
  var auth = new Buffer(event.user + ":" + event.password).toString('base64');

  /** Faz a requisição para a API da Zenvia */
  request(
      {
        method: 'POST',
        uri: 'https://api-rest.zenvia360.com.br/services/send-sms/',

        headers: {
          'Authorization': 'Basic '+ auth,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },

        body: JSON.stringify({
            'sendSmsRequest': {
              'from': event.from,
              'to': event.to,
              'msg': event.msg
            }
        })
      },

      function (error, response, body) {
          if (!error && response.statusCode == 200) {
              resposta = JSON.parse(body);
              /** Verifica se a resposta está no formato esperado da API */
              if (resposta.hasOwnProperty("sendSmsResponse")) {
                /** statusCode=0 significa mensagem enviada com sucesso */
                if (resposta.sendSmsResponse.statusCode=="00") {
                    context.succeed();
                } else {
                  console.log("response", body);
                  context.fail(resposta.sendSmsResponse.detailDescription);
                }
              } else {
                /** Se a resposta não veio como deveria */
                console.log("response", body);
                context.fail("zenvia error");
              }
          } else {
            /** Se ocorrer algum erro na chamada */
            context.fail({statusCode: response.statusCode, body: body });
          }
      }
  );

};
