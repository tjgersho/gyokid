const express = require('express');
const router = express.Router();

var db = require('../util/db.js');
var middleware = require('../util/middleware.js')(db);
var _ = require('underscore');

var bodyParser = require('body-parser');


router.post('/email/:id', [bodyParser.json()], function(req,res){

   var emailId = parseInt(req.params.id, 10);

	var body = _.pick(req.body, 'emailCode');

	console.log(body.emailCode);

	
    db.email.find({where: {id: emailId, code: body.emailCode }}).then(function(email){
	console.log('Found email?');
	console.log(email);
	
        if(!!email){

           email.email = email.email.replace(/cid:/g, "assets/");

            res.status(200).json({email: email.email});
        }else{
            res.status(404).send();
        }

    },function(err){
            res.status(500).json(err);
    });
   
});



module.exports = router;


