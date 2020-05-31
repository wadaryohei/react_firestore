const functions = require('firebase-functions')

exports.helloWorld = functions.https.onCall((data, context) => {
  console.log('hoge')
  return {
    context: context.auth, // { context: context }ではInternalを返すので注意
    hello: `hello ${data.hello} cloud functions.`
  }
})
