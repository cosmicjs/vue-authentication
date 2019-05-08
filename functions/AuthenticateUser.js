const password = require('password-hash-and-salt');

exports.handler = function(event, context, callback) {
  if (event.httpMethod != 'POST') {
    var error = new Error("Method not allowed")
    callback(error, {
      statusCode: 405,
      body: "Method not allowed"
    })
  } else {
    // if POST Method..
    const bodyJSON = JSON.parse(event.body)
    //var myuser = {}
    // Creating hash and salt
    password(bodyJSON.pass).hash(function(error, hash) {
      if (error) {
        throw new Error('Something went wrong!')
      }

      // Store hash (incl. algorithm, iterations, and salt)
      //myuser.hash = hash;
      //console.log(myuser)

      //Search for user by email..
        //Return saved hash..
        var dbhash = 'pbkdf2$10000$78e9ee25373aa1ec58be855b9cd45300c4f9be902e8068c86281fb38a27bc3cc99e6fdcf0620a8434778e68d054cb7f389296878d733be9191d6f64ff726d169$0c5c9c93215114b9d52dde3d434c9e41a004129b7760bb0c9f42331989962067f60fa7a9e0c723a46c4bad6ef66714cea6f7d9d66860f31da6201e35d72bd5df'

      // Verifying a hash ON LOGIN
      password(bodyJSON.pass).verifyAgainst(dbhash, function(error, verified) {
        if(error)
        throw new Error('Something went wrong!');
        if(!verified) {
          callback(null, {
            statusCode: 403,
            body: "WRONG PASSWORD!"
          });
          console.log("Incorrect!");
        } else {
          //auth success
          // return user object
          console.log("The secret is...");
          callback(null, {
            statusCode: 200,
            body: "The secret is.."
          });
        }
      });
    })

    // callback(null, {
    //   statusCode: 200,
    //   body: "Hello, World"
    // });
  }
}
