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
    if (UserList.total > 0) {
      const User = {...UserList.objects[0]}
      const meta = User.metadata
  if (meta.email_verified == true) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({success: true})
    });
  } else {
    const updatedMeta = [
      {
        "key": "full_name",
        "type": "text",
        "value": meta.full_name,
        "title": "full_name",
        "has_length_edit": true,
        "parent": false,
        "children": false
      },
      {
        "key": "email",
        "type": "text",
        "value": meta.email,
        "title": "email",
        "has_length_edit": true,
        "parent": false,
        "children": false
      },
      {
        "key": "password",
        "type": "text",
        "value": meta.password,
        "title": "password",
        "has_length_edit": true,
        "parent": false,
        "children": false
      },
      {
        "key": "token",
        "type": "text",
        "value": meta.token,
        "title": "token",
        "has_length_edit": true,
        "parent": false,
        "children": false
      },
      {
        "key": "email_verified",
        "type": "radio-buttons",
        "value": "true",
        "options": [
          {
            "value": "true",
            "checked": 1
          },
          {
            "value": "false",
            "checked": 0
          }
        ],
        "title": "email_verified",
        "has_length_edit": false,
        "parent": false,
        "object": true,
        "radio-buttons": true,
        "options_string": [{"value":"true"},{"value":"false"}],
        "children": false
      }
    ]
    // console.log(updatedMeta)
    database.editObject({
      slug: User.slug,
      metafields: updatedMeta
    }).then(updatedUser => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({success: true})
      });
    }).catch(err => {
      console.log(err)
    })
  }
      // edit object using slug from search
      // callback(null, {
      //   statusCode: 200,
      //   body: JSON.stringify(User)
      // })

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
