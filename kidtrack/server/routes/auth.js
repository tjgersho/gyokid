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


function sendEmailConfirmationEmail(usr){

var xoemailcode = Math.floor(Math.random()*100000)+1000;
var emailConfirmationCode = Math.floor(Math.random()*100000)+1000;

usr.update({emailConfirmCode: emailConfirmationCode}).then(function(userup){
   db.xoemail.create({code: xoemailcode}).then(function(xoemail){

		xoemail.setUser(userup);

var emailctx =  {name: userup.username,
		   viewinbrowserlink: 'https://xonumia.io/viewEmail/'+xoemailcode+'/id/'+xoemail.id,
		   verifyemaillink: 'https://xonumia.io/emailconfirm/'+usr.username+'/code/'+emailConfirmationCode
			};

  var top = fs.readFileSync('./views/emailtemplates/emailhead.hbs').toString();
  var body = fs.readFileSync('./views/emailtemplates/confirmemail.hbs').toString();
  var footer = fs.readFileSync('./views/emailtemplates/emailfooter.hbs').toString();

  //var text = fs.readFileSync('./views/emailtemplates/confirmemail.txt').toString();

  var template = handlebars.compile(top+body+footer);
  var html = template(emailctx);
  var toEmail = userup.email;
  var emailSubject = 'Xonumia - Email Confirmation';


xoemail.update({email: html});


nodemailerMailgun.sendMail({
  from: 'xonumia@xonumia.io',
  to: toEmail, // An array if you have multiple recipients. 
  //cc:'',
 // bcc:'',
  subject: emailSubject,
  'h:Reply-To': 'xonumia@xonumia.io', 
   html: html,
  // text: text,
   attachments: [
        {
            cid: 'xoIconV1.png',
            content:  fs.readFileSync('./cdn/public/img/xoIconV1.png')
        },
         {
            cid: 'emailheaderimg.jpg',
            content:  fs.readFileSync('./cdn/public/img/emailheaderimg.jpg')
        },
         {
            cid: 'instagram.png',
            content:  fs.readFileSync('./cdn/public/img/instagram.png')
        },
         {
            cid: 'fb.png',
            content:  fs.readFileSync('./cdn/public/img/fb.png')
        },
         {
            cid: 'twitter.png',
            content:  fs.readFileSync('./cdn/public/img/twitter.png')
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



router.post('/users/findByToken',  bodyParser.json(),  function(req, res){
 var body = _.pick(req.body, 'token');

  var token = body.token;
    db.token.findOne({
          where: {
             tokenHash: cryptojs.MD5(token).toString()
           }
        }).then(function (tokenInstance) {
          if (!tokenInstance) {
             res.status(401).json("Token Not Found");
          }
           
          req.token = tokenInstance;

          db.user.findByToken(token).then(function(resp){

              res.status(200).json(resp.toPublicJSON());
            },function(err){

             res.status(401).json(err);
          });
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



router.put('/updateUsersAdmin/:id',  [bodyParser.json(), middleware.adminOnly],  function(req, res){


var userId = parseInt(req.params.id, 10);

var body = _.pick(req.body, 'bodyColorR', 'bodyColorG', 'bodyColorB', 'bodyColorA',
		 'borderColorR',  'borderColorG', 'borderColorB', 'borderColorA', 'skinId', 'useSkin', 'sendmail', 'shippingAddress', 'referralWins', 'xBits' );
///Some Validation on the post.

  var attributes = {};

  if (body.hasOwnProperty('bodyColorR')) {
    attributes.bodyColorR = body.bodyColorR;
  }
   if (body.hasOwnProperty('bodyColorG')) {
    attributes.bodyColorG = body.bodyColorG;
  }
  if (body.hasOwnProperty('bodyColorB')) {
    attributes.bodyColorB = body.bodyColorB;
  }
  if (body.hasOwnProperty('bodyColorA')) {
    attributes.bodyColorA = body.bodyColorA;
  }

   if (body.hasOwnProperty('borderColorR')) {
    attributes.borderColorR = body.borderColorR;
  }
   if (body.hasOwnProperty('borderColorG')) {
    attributes.borderColorG = body.borderColorG;
  }
   if (body.hasOwnProperty('borderColorB')) {
    attributes.borderColorB = body.borderColorB;
  }
   if (body.hasOwnProperty('borderColorA')) {
    attributes.borderColorA = body.borderColorA;
  }

   if (body.hasOwnProperty('useSkin')) {
    attributes.useSkin = body.useSkin;
  }

   if (body.hasOwnProperty('skinId')) {
    attributes.skinId = body.skinId;
  }

  if (body.hasOwnProperty('sendmail')) {
    attributes.sendmail = body.sendmail;
  }

   if(body.hasOwnProperty('shippingAddress')){
      attributes.shippingAddress = body.shippingAddress;

    }

   if(body.hasOwnProperty('referralWins')){
      attributes.referralWins = body.referralWins;

    }
   if(body.hasOwnProperty('xBits')){
      attributes.xBits = body.xBits;

    }

	console.log('in user update.');
	console.log(userId);
	console.log(attributes);


  db.user.findById(userId).then(function(usr) {
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



// GeT /users ADMIN
router.get('/usersAdmin', middleware.adminOnly, function (req, res) {
  
   var query  = req.query;
    
   var where = {};

   var include = [{model: db.xnum}];


    var limit;
    var offset;
    var order;
	
   
 	 if(query.hasOwnProperty('limit')){
		  limit = parseInt(query.limit);
  	 }
  	 if(query.hasOwnProperty('page')){
    		 offset =  parseInt(query.page)*limit;
  	 }
  	 if(query.hasOwnProperty('order')){
	    	 order = query.order; 
  	  }else{
		 order =  [['id', 'DESC']];
	}


  
        console.log('USERS Order');
	console.log(order);

          db.user.findAll({
              where: where,
              limit: limit,
              offset: offset,
              order: order,
              include: include
            }).then(function(users) {	
			console.log('Users Dump..');
			console.log(users)	
 		
			  var promises = users.map(function(u){

  			   return db.referral.findAll({where:{origUserId: u.id}}).then(function(ref){
				   console.log('referrals found');
				   console.log(ref);
				   console.log(u);
				   u.dataValues.referralCount = ref.length;

       				 });

			    });

			Promise.all(promises).then(function(){
        				res.json(users);
 			});
					
                     
                }, function(e) {
                  res.status(500).json(e);
           });


});


router.get('/usersPageCount', middleware.adminOnly, function(req,res){
  var where = {};
  db.user.findAndCountAll({
    where: where
  }).then(function(td) {
    res.json(td.count);
  }, function(e) {
    res.status(500).json(e);
  });

});



// DELETE /users/login
router.delete('/deluserAdmin/:id', [middleware.adminOnly], function (req, res) {

 var userId = parseInt(req.params.id, 10);
db.user.find({where: {id:userId}, include: [{model: db.xnum}]}).then(function(u){



	u.xnums.forEach(function(x){

		if(!x.paid){
			x.update({found : false, userId: null, payRequested: false});

		}
	});
 

  u.destroy().then(function () {
    res.status(204).send();
  }).catch(function () {
    res.status(500).send();
 });

  }, function(e) {
	console.log('User Not Found');
    res.status(500).json(e);
  });

});



router.post('/users/login',  bodyParser.json(),  function (req, res) {
  var body = _.pick(req.body, 'email_or_username', 'password');

  var userInstance;

	body.email_or_username = body.email_or_username.toLowerCase();
 
  db.user.authenticate(body).then(function (user) {

    var token = user.generateToken('authentication');

    userInstance = user;

    return db.token.create({
      token: token
    });
  }).then(function (tokenInstance) {
     res.header('Auth', tokenInstance.get('token')).json(userInstance.toPublicJSON());
  }).catch(function () {
    res.status(401).send();
  });
});



// DELETE /users/login
router.delete('/users/login', [bodyParser.json(), middleware.requireAuthentication], function (req, res) {
  req.token.destroy().then(function () {
    res.status(204).send();
 }).catch(function () {
    res.status(500).send();
 });
});




module.exports = router;