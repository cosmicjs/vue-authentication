const password = require('password-hash-and-salt');
const Cosmic = require('cosmicjs')();
const database = Cosmic.bucket({
  slug: 'cosmic-vueauth',
  write_key: 'tJ4YxwhYgatffh4WAVEJiDZ9T7pRJPpMVOekTUuKROS2crlDRI',
  read_key: 'xDF5EHQ5KgcWdsEc5PxCTLicSuSX839HJejXsg1jJ57ZF1ixVy'
})

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
    console.log(bodyJSON)
    //Search for user by email..
    database.getObjects({
      metafield_key: 'email',
      metafield_value: bodyJSON.email
    }).then(UserList => {
      if (UserList.total == 1) {
        const User = {...UserList.objects[0]}
          console.log(User.metadata)
        // continue with checking pass
          password(bodyJSON.password).hash(function(error, hash) {
            if (error) {
              throw new Error('Something went wrong!')
            }
            //Return saved hash..
            //var dbhash = 'pbkdf2$10000$78e9ee25373aa1ec58be855b9cd45300c4f9be902e8068c86281fb38a27bc3cc99e6fdcf0620a8434778e68d054cb7f389296878d733be9191d6f64ff726d169$0c5c9c93215114b9d52dde3d434c9e41a004129b7760bb0c9f42331989962067f60fa7a9e0c723a46c4bad6ef66714cea6f7d9d66860f31da6201e35d72bd5df'
            // Verifying a hash ON LOGIN
            password(bodyJSON.password).verifyAgainst(User.metadata.password, function(error, verified) {
              if(error)
              throw new Error('Something went wrong!');
              if(!verified) {
                callback(null, {
                  statusCode: 401,
                  body: "WRONG PASSWORD!"
                });
                console.log("Incorrect!");
              } else {
                //auth success return user object
                console.log("AUTH SUCCESS");
                callback(null, {
                  statusCode: 200,
                  body: JSON.stringify(User)
                });
              }
            });
          })
          // success
      } else {
        // USER DOESNOT EXIST
        callback(null, {
         statusCode: 204,
         body: "No account exists with this email"
       });
      } // end if user exists conditional
    }).catch(err => {
        console.log(err)
    })
  }
}
