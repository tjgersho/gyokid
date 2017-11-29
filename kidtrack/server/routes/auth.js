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




router.post('/user/findByToken',  bodyParser.json(),  function(req, res){

console.log('IN Find By Token');
 var body = _.pick(req.body, 'token');

  var token = body.token;
console.log('token', token);
    db.token.findOne({
          where: {
             tokenHash: cryptojs.MD5(token).toString()
           }
        }).then(function (tokenInstance) {
          if (!tokenInstance) {
             res.status(401).json("Token Not Found");
          }
           
          req.token = tokenInstance;

          db.user.findByToken(token).then(function(user){

		console.log('USER find by token');
		console.log(user.id);

		db.device.findAll({where:{userId: user.id}}).then(function(devices){
			console.log('Users');
			console.log(devices.length);


			user.dataValues.devices = devices;
			
			
		       console.log(user.id);

		
			 res.status(200).json(user);

                },function(err){


		});

                 
            },function(err){

             res.status(401).json(err);
          });
      });
});

router.get('/user/getAdminByToken', [bodyParser.json(), middleware.adminOnly],  function(req, res){
	console.log('In Get by Admin Token');
	console.log(req.user.id);
	
	res.status(200).json(req.user);
});





router.post('/login',  bodyParser.json(),  function (req, res) {
  var body = _.pick(req.body, 'email_or_username', 'password');

 console.log('login');
	console.log(body);

  var userInstance;

	body.email_or_username = body.email_or_username.toLowerCase();
 
  db.user.authenticate(body).then(function (user) {

    var token = user.generateToken('authentication');
console.log('token');
	console.log(token);

    userInstance = user;

    return db.token.create({
      token: token
    });

  }).then(function (tokenInstance) {
	console.log('Token instance');
	console.log(tokenInstance);

     res.header('Auth', tokenInstance.get('token')).json(userInstance.toPublicJSON());

  }).catch(function () {
    res.status(401).send();
  });
});



// DELETE /logoutn
router.delete('/logout', [bodyParser.json(), middleware.requireAuthentication], function (req, res) {

 req.token.destroy().then(function () {
    res.status(204).send();
 }).catch(function () {
    res.status(500).send();
 });

});




module.exports = router;