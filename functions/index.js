const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

/**
 * ユーザーを削除するFunction
 */
exports.userDelete = functions.https.onCall(async (data, context) => {
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
