import database from '../src/cosmic'

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
      metafield_key: 'token',
      metafield_value: bodyJSON.token
    }).then(UserList => {
      if (UserList.total == 1) {
        const User = {...UserList.objects[0]}
        console.log(User.metadata)
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
