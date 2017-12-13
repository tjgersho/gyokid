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
 


var auth = {
  auth: {
    api_key: access.mailgun,
    domain: 'mail.kidtrack.io'
  }
}

var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var nodemailerMailgun = nodemailer.createTransport(mg(auth));
var handlebars = require('handlebars');

////I have emails pre-reqs for future "RESEND EMAIL CAPABILITY"



router.get('/emails', [middleware.adminOnly],  function(req, res){

 console.log("Emails");


var query  = req.query;
    
   var where = {};

   var include = [];


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
		if(query.order !== ''){
	    	   order = query.order; 
		}else{
		   order =  [['id', 'DESC']];
		}
  	  }else{
		 order =  [['id', 'DESC']];
	}


  
        console.log('Devices Order');
	console.log(order);

          db.email.findAll({
              where: where,
              limit: limit,
              offset: offset,
              order: order,
              include: include
            }).then(function(emails) {
      res.json(emails);
          }, function() {
    res.status(500).send();
  });

});


router.get('/emailpagecount', middleware.adminOnly, function(req,res){
  var where = {};
  db.email.findAndCountAll({
    where: where
  }).then(function(em) {
    res.json(em.count);
  }, function(e) {
    res.status(500).json(e);
  });

});




// DELETE /email by id
router.delete('/email/:id', [middleware.adminOnly], function (req, res) {

   var emailId = parseInt(req.params.id, 10);
   db.email.find({where: {id:emailId}}).then(function(e){

	console.log('Found email for delete');
	console.log(e);

  e.destroy().then(function () {
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