var mongoose      = require('mongoose');
var databaseUri   = require('../config/db')(process.env.NODE_ENV || "development");
mongoose.connect(databaseUri);

var request     = require("request-promise");
var Country       = require('../models/country');

request("http://www.geognos.com/api/en/countries/info/all.json")
  .then(function(response) {
    var response = JSON.parse(response);
    var codes = Object.keys(response.Results);
    for (var i = 0; i < 241; i++) {
      var country = new Country({
        name: response.Results[codes[i]].Name,
        countryCode: codes[i]
      })
      country.save(function(err, country) {
        console.log(country);
      })
    }

  });