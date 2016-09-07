var express = require("express");
var app = express();

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var environment = app.get('env');
var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log("Express is alive and kicking on port " + port);
});