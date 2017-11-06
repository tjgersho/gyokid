const express = require('express');
const router = express.Router();
var db = require('../util/db.js');
var middleware = require('../util/middleware.js')(db);
var _ = require('underscore');
var bodyParser = require('body-parser');

var request = require('request');

var fs = require('fs');

var access = require('../util/apiaccess.js');

var auth = {
  auth: {
    api_key: access.mailgun,
    domain: 'xonumia.com'
  }
}

console.log('MAIL GUN ACCESS AUTH');
console.log(auth);

var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var nodemailerMailgun = nodemailer.createTransport(mg(auth));
var handlebars = require('handlebars');








function sendEmailnewComment(usr, com, em, cname){

var emailcode = Math.floor(Math.random()*100000)+1000;
var emailConfirmationCode = Math.floor(Math.random()*100000)+1000;

usr.update({emailConfirmCode: emailConfirmationCode}).then(function(userup){
   db.email.create({code: emailcode}).then(function(email){

		email.setUser(userup);

var emailctx =  {name: userup.username,
		comment: com,
		cemail:em,
		cname: cname,
		viewinbrowserlink: 'http://ec2-13-56-171-193.us-west-1.compute.amazonaws.com/viewEmail/'+emailcode+'/id/'+email.id
			};

  var top = fs.readFileSync('./server/emailviews/emailhead.hbs').toString();
  var body = fs.readFileSync('./server/emailviews/newCommentEmail.hbs').toString();
  var footer = fs.readFileSync('./server/emailviews/emailfooter.hbs').toString();


  var template = handlebars.compile(top+body+footer);
  var html = template(emailctx);
  var toEmail = ['travis.g@paradigmmotion.com', 'kidtrack@kidtrack.io'];
  var emailSubject = 'KidTrack - New Comment';


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










router.post('/contact',  bodyParser.json(),  function(req, res){

var commentbody = _.pick(req.body, 'name', 'email', 'comment', 'gRecaptchaResponse');
console.log('POST COMMENT ');

console.log(commentbody);

      if( commentbody.gRecaptchaResponse === undefined ||  commentbody.gRecaptchaResponse  === '' || commentbody.gRecaptchaResponse === null) {
          return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
        }

        console.log(req.body['gRecaptchaResponse']);
        // Put your secret key here.
        var secretKey = "6LcJdTcUAAAAAMVTyrTEqLNuU3qGvnLOtBRRl_h0";
        // req.connection.remoteAddress will provide IP address of connected user.
        var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + commentbody.gRecaptchaResponse + "&remoteip=" + req.connection.remoteAddress;
        // Hitting GET request to the URL, Google will respond with success or error scenario.
        request(verificationUrl,function(error,response,body) {
          body = JSON.parse(body);
          // Success will be true or false depending upon captcha validation.
          if(body.success !== undefined && !body.success) {
            return res.status(404).json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
          }

            db.comment.create(commentbody).then(function(comment){ 
			db.user.findById(1).then(function(usr){ 

			      sendEmailnewComment(usr, commentbody.comment, commentbody.email, commentbody.name)
                        res.status(200).json(comment.toJSON());
				 },function(err){
                res.status(400).json(err);
            });


  
                 
            },function(err){
                res.status(400).json(err);
            });


        });


});


module.exports = router;
