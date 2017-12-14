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
console.log('Admin post device new');
console.log(body);
body.imei = body.imei.toString();
body.sim = body.sim.toString();
body.ktc = body.sim.substr(body.sim.length - 3);

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

var body = _.pick(req.body, 'userId');
///Some Validation on the post.

  var attributes = {};



   if (body.hasOwnProperty('userId')) {
    attributes.userId = body.userId;
  }

  
 console.log('in device update.');
  console.log(deviceId);
  console.log(attributes);


db.user.findById(attributes.userId).then(function(u){

	 console.log('Found Device user');
         console.log(u);

      db.device.findById(deviceId).then(function(device) {
	  if (!!device) {

	    device.setUser(u);
		res.status(204).send();

          } else {
            res.status(404).send();
          }
        }, function() {
         res.status(500).send();
       });


       },function(err){

          console.log('Found Device user ERR');
         console.log(err);


       });



});


router.post('/device/:id',  [bodyParser.json(), middleware.adminOnly],  function(req, res){


var deviceId = parseInt(req.params.id, 10);

var body = _.pick(req.body, 'userId', 'deregister');
///Some Validation on the post.

    
 console.log('in device de register...');
  console.log(deviceId);

  console.log('Deregister...');

  console.log(body.deregister);


  db.device.findById(deviceId).then(function(device) {
    if (!!device) {
     	
	db.user.findById(device.userId).then(function(u){

	 console.log('Found Device user');
         console.log(u);

	     device.setUser(null);

       if(body.deregister){
        db.gps.destroy({where:{deviceId: deviceId}}).then(function(des){
            console.log('Destory gps dev');
            console.log(des);

                res.status(204).send();

        },function(err){
            console.log('ERR');
            console.log(err);
              res.status(404).send(err);
        });

       }else{

               res.status(204).send();
       }



       },function(err){

          console.log('Found Device user ERR');
         console.log(err);
          res.status(404).send(err);

       });


    } else {
      console.log('Couldnt find device for deregistration');

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