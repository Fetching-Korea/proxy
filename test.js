const handler = require('./dist/app')

handler.lambdaHandler({queryStringParameters: {url:'https://www.google.com'}}).then((e) => {
  console.log(e)
})
