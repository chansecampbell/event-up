var mongoose      = require('mongoose');
var User          = require('../models/user');
var bluebird      = require('bluebird');

var databaseUri   = require('../config/db')(process.env.NODE_ENV || "development");
mongoose.connect(databaseUri);
mongoose.Promise  = bluebird;

User.collection.drop();

var user1 = new User({
  first_name: "Chanse",
  last_name: "Campbell",
  avatar: "https://cloud.githubusercontent.com/assets/8389262/18252549/ecddf9a4-7386-11e6-85f3-7ef7a4f071e8.png",
  email: "chanse@chanse.com",
  password: "password",
  passwordConfirmation: "password"
})

user1.save(function(err, user) {
  if (err) return console.log(err);
  console.log(user.first_name, " added to the database.");
});

var user2 = new User({
  first_name: "Rosanna",
  last_name: "Rossington",
  avatar: "https://cloud.githubusercontent.com/assets/8389262/18252548/eb7918fa-7386-11e6-8a45-5f0f075fac10.jpg",
  email: "rosie@rosie.com",
  password: "password",
  passwordConfirmation: "password"
})

user2.save(function(err, user) {
  if (err) return console.log(err);
  console.log(user.first_name, " added to the database.");
});

var user3 = new User({
  first_name: "Mike",
  last_name: "Hayden",
  avatar: "https://cloud.githubusercontent.com/assets/8389262/18252546/e9966b14-7386-11e6-800e-a1e826c1db0c.png",
  email: "mike@mike.com",
  password: "password",
  passwordConfirmation: "password"
})

user3.save(function(err, user) {
  if (err) return console.log(err);
  console.log(user.first_name, " added to the database.");
});