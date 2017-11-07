const express = require('express');
const router = express.Router();
var db = require('../util/db.js');
var middleware = require('../util/middleware.js')(db);
var _ = require('underscore');

var bodyParser = require('body-parser');



/////Device Registration.....
router.post('/device', [bodyParser.json(), middleware.requireAuthentication],  function(req, res){


var body = _.pick(req.body, 'imei');

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



/////Device Update watching & tag.....

router.put('/device/:id',  [bodyParser.json(), middleware.requireAuthentication],  function(req, res){

var usr = req.user;

var deviceId = parseInt(req.params.id, 10);

var body = _.pick(req.body, 'tag', 'watching');
///Some Validation on the post.

  var attributes = {};



   if (body.hasOwnProperty('tag')) {
    attributes.tag = body.tag;
  }


   if (body.hasOwnProperty('watching')) {
    attributes.watching = body.watching;
  }


  
 console.log('in device update.');
  console.log(deviceId);
  console.log(attributes);



  db.device.findById(deviceId).then(function(device) {
	 if (!!device) {

		device.update(attributes).then(function(d){

			console.log('Device was updated');
			console.log(d);

			res.status(200).send(d);

		},function(err){

			console.log("Device was not updated");
			console.log(err);
			 res.status(404).send();

		});
 
		

          } else {
            res.status(404).send();
          }
           }, function() {
            res.status(500).send();
          });



});



/////Device Update watching & tag.....

router.put('/devices',  [bodyParser.json(), middleware.requireAuthentication],  function(req, res){

var usr = req.user;

var body = _.pick(req.body, 'watching');
///Some Validation on the post.

  var attributes = {};



 


   if (body.hasOwnProperty('watching')) {
    attributes.watching = body.watching;
  }


  
 console.log('in device update.');

  console.log(attributes);



  db.device.findAll({where: {userId: usr.id}}).then(function(devices) {
	 if (!!devices) {

	var results = [];
	var promises =    devices.map(function(device){

		return device.update(attributes).then(function(d){

			console.log('Device was updated');
			console.log(d);
			results.push(d);
			
			
			},function(err){
			results.push(err);
		
			});

            });


		return Promise.all(promises).then(function(resp){
				console.log('All promises resp');
				console.log(resp);
				res.status(200).send(results);

			});
			

		

          } else {
            res.status(404).send();
          }
           }, function() {
            res.status(500).send();
          });



});






module.exports = router;



