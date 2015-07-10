# Zenvia-Lambda

Função para plataforma AWS Lambda para realizar o envio de notificações SMS usando a Api da Zenvia.

**Como funciona**

Zenvia-Lambda é uma função escrita em Node.js para funcionar dentro do ambiente [AWS Lambda](http://aws.amazon.com/lambda/). Funciona como um microserviço que é acionado a partir de uma notificação rebida a partir do [AWS SNS](http://aws.amazon.com/sns/).

Esta função foi desenvolvida pela ProxyMedia e é parte integrante de nossos sistemas de marketing digital.

**Faça seus próprios testes**

Para testar a função em ambiente de desenvolvimento local, utilize [node-lambda](https://github.com/rebelmail/node-lambda). Para mais informações sobre a integração entre AWS Lambda e AWS SNS, visite [Invoking Lambda functions using Amazon SNS notifications](http://docs.aws.amazon.com/sns/latest/dg/sns-lambda.html) _(em inglês)_.
