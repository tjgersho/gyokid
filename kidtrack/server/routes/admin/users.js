const express = require('express');
const router = express.Router();
var db = require('../../util/db.js');
var middleware = require('../../util/middleware.js')(db);
var _ = require('underscore');
var cryptojs = require('crypto-js');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var access = require('../../util/apiaccess.js');
var jwt = require('jsonwebtoken');

var cryptojs = require('crypto-js');



router.put('/user/:id',  [bodyParser.json(), middleware.adminOnly],  function(req, res){


var userId = parseInt(req.params.id, 10);

var body = _.pick(req.body, 'sendmail', 'referralWins', 'pingCredits' );
///Some Validation on the post.

  var attributes = {};



  if (body.hasOwnProperty('sendmail')) {
    attributes.sendmail = body.sendmail;
  }



   if(body.hasOwnProperty('referralWins')){
      attributes.referralWins = body.referralWins;

    }
   if(body.hasOwnProperty('pingCredits')){
      attributes.pingCredits = body.pingCredits;

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
router.get('/users', middleware.adminOnly, function (req, res) {
  
   var query  = req.query;
    
   var where = {};

   var include = [{model: db.device}];


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


router.get('/userspagecount', middleware.adminOnly, function(req,res){
  var where = {};
  db.user.findAndCountAll({
    where: where
  }).then(function(td) {
    res.json(td.count);
  }, function(e) {
    res.status(500).json(e);
  });

});



// DELETE /user
router.delete('/user/:id', [middleware.adminOnly], function (req, res) {

 var userId = parseInt(req.params.id, 10);

  db.user.find({where: {id:userId}, include: [{model: db.device}]}).then(function(u){
 
	u.devices.forEach(function(d){
		d.removeUser(u);
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











module.exports = router;