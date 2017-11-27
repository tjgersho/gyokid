const express = require('express');
const router = express.Router();
var db = require('../util/db.js');
var middleware = require('../util/middleware.js')(db);
var _ = require('underscore');

var bodyParser = require('body-parser');





/////Device Update watching & tag.....

router.put('/device/:id',  [bodyParser.json(), middleware.requireAuthentication],  function(req, res){

var usr = req.user;

var deviceId = parseInt(req.params.id, 10);

var body = _.pick(req.body, 'tag', 'watching', 'alarm');
///Some Validation on the post.

  var attributes = {};



   if (body.hasOwnProperty('tag')) {
    attributes.tag = body.tag;
  }


   if (body.hasOwnProperty('watching')) {
    attributes.watching = body.watching;
  }

  if (body.hasOwnProperty('alarm')) {
    attributes.alarm = body.alarm;
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

var body = _.pick(req.body, 'watching', 'alarm');
///Some Validation on the post.

  var attributes = {};



 


   if (body.hasOwnProperty('watching')) {
    attributes.watching = body.watching;
  }

   if (body.hasOwnProperty('alarm')) {
    attributes.alarm = body.alarm;
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
			return 1;

			
			},function(err){
			results.push(err);
			return 0;
		
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



/////Device Registration.....
router.post('/register-device', [bodyParser.json(), middleware.requireAuthentication],  function(req, res){


var body = _.pick(req.body, 'imei', 'ktc');

var usr = req.user;

console.log('USER in device registration');
	console.log(usr.id);


  console.log("Find  Device for user registration");
  console.log(body);

  db.device.find({where: {imei: body.imei, ktc: body.ktc}}).then(function(device) {

    if (!!device && !device.userId) {

         console.log('Device Found...');
	console.log(device.imei, device.userId);

	     device.setUser(usr);

             res.json(device);

         } else {

             res.status(404).send();
    }
  }, function() {
    res.status(500).send();
  });

});




/////Device GPS.......
router.get('/device/:id',  [middleware.requireAuthentication],  function(req, res){

var usr = req.user;

var deviceId = parseInt(req.params.id, 10);

  
 console.log('in GET Device GPS data');
  console.log(deviceId);

console.log('User id');
	console.log(usr.id);





  db.device.findById(deviceId).then(function(device) {

	console.log('Found device for get GPS data');
	console.log(device.id);
	console.log('Device user id');
	console.log(device.userId);
	
	 if (!!device && device.userId === usr.id) {

			db.gps.findAll({
				where: {deviceId: device.id}, 
				order: [
   					 ['createdAt', 'DESC']
				],
				limit: 10 
				}).then(function(gpsData){
					console.log('GPS Data');
					console.log(gpsData);

			        	res.status(200).send(gpsData);
				

				},function(err){
				  console.log('ERR getting GPS Data'); 
				  console.log(err);
				  res.status(404).send([]);  
				 
				});

			 } else {
                            res.status(404).send([]);
                     }
			
			

		},function(err){

			console.log("Find Device to get GPS data by Err");
			console.log(err);
			 res.status(404).send([]);

		});
 


});




/////Get All user Device GPS.......
router.post('/allGpsData',  [bodyParser.json(), middleware.requireAuthentication],  function(req, res){

 var usr = req.user;

 var deviceIDArr = _.pick(req.body, 'devArry');
 console.log(deviceIDArr);


  
 console.log('in GET Device GPS data');

console.log('User id');
	console.log(usr.id);


var results = [];

 var promises = deviceIDArr.devArry.map(function(devId){
	
	console.log('Device Id in map function');
	console.log(devId);

	return  db.device.findById(devId).then(function(device) {

	console.log('Found device for get GPS data');
	console.log(device.id);
	console.log('Device user id');
	console.log(device.userId);
	
	              if (!!device && device.userId === usr.id) {

			  return db.gps.findAll({
				where: {deviceId: device.id}, 
				order: [
   					 ['createdAt', 'DESC']
				],
				limit: 10 
				}).then(function(gpsData){
					console.log('GPS Data');
					console.log(gpsData);



					results.push({'devId': device.id, gpsData: gpsData, alarm: device.alarm});

					return 1;
				});

			     }else{
			           result.push('FAIL');
                                   return Promise.resolve();
					return 0;
			     }
                          
                         }).catch(function(err){

                                   result.push('FAIL');
                                   return Promise.resolve();

				  return 0;

			});


        });  // map function

	console.log('Promises');
	console.log(promises);


        return Promise.all(promises).then(function(resp){
				console.log('All promises resp');
				console.log(resp);

				console.log('Results');
				console.log(results);

				res.status(200).send(results);

			});

 	
 


});





module.exports = router;



