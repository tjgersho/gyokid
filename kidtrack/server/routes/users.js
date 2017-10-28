const express = require('express');
const router = express.Router();
var db = require('../util/db.js');
var middleware = require('../util/middleware.js')(db);
var _ = require('underscore');
var cryptojs = require('crypto-js');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var access = require('../util/apiaccess.js');
var jwt = require('jsonwebtoken');

var cryptojs = require('crypto-js');
 
var auth = {
  auth: {
    api_key: access.mailgun,
    domain: 'kidtrack.io'
  }
}

var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var nodemailerMailgun = nodemailer.createTransport(mg(auth));
var handlebars = require('handlebars');


router.post('/users',  bodyParser.json(),  function(req, res){
///Signup Endpoint...
console.log('Sign Up Endpoint');
console.log(req.body);

 var body = _.pick(req.body, 'username', 'email', 'password', 'referralUserId', 'referralCode');


      body.role = 0;

      body.email = body.email.toLowerCase();
      body.username = body.username.toLowerCase();
	
       

        db.user.create(body).then(function(user){   
		user.setReferralToken();
		//sendEmailConfirmationEmail(user);


	  if(body.referralUserId !== null &&  body.referralUserId !== undefined){

		console.log('This is a referral signup!!!');
		console.log(body.referralUserId);
		console.log(body.referralCode);

	
		var decoded = jwt.verify(body.referralCode, 'xo123321ox');
		var bytes = cryptojs.AES.decrypt(decoded.token, '123xo321');
		var tokenData = JSON.parse(bytes.toString(cryptojs.enc.Utf8));
		
		if(tokenData.id === body.referralUserId){
			console.log('Yes the referral was good');

			db.referral.create({origUserId: tokenData.id, newUserId: user.id}).then(function(resp){
	
				       res.status(200).json(user.toPublicJSON());
		          },function(err){

				console.log('error creating referral');
				console.log(err);

	               });
		}else{

			 res.status(400).json(err);
		}

	
          }else{
              res.status(200).json(user.toPublicJSON());
	 }

      
        },function(err){
            res.status(400).json(err);
        });
});



module.exports = router;
