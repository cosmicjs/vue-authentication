const password = require('password-hash-and-salt');
const crypto = require('crypto');
const nodemailer = require("nodemailer");
const Cosmic = require('cosmicjs')();
const database = Cosmic.bucket({
  slug: 'cosmic-vueauth',
  write_key: 'tJ4YxwhYgatffh4WAVEJiDZ9T7pRJPpMVOekTUuKROS2crlDRI',
  read_key: 'xDF5EHQ5KgcWdsEc5PxCTLicSuSX839HJejXsg1jJ57ZF1ixVy'
})

// USER SCHEMA
//{"title":"john@doe.com","content":"",
//"metafields":[
// {"required":true,"value":"john doe","key":"full_name","title":"Full Name","type":"text","children":false,"has_length_edit":true,"parent":false},
// {"required":true,"value":"john@doe.com","key":"email","title":"Email","type":"text","children":false,"has_length_edit":true,"parent":false},
// {"required":true,"value":"pbkdf2$10000$78e9ee25373aa1ec58be855b9cd45300c4f9be902e8068c86281fb38a27bc3cc99e6fdcf0620a8434778e68d054cb7f389296878d733be9191d6f64ff726d169$0c5c9c93215114b9d52dde3d434c9e41a004129b7760bb0c9f42331989962067f60fa7a9e0c723a46c4bad6ef66714cea6f7d9d66860f31da6201e35d72bd5df","key":"password","title":"Password","type":"text","children":false,"has_length_edit":true,"parent":false},
// {"required":true,"value":"78e9ee25373aa1ec58be855b9cd45300c4f9be902e8068c86281fb38a27bc3cc99e6fdcf0620a8434778e68d054cb7f389296878d733be9191d6f64ff726d169","key":"token","title":"Token","type":"text","children":false,"has_length_edit":true,"parent":false},
// {"value":"","key":"reset_token","title":"Reset Token","type":"text","children":false,"has_length_edit":true,"parent":false}],"status":"published","created_by":"5a86424c597e406715286ea5"}

exports.handler = function(event, context, callback) {
  if (event.httpMethod !== 'POST') {
    let error = new Error("Method not allowed")
    callback(error, {
      statusCode: 405,
      body: "Method not allowed"
    })
  } else {
    // if POST Method..
    const bodyJSON = JSON.parse(event.body);
    //Search for existing user
    database.getObjects({
      metafield_key: 'email',
      metafield_value: bodyJSON.email
    }).then(data => {
      if (data.total == 0) { //user doesn't exist then continue
        const newUser = {
          fullname: bodyJSON.fullname,
          email: bodyJSON.email,
          password: bodyJSON.password,
          hash: '',
          token: '',
          email_verified: false
        }

        password(newUser.password).hash(function(error, hash) {
          if(error)
          throw new Error('Something went wrong!');

          // Store hash (incl. algorithm, iterations, and salt)
          newUser.hash = hash;
          newUser.token = crypto.randomBytes(32).toString('hex');

          const userRecord = {
            title: newUser.email,
            type_slug: 'users',
            metafields: [
              {
                key: 'full_name',
                type: 'text',
                value: newUser.fullname
              },
              {
                key: 'email',
                type: 'text',
                value: newUser.email
              },
              {
                key: 'password',
                type: 'text',
                value: newUser.hash
              },
              {
                key: 'token',
                type: 'text',
                value: newUser.token
              },
              {
                key: 'email_verified',
                type: 'radio-buttons',
                "value": "false",
                "options": [{"value": "true"}, {"value": "false"}]
              }
            ]
          }

          // Upload USER to Cosmic JS
          database.addObject(userRecord).then(data => {
            // console.log(data)
            // SEMD VERIFY EMAIL LINK
            let message = {
                from: 'sender@server.com',
                to: data.object.metadata.email,
                subject: 'Verify Your Email',
                text: `Please Verify your email using this URL: ${data.object.metadata.token}`,
                html: `<p>Please Verify your email using this URL: ${data.object.metadata.token}</p>`
            };

            let transporter = nodemailer.createTransport({
               service: 'SendinBlue', // no need to set host or port etc.
               auth: {
                   user: 'aaronvail14@gmail.com',
                   pass: 'A0EDmTa1f3BhOSVr'
               }
            });
            transporter.sendMail(message).then(res => {
              console.log(res)
              callback(null, {
                statusCode: 200,
                body: JSON.stringify(data.object)
              });
            })
            .catch(err => {
              console.log(err)
              throw new Error('Something went wrong when sending confirm email!');
            }) //nodemailer confirm email
          })
          .catch(err => {
            console.log(err)
            throw new Error('Something went wrong when saving to DB!');
          })

          // Verifying a hash ON LOGIN
          // password(newUser.password).verifyAgainst(newUser.hash, function(error, verifiedHash) {
          //   if(error)
          //   throw new Error('Something went wrong!');
          //   if(!verifiedHash) {
          //     callback(null, {
          //       statusCode: 403,
          //       body: "FAILED PASSWORD VALIDATION"
          //     });
          //     console.log("Don't try! We got you!");
          //   } else {
          //     //Save New USER Email, Hash, and Token to DB
          //     //Add Verification Token
          //     var token = crypto.randomBytes(32).toString('hex');
          //     console.log(`Email Verify token: ${token}`)
          //     callback(null, {
          //       statusCode: 200,
          //       body: "Hello New User!"
          //     });
          //     console.log("The secret is...");
          //   }
          // });
        }) //end password function

      } else { //User already exists
        callback(null, {
          statusCode: 200,
          body: "You already have an account!"
        });
      }
    }).catch(err => {
      console.log(err)
    }) //user search promise error
  }
}
