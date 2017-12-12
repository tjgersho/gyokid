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
		        viewinbrowserlink: 'https://kidtrack.io/viewemail/'+emailcode+'/id/'+email.id,
		        verifyemaillink: 'https://kidtrack.io/emailconfirm/'+usr.username+'/code/'+emailConfirmationCode,
			domain: 'https://kidtrack.io',
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


router.post('/user',  bodyParser.json(),  function(req, res){
///Signup Endpoint...
console.log('Sign Up Endpoint');
console.log(req.body);

 var body = _.pick(req.body, 'username', 'email', 'password', 'referralCode');



      body.role = 0;

      body.email = body.email.toLowerCase();
      body.username = body.username.toLowerCase();
	
       

        db.user.create(body).then(function(user){ 
  
		user.setReferralToken();
		sendEmailConfirmationEmail(user);


	  if(body.referralCode !== ''){
		console.log("SIGNUP >>> REFERRAL CODE .. " + body.referralCode);

		console.log('This is a referral signup!!!');
		
		console.log(body.referralCode);

	
		var decoded = jwt.verify(body.referralCode, 'xo123321ox');
		var bytes = cryptojs.AES.decrypt(decoded.token, '123xo321');
		var tokenData = JSON.parse(bytes.toString(cryptojs.enc.Utf8));
		
	
			console.log('Yes the referral was good');

			db.referral.create({origUserId: tokenData.id, newUserId: user.id, userId: tokenData.id}).then(function(ref){

				  
	
				       res.status(200).json(user.toPublicJSON());

		          },function(err){

				console.log('error creating referral');
				console.log(err);
			        res.status(200).json(err);

	               });
		

	
          }else{

              res.status(200).json(user.toPublicJSON());

	 }

      
        },function(err){
            res.status(400).json(err);
        });
});




router.put('/user',  [bodyParser.json(), middleware.requireAuthentication],  function(req, res){
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


router.get('/user/devices/',  [bodyParser.json(), middleware.requireAuthentication],  function(req, res){
  var user = req.user;
	console.log('User in get user devices');
		
  db.device.findAll({where: {userId: user.id}}).then(function(devices){

		console.log('response from find all devices by user id');
		console.log(devices);
 		res.json(devices);
	},function(err){
		console.log('Find devices error');
		console.log(err);
		 res.status(400).json(err);

    });

});






function sendResetPasswordEmail(usr){


var emailcode = Math.floor(Math.random()*100000)+1000;

db.email.create({code: emailcode}).then(function(email){

	 email.setUser(usr);

  var emailctx =  {name: usr.username,
		   viewinbrowserlink: 'https://kidtrack.io/viewemail/'+emailcode+'/id/'+email.id,
		   updatepasswordlink: 'https://kidtrack.io/changepw/'+usr.username+'/code/'+usr.password,
	           domain: 'https://kidtrack.io',
	           content: 'Reset Password',
		   subject:  'KidTrack - Reset Password'
		 };


  var top = fs.readFileSync('./server/emailviews/emailhead.hbs').toString();
  var body = fs.readFileSync('./server/emailviews/resetPWEmail.hbs').toString();
  var footer = fs.readFileSync('./server/emailviews/emailfooter.hbs').toString();



  var template = handlebars.compile(top + body + footer);
  var html = template(emailctx);
  var toEmail = usr.email;
  var emailSubject = 'KidTrack - Reset Password';
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
     


}




router.post('/forgotPW',  bodyParser.json(),  function(req, res){
///Signup Endpoint...
console.log('Forgot PW');
console.log(req.body);

 var body = _.pick(req.body, 'usernameoremail');

   body.usernameoremail = body.usernameoremail.toLowerCase();


   var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var where_obj = {};

    if(re.test(body.usernameoremail)){
  	  where_obj.where = {email: body.usernameoremail};
  	 }else{
    	  where_obj.where = {username: body.usernameoremail};
     }



    

        db.user.find(where_obj).then(function(user){ 

		console.log('User');
		console.log(user);

		if(!!user){

                   var tmp_pswd  = Math.floor((Math.random() * 100000) + 10000).toString(); 

                   user.update({password: tmp_pswd}).then(function(user){

			sendResetPasswordEmail(user);
			 res.status(200).json(user);

			},function(err){

           		 res.status(400).json(err);

       		      });

		}else{

		 	res.status(400).json('UserNotFound');
		}  
		      
        },function(err){
            res.status(400).json(err);
        });
});




router.put('/user/pwreset/',  [bodyParser.json(), middleware.requireAuthentication],  function(req, res){
  console.log('Update PW');
  
        var body = _.pick(req.body, 'password');
        console.log('new password');
	console.log(body);
  
     var user = req.user;
	user.update(body).then(function(user){
		console.log('The user password has been updated');
		console.log(user);
		 res.status(200).json(user);

	},function(err){
		console.log('User password update err');
		console.log(err);
 		 res.status(400).json(err);

	});

		
  

});

router.post('/confirmEmail',  [bodyParser.json()],  function(req, res){
  console.log('Confirm email!');
console.log('In Confirm Email Endpoint....');
 
var body = _.pick(req.body, 'username', 'validcode');

console.log(body);
var where = {username: body.username,
		emailConfirmCode: body.validcode};

console.log(where);

db.user.find({where: where }).then(function(usr){
     console.log('Find user for confirmEmail...');
	console.log(usr);
 
	 usr.update({emailConfirmed: true}).then(function(resp){
      

		db.referral.find({where:{newUserId: usr.id}}).then(function(ref){

			if(ref !== null){
		        ref.update({newUserEmailValidated: true});

			console.log('update confirmEmail...');
	                console.log(ref);
			

			}

		},function(err){
			console.log(err);

		});

		res.json(resp);
		

	},function(err){

       	console.log('Update Email Confirmed Err');
		console.log(err);
		res.status(400).json(err);

	});
},function(err){

       console.log('Find user ERR');
	console.log(err);
	res.status(400).json(err);
});


  

});



module.exports = router;
