const express = require('express');
const router = express.Router();
var db = require('../util/db.js');
var middleware = require('../util/middleware.js')(db);
var _ = require('underscore');

var bodyParser = require('body-parser');

var moment = require("moment");



/////Device Update watching & tag.....

router.post('/logTransaction',  [middleware.requireAuthentication, bodyParser.json()], function(req, res){
       console.log(req.body);
	var body = _.pick(req.body, 'transaction');
	console.log('BODY in Logtransaction');
	console.log(body);

	var usr = req.user;

	console.log('User to update pingcredits');
	console.log(usr.id);


	var transobject = {};

	transobject.userId = usr.id;
	transobject.status = body.transaction.state;
	transobject.amount =  parseFloat(body.transaction.transactions[0].amount.total);
	transobject.transnum = body.transaction.id;
	transobject.cart = body.transaction.cart;
	transobject.first_name = body.transaction.payer.payer_info.first_name;
	transobject.last_name = body.transaction.payer.payer_info.last_name;
	transobject.email = body.transaction.payer.payer_info.email;
	transobject.phone = body.transaction.payer.payer_info.phone;
	transobject.payer_id = body.transaction.payer.payer_info.payer_id;
	

	
	
       db.pingSale.create(transobject).then(function(trans){
		console.log('Transaction Logged');
		console.log(trans);

		////Now Update user ping credits!!

		var userCurrentPingCredits = usr.pingCredits;
		var newPingCredits = userCurrentPingCredits + transobject.amount * 1024;
		usr.update({pingCredits: newPingCredits}).then(function(usr){
		
			console.log('USer ping credits updated');
			console.log(usr);
		
   		 res.status(200).send(body.transaction);

		});
			
       });
        

});




module.exports = router;





