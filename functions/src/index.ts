import * as admin from 'firebase-admin'
import { follow } from './follow'
import { unFollow } from './unFollow'
import { userDelete } from './userDelete'
import { userDatasDelete } from './userDatasDelete'
admin.initializeApp()

export { follow, unFollow, userDelete, userDatasDelete }

// /**
//  * @see https://tech.ginco.io/post/ginco-engineer-meetup-2018-cloud-functions/
//  * firebase特有のコールドスタート対策
//  */
// if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'follow') {
//   exports.follow = require('./follow')
// }

// if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'unFollow') {
//   exports.unFollow = require('./unFollow')
// }

// if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'userDelete') {
//   exports.userDelete = require('./userDelete')
// }

// if (
//   !process.env.FUNCTION_NAME ||
//   process.env.FUNCTION_NAME === 'userDatasDelete'
// ) {
//   exports.userDatasDelete = require('./userDatasDelete')
// }
