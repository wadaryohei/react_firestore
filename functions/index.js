const admin = require('firebase-admin')
admin.initializeApp()

/**
 * @see https://tech.ginco.io/post/ginco-engineer-meetup-2018-cloud-functions/
 * firebase特有のコールドスタート対策
 */
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'follow') {
  exports.follow = require('./func/follow')
}

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'unFollow') {
  exports.unFollow = require('./func/unFollow')
}

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'userDelete') {
  exports.userDelete = require('./func/userDelete')
}

if (
  !process.env.FUNCTION_NAME ||
  process.env.FUNCTION_NAME === 'userDatasDelete'
) {
  exports.userDatasDelete = require('./func/userDatasDelete')
}
