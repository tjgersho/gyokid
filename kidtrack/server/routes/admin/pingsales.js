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


db.pingSale.findAll().then(function(pingSales) {
      res.json(pingSales);
          }, function() {
    res.status(500).send();
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