var express = require('express');
var router = express.Router();
var db = require('../database');
var md5 = require('md5');

/* Login */
router.post('/', function (req, res, next) {
	const userRef = db.ref('users/').orderByChild('email').equalTo(req.body.email);
	userRef.once('value')
		.then(data => {
			data = data.val();
			for (var key of Object.keys(data)) {
				let user = data[key];
				user.id = key;
				if (user.password === md5(req.body.password)) {
					res.send({result:"success", user});
				} else {
					res.send({result:'failed', msg:'Incorrect username or password.'});
				}
			}
		}).catch(e=>next(e));
});

module.exports = router;

