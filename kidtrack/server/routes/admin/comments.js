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

 console.log("comments");


db.comment.findAll().then(function(comments) {
      res.json(comments);
          }, function() {
    res.status(500).send();
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