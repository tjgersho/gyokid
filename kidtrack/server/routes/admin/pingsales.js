const express = require('express');
const router = express.Router();
var db = require('../../util/db.js');
var middleware = require('../../util/middleware.js')(db);
var _ = require('underscore');
var cryptojs = require('crypto-js');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');


var cryptojs = require('crypto-js');
 


router.get('/pingsales', [middleware.adminOnly],  function(req, res){

 console.log("pingsales");

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

          db.pingSale.findAll({
              where: where,
              limit: limit,
              offset: offset,
              order: order,
              include: include
            }).then(function(pingSales) {
                res.json(pingSales);
          }, function() {
    res.status(500).send();
  });

});



router.get('/salespagecount', middleware.adminOnly, function(req,res){
  var where = {};
  db.pingSale.findAndCountAll({
    where: where
  }).then(function(ps) {
    res.json(ps.count);
  }, function(e) {
    res.status(500).json(e);
  });

});







// DELETE /pingsales by id
router.delete('/pingsales/:id', [middleware.adminOnly], function (req, res) {

   var pingsaleId = parseInt(req.params.id, 10);
   db.pingSale.find({where: {id:pingsaleId}}).then(function(s){

	console.log('Found pingSales for delete');
	console.log(s);

  s.update({archive: true}).then(function(s) {
    res.status(200).send(s);
  }).catch(function () {
    res.status(500).send();
 });

  }, function(e) {
	console.log('User Not Found');
    res.status(500).json(e);
  });

});





module.exports = router;