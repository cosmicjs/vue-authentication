# Vue Authentication
![Image](https://cosmic-s3.imgix.net/07bad470-82ef-11e9-a2b6-fd5a5aa69111-logo.jpg)

----
## Features

- Netlify hosting (plus CDN, Prerendering, Minification, etc..)
- Vuetify components for interface
- AWS Lambda functions via Netlify
- Cosmic JS for Database API
- Password hashing using PBKDF2 with Salt
- Email Verification using Nodemailer via SendinBlue

## Needed Improvements

- Password reset function
- User avatar support

----
## Prerequisites
> You will be required to have Node JS and npm before starting. Make sure you already have them installed. If not you can find them here: https://nodejs.org

>In order to deploy you will need a Netlify account.
Also for SMTP server to send email verification link I am using SendInBlue since they give you 300 free emails a day.

----
## Usage
1. Write markdown text in this textarea.
2. Click 'HTML Preview' button.

#### Clone and install
`git clone https://github.com/cosmicjs/vue-authentication`

```
cd vue-authentication && npm install
```

#### Integrate DB and SMTP services
- Add Cosmic JS Bucket Slug, Read key, and Write key to `~/cosmic.js`
- Add SendInBlue SMTP API Key to `~/functions/CreateNewUser.js`

#### Running Locally
To start AWS Lambda server run:
`npm run start:lambda`

Running the app localhost run:
`npm run serve`

#### Building for production:
`npm run build`

----
## Thanks
* [Cosmic JS](https://github.com/evilstreak/markdown-js)
* [SendInBlue](https://www.sendinblue.com/)
* [Vuetify](https://vuetifyjs.com/en/)
* [Netlify Functions](https://www.netlify.com/docs/functions/)
