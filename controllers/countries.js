var Country = require('../models/country');

function countriesIndex(req, res) {
  Country.find(function(err, countries) {
    if(err) return res.status(500).json(err);
    return res.status(200).json(countries);
  });
}

function countriesCreate(req, res) {
  Country.create(req.body, function(err, country) {
    if(err) return res.status(400).json(err);
    return res.status(201).json(country);
  });
}

function countriesShow(req, res) {
  Country.findById(req.params.id, function(err, country) {
    if(err) return res.status(500).json(err);
    if(!countries) return res.status(404).json({ message: "Could not find a countries with that id" });
    return res.status(200).json(country);
  });
}

function countriesSearch(req, res){
  var string = titleCase(req.body.query);
  Country.find({ name: { $regex : ".*" + string + ".*" }}, function(err, countries) {
    if (err) return res.status(500).json(err);
    res.status(200).json(countries);
  })
}

function titleCase(str) {
  var newstr = str.split(" ");
  for(i=0;i<newstr.length;i++){
    var copy = newstr[i].substring(1).toLowerCase();
    newstr[i] = newstr[i][0].toUpperCase() + copy;
  }
   newstr = newstr.join(" ");
   return newstr;
}  

function countriesUpdate(req, res) {
  Country.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }, function(err, country) {
    if(err) return res.status(400).json(err);
    return res.status(200).json(country);
  });
}

function countriesDelete(req, res) {
  Country.findByIdAndRemove(req.params.id, function(err) {
    if(err) return res.status(500).json(err);
    return res.status(204).send();
  });
}

module.exports = {
  index: countriesIndex,
  create: countriesCreate,
  show: countriesShow,
  search: countriesSearch,
  update: countriesUpdate,
  delete: countriesDelete
}