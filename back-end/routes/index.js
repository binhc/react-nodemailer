var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
require('dotenv').config();


router.post('/send', (req, res, next) => {

  var name = req.body.name
  var email = req.body.email
  var message = req.body.message
  var content = `name: ${name} \n email: ${email} \n message: ${message} `

  const transporter = nodemailer.createTransport({
    direct:true,
      host: 'smtp.yandex.com',
      port: 465,
      auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS 
        
        },
      secure: true
  })


transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
})


const mailOptions = {
    
    from: `"React Mailer" <${name}>`,
    to: `${process.env.SMTP_USER}`,
    subject: `Contact Form`,
    html: `
    <p>${content}</p>
    `
}

transporter.sendMail(mailOptions);


})

module.exports = router;
