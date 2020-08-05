const functions = require('firebase-functions').region('asia-northeast1')
const admin = require('firebase-admin')

/**
 * ユーザーを削除するFunction
 */
module.exports = functions.https.onCall(async (data, context) => {
  await admin
    .auth()
    .deleteUser(context.auth.uid)
    .then(result => {
      return {
        context: context.auth,
        data: data,
        result: result
      }
    })
    .catch(e => {
      console.log(e)
    })
})