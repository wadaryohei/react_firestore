"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
admin.initializeApp();
/**
 * @see https://tech.ginco.io/post/ginco-engineer-meetup-2018-cloud-functions/
 * firebase特有のコールドスタート対策
 */
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'follow') {
    exports.follow = Promise.resolve().then(() => require('./follow'));
}
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'unFollow') {
    exports.unFollow = Promise.resolve().then(() => require('./unFollow'));
}
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'userDelete') {
    exports.userDelete = Promise.resolve().then(() => require('./userDelete'));
}
if (!process.env.FUNCTION_NAME ||
    process.env.FUNCTION_NAME === 'userDatasDelete') {
    exports.userDatasDelete = Promise.resolve().then(() => require('./userDatasDelete'));
}
