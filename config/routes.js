var router              = require('express').Router();
var jwt                 = require('jsonwebtoken');
var secret              = require('../config/tokens').secret;
var usersController     = require('../controllers/users');
var countriesController = require('../controllers/countries');
var authController      = require('../controllers/authentications');
var facebookController  = require('../controllers/oauth');


function secureRoute(req, res, next) {
  if(!req.headers.authorization) return res.status(401).json({ message: "Unauthorized" });

  var token = req.headers.authorization.replace('Bearer ', '');

  jwt.verify(token, secret, function(err, payload) {
    if(err || !payload) return res.status(401).json({ message: "Unauthorized" });

    req.user = payload;
    next();
  });
}

router.route('/users')
  .all(secureRoute)
  .get(usersController.index)
  .post(usersController.create);

router.route('/users/:id')
  .all(secureRoute)
  .get(usersController.show)
  .put(usersController.update)
  .patch(usersController.update)
  .delete(usersController.delete);

router.route('/countries')
  .all(secureRoute)
  .get(countriesController.index)
  .post(countriesController.create);

router.route('/countries/:id')
  .all(secureRoute)
  .get(countriesController.show)
  .put(countriesController.update)
  .patch(countriesController.update)
  .delete(countriesController.delete);  

router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/oauth/facebook', facebookController.login);

module.exports = router;