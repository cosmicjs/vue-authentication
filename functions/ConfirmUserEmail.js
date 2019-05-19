const Cosmic = require('cosmicjs')();

exports.handler = function(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: 'Email confirmed!'
  });
}
