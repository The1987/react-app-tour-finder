const nodemailer = 'nodemailer';
const creds = require('./config');
const express = require('express');
const router = express.router();

// SMTP transporter 

let transport = {
    host: 'smtp.gmail.com',
    auth: {
        user: cred.USER,
        pass: cred.PASS
    }
}
const transporter = nodemailer.createTransport(transport)

transporter.verify((err,success) => {
    if(error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});

// Post route to send data

router.post('/send', (req, res, next) => {
	var name = req.body.name
	var email = req.body.email
	var message = req.body.message
	var content = `name: ${name} \n email: ${email} \n message: ${content} `
  
	var mail = {
	  from: name,
	  to: 'andrewmflak@gmail.com',  //Change to email address that you want to receive messages on
	  subject: 'Thank you for your purchase~TEST!!!!',
	  text: content
	}
  
	transporter.sendMail(mail, (err, data) => {
	  if (err) {
		res.json({
		  msg: 'fail'
		})
	  } else {
		res.json({
		  msg: 'success'
		})
	  }
	})
  });


