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

router.post('/device', [bodyParser.json(), middleware.adminOnly],  function(req, res){


var body = _.pick(req.body, 'imei', 'sim');

console.log("create Device");
console.log(body);

db.device.create(body).then(function(device) {
    if (!!device) {
             res.json(device);
         } else {
             res.status(404).send();
    }
  }, function() {
    res.status(500).send();
  });

});


router.put('/device/:id',  [bodyParser.json(), middleware.adminOnly],  function(req, res){


var deviceId = parseInt(req.params.id, 10);

var body = _.pick(req.body, 'imei', 'sim', 'userId');
///Some Validation on the post.

  var attributes = {};



   if (body.hasOwnProperty('userId')) {
    attributes.userId = body.userId;
  }

   if (body.hasOwnProperty('imei')) {
    attributes.imei= body.imei;
  }

  if (body.hasOwnProperty('sim')) {
    attributes.sim = body.sim;
  }

   	console.log('in device update.');
	console.log(deviceId);
	console.log(attributes);


  db.device.findById(deviceId).then(function(device) {
    if (!!usr) {
      device.update(attributes).then(function(d) {
        res.json(d);
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
router.get('/devices', middleware.adminOnly, function (req, res) {
  
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

          db.device.findAll({
              where: where,
              limit: limit,
              offset: offset,
              order: order,
              include: include
            }).then(function(devices) {	
			console.log('devices Dump..');
			console.log(devices)	
 	
        		res.status(200).json(devices);
                     
                }, function(e) {
                  res.status(500).json(e);
           });

});


router.get('/devicespagecount', middleware.adminOnly, function(req,res){
  var where = {};
  db.device.findAndCountAll({
    where: where
  }).then(function(td) {
    res.json(td.count);
  }, function(e) {
    res.status(500).json(e);
  });

});



// DELETE /device
router.delete('/device/:id', [middleware.adminOnly], function (req, res) {

   var deviceId = parseInt(req.params.id, 10);
   db.device.find({where: {id:deviceId}, include: [{model: db.gps}]}).then(function(d){

	console.log('Found device for delete');
	console.log(d);

	d.gps.forEach(function(g){
		g.destroy();
	});
 

  d.destroy().then(function () {
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