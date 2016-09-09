var Country = require('../models/country');

function countriessIndex(req, res) {
  Country.find(function(err, countries) {
    if(err) return res.status(500).json(err);
    return res.status(200).json(countries);
  });
}

function countriessCreate(req, res) {
  Country.create(req.body, function(err, country) {
    if(err) return res.status(400).json(err);
    return res.status(201).json(country);
  });
}

function countriessShow(req, res) {
  Country.findById(req.params.id, function(err, country) {
    if(err) return res.status(500).json(err);
    if(!countries) return res.status(404).json({ message: "Could not find a countries with that id" });
    return res.status(200).json(country);
  });
}

function countriessUpdate(req, res) {
  Country.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }, function(err, country) {
    if(err) return res.status(400).json(err);
    return res.status(200).json(country);
  });
}

function countriessDelete(req, res) {
  Country.findByIdAndRemove(req.params.id, function(err) {
    if(err) return res.status(500).json(err);
    return res.status(204).send();
  });
}

module.exports = {
  index: countriessIndex,
  create: countriessCreate,
  show: countriessShow,
  update: countriessUpdate,
  delete: countriessDelete
}