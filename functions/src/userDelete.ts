import * as firebaseFunctions from 'firebase-functions'
import * as admin from 'firebase-admin'
const functions = firebaseFunctions.region('asia-northeast1')

/**
 * ユーザーを削除するFunction
 */
export const userDelete = functions.https.onCall(async (data, context) => {
  if (context.auth) {
    await admin
      .auth()
      .deleteUser(context.auth.uid)
      .then((result) => {
        return {
          context: context.auth,
          data: data,
          result: result,
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }
})
