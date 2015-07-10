exports.handler = function(event, context) {

  event = JSON.parse(event.Records[0].Sns.Message);

  var request = require('request');

  var auth = new Buffer(event.user + ":" + event.password).toString('base64');

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
              context.succeed();
          } else {
            console.log(response);
            context.fail({error: error, response:response, body: body });
          }
      }
  );

};
