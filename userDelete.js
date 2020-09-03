"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseFunctions = require("firebase-functions");
const admin = require("firebase-admin");
const functions = firebaseFunctions.region('asia-northeast1');
/**
 * ユーザーを削除するFunction
 */
module.exports = functions.https.onCall(async (data, context) => {
    if (context.auth) {
        await admin
            .auth()
            .deleteUser(context.auth.uid)
            .then(result => {
            return {
                context: context.auth,
                data: data,
                result: result
            };
        })
            .catch(e => {
            console.log(e);
        });
    }
});
