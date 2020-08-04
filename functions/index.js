const admin = require('firebase-admin')
admin.initializeApp()

/**
 * @see https://tech.ginco.io/post/ginco-engineer-meetup-2018-cloud-functions/
 * firebase特有のコールドスタート対策
 */
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'userDelete') {
  exports.userDelete = require('./func/userDelete')
}

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'userDatasDelete') {
  exports.userDatasDelete = require('./func/userDatasDelete')
}

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'followCount') {
  exports.followCount = require('./func/followCount')
}

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'unFollowCount') {
  exports.unFollowCount = require('./func/unFollowCount')
}
