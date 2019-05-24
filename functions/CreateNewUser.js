const password = require('password-hash-and-salt');
const crypto = require('crypto');
const nodemailer = require("nodemailer");
import database from '../src/cosmic'

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
                "value": false,
                "options": [{"value": true}, {"value": false}]
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
                text: `Please Verify your email using this URL: https://v-cosmic-auth.netlify.com/activate-account?token=${data.object.metadata.token}`,
                html: `<p>Please Verify your email using this link: <a href="https://v-cosmic-auth.netlify.com/activate-account?token=${data.object.metadata.token}">Click Here</a></p>`
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
