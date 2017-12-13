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
 


router.get('/comments', [middleware.adminOnly],  function(req, res){

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

          db.comment.findAll({
              where: where,
              limit: limit,
              offset: offset,
              order: order,
              include: include
            }).then(function(comments) {
                res.json(comments);
           }, function() {
              res.status(500).send();
          });

});



router.get('/commentspagecount', middleware.adminOnly, function(req,res){
  var where = {};
  db.comment.findAndCountAll({
    where: where
  }).then(function(c) {
    res.json(c.count);
  }, function(e) {
    res.status(500).json(e);
  });

});





// DELETE /comment by id
router.delete('/comment/:id', [middleware.adminOnly], function (req, res) {

   var commentId = parseInt(req.params.id, 10);
   db.comment.find({where: {id:commentId}}).then(function(e){

	console.log('Found comment for delete');
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