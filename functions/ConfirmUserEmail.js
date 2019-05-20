const Cosmic = require('cosmicjs')();
const database = Cosmic.bucket({
  slug: 'cosmic-vueauth',
  write_key: 'tJ4YxwhYgatffh4WAVEJiDZ9T7pRJPpMVOekTUuKROS2crlDRI',
  read_key: 'xDF5EHQ5KgcWdsEc5PxCTLicSuSX839HJejXsg1jJ57ZF1ixVy'
})

exports.handler = function(event, context, callback) {
  if (event.httpMethod !== 'POST') {
    let error = new Error("Method not allowed")
    callback(error, {
      statusCode: 405,
      body: "Method not allowed"
    })
  } else {
  //search for user by token
  // callback "email already verified" OR
  //update email_verified metadata to true
  // callback successfully verified
  const bodyJSON = JSON.parse(event.body);
  database.getObjects({
    metafield_key: 'token',
    metafield_value: bodyJSON.token
  }).then(UserList => {
    if (UserList.total == 1) {
      const User = {...UserList.objects[0]}
      console.log(User.slug)
      database.editObject({
        slug: User.slug,
        metafields: [
          {
            key: 'email_verified',
            type: 'radio-buttons',
            "value": "true",
            "options": [{"value": "true"}, {"value": "false"}]
          }
        ]
      }).then(updatedUser => {
        callback(null, {
          statusCode: 200,
          body: 'Email confirmed!'
        });
      }).catch(err => {
        console.log(err)
      })
      // edit object using slug from search
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(User)
      })

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
