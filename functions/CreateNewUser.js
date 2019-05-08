const password = require('password-hash-and-salt');
const crypto = require('crypto');

exports.handler = function(event, context, callback) {
  if (event.httpMethod !== 'POST') {
    var error = new Error("Method not allowed")
    callback(error, {
      statusCode: 405,
      body: "Method not allowed"
    })
  } else {
    // if POST Method..
    const bodyJSON = JSON.parse(event.body)
    var myuser = {};

    // Creating hash and salt
    password(bodyJSON.pass).hash(function(error, hash) {
      if(error)
      throw new Error('Something went wrong!');

      // Store hash (incl. algorithm, iterations, and salt)
      myuser.hash = hash;

      // Verifying a hash ON LOGIN
      password(bodyJSON.pass).verifyAgainst(myuser.hash, function(error, verified) {
        if(error)
        throw new Error('Something went wrong!');
        if(!verified) {
          callback(null, {
            statusCode: 403,
            body: "FAILED PASSWORD VALIDATION"
          });
          console.log("Don't try! We got you!");
        } else {
          //Save New USER Email, Hash, and Token to DB
          //Add Verification Token
          var token = crypto.randomBytes(32).toString('hex');
          console.log(`Email Verify token: ${token}`)
          callback(null, {
            statusCode: 200,
            body: "Hello New User!"
          });
          console.log("The secret is...");
        }
      });
    })
    // end password
  }
}
