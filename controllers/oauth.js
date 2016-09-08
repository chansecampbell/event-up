var User      = require('../models/user');
var request   = require('request-promise');
var jwt       = require('jsonwebtoken');
var secret    = require('../config/tokens').secret;

function login(req, res) {
  request.post({
    url: "https://graph.facebook.com/v2.5/oauth/access_token",
    qs: {
      client_id: process.env.OAUTH_FACEBOOK_API_KEY,
      client_secret: process.env.OUATH_FACEBOOK_API_SECRET,
      code: req.body.code,
      redirect_uri: "http://localhost:3000/"
    },
    json: true
  })
  .then(function(access_token) {
    return request.get({
      url: "https://graph.facebook.com/v2.5/me?fields=id,email,first_name,last_name,picture.width(300)",
      qs: access_token,
      json: true
    });
  })
  .then(function(profile) {
    return User.findOne({ email: profile.email })
      .then(function(user) {
        if(user) {
          user.facebookId = profile.id;
          user.avatar = profile.picture ? profile.picture.data.url : null;
        }
        else {
          user = new User({
            first_name: profile.first_name,
            last_name: profile.last_name,
            avatar: profile.picture ? profile.picture.data.url : null,
            email: profile.email,
            facebookId: profile.id,
            password: "password",
            passwordConfirmation: "password"
          });
        }
        console.log("Here's our user.. ", user);
        return user.save();
      })
  })
  .then(function(user) {
    var payload = {
      _id: user._id,
      avatar: user.avatar,
      email: user.email
    };

    var token = jwt.sign(payload, secret, { expiresIn: '24h' });

    res.status(200).json({ token: token });

  })
  .catch(function(err) {
    console.log(err);
    res.status(500).json(err);
  })
}

module.exports = {
  login: login,
}