var express     = require("express");
var app         = express();
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');
var cors        = require('cors');
var bluebird    = require ('bluebird');
var qs          = require('qs');

var environment = app.get('env');
var port        = process.env.PORT || 3000;
var routes      = require('./config/routes');
var databaseUri = require('./config/db')(environment);

mongoose.connect(databaseUri);

mongoose.Promise = bluebird;

if('test' !== environment) {
  app.use(require('morgan')('dev'));
}

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api', routes);

app.listen(port, function(){
  console.log("Express is alive and kicking on port " + port);
});

module.exports = app;