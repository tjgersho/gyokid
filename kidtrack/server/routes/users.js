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
    domain: 'mail.kidtrack.io'
  }
}

console.log('Mail Gun AUth');
console.log(auth);


var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var nodemailerMailgun = nodemailer.createTransport(mg(auth));
var handlebars = require('handlebars');


function sendEmailConfirmationEmail(usr){

var emailcode = Math.floor(Math.random()*100000)+1000;
var emailConfirmationCode = Math.floor(Math.random()*100000)+1000;

usr.update({emailConfirmCode: emailConfirmationCode}).then(function(userup){
   db.email.create({code: emailcode}).then(function(email){

		email.setUser(userup);

      var emailctx =  {name: userup.username,
		        viewinbrowserlink: 'http://ec2-13-56-171-193.us-west-1.compute.amazonaws.com/viewEmail/'+emailcode+'/id/'+email.id,
		        verifyemaillink: 'http://ec2-13-56-171-193.us-west-1.compute.amazonaws.com/emailconfirm/'+usr.username+'/code/'+emailConfirmationCode,
			domain: 'http://ec2-13-56-171-193.us-west-1.compute.amazonaws.com',
			content: 'Test Content',
			subject: 'Test Subject'
			};


  var top = fs.readFileSync('./server/emailviews/emailhead.hbs').toString();
  var body = fs.readFileSync('./server/emailviews/confirmemail.hbs').toString();
  var footer = fs.readFileSync('./server/emailviews/emailfooter.hbs').toString();



  var template = handlebars.compile(top + body + footer);
  var html = template(emailctx);
  var toEmail = userup.email;
  var emailSubject = 'KidTrack - Email Confirmation';
console.log('EMAIL');

console.log(top + body + footer);


email.update({email: html});


nodemailerMailgun.sendMail({
  from: 'kidtrack@kidtrack.io',
  to: toEmail, // An array if you have multiple recipients. 
  //cc:'',
 // bcc:'',
  subject: emailSubject,
  'h:Reply-To': 'kidtrack@kidtrack.io', 
   html: html,
  // text: text,
   attachments: [
        {
            cid: 'kidtracklogo.png',
            content:  fs.readFileSync('./dist/assets/kidtracklogo.png')
        },
         {
            cid: 'kidtrackicon.png',
            content:  fs.readFileSync('./dist/assets/kidtrackicon.png')
        },
         {
            cid: 'instagram.png',
            content:  fs.readFileSync('./dist/assets/instagram.png')
        },
         {
            cid: 'fb.png',
            content:  fs.readFileSync('./dist/assets/fb.png')
        },
         {
            cid: 'twitter.png',
            content:  fs.readFileSync('./dist/assets/twitter.png')
        }
	]

}, function (err, info) {
  if (err) {
    console.log('Error: ' + err);
  }
  else {
    console.log('Response: ' + info);
  }
});


	},function(err){
		console.log('Err saving the email html file');
		console.log(err);

	});
     },function(err){
	console.log('Err updating the user confirmation code');
	console.log(err);

  });

}


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
		sendEmailConfirmationEmail(user);


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




router.put('/users',  [bodyParser.json(), middleware.requireAuthentication],  function(req, res){
  var user = req.user;


var body = _.pick(req.body, 'bodyColorR', 'bodyColorG', 'bodyColorB', 'bodyColorA',
		 'borderColorR',  'borderColorG', 'borderColorB', 'borderColorA', 'skinId', 'useSkin', 'sendmail', 'shippingAddress' );
///Some Validation on the post.

  var attributes = {};

 
  if (body.hasOwnProperty('sendmail')) {
    attributes.sendmail = body.sendmail;
  }

   if(body.hasOwnProperty('shippingAddress')){
      attributes.shippingAddress = body.shippingAddress;

    }

  db.user.findById(user.id).then(function(usr) {
    if (!!usr) {
      usr.update(attributes).then(function(usr) {
        res.json(usr.toJSON());
      }, function(e) {
        res.status(400).json(e);
      });
    } else {
      res.status(404).send();
    }
  }, function() {
    res.status(500).send();
  });



});



module.exports = router;
