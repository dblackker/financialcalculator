'use strict';

var _ = require('lodash');
var Calculator = require('./calculator.model');

// Get list of calculators
exports.index = function(req, res) {
  Calculator.find(function (err, calculators) {
    if(err) { return handleError(res, err); }
    return res.json(200, calculators);
  });
};

// Get a single calculator
exports.show = function(req, res) {
  Calculator.findById(req.params.id, function (err, calculator) {
    if(err) { return handleError(res, err); }
    if(!calculator) { return res.send(404); }
    return res.json(calculator);
  });
};

// Creates a new calculator in the DB.
exports.create = function(req, res) {
  Calculator.create(req.body, function(err, calculator) {
    if(err) { return handleError(res, err); }
    return res.json(201, calculator);
  });
};

// Updates an existing calculator in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Calculator.findById(req.params.id, function (err, calculator) {
    if (err) { return handleError(res, err); }
    if(!calculator) { return res.send(404); }
    var updated = _.merge(calculator, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, calculator);
    });
  });
};

// Calculates future value
exports.calculate = function(req, res) {
  var years = req.body.numberOfYears || 1;
  var n = req.body.numberOfYears * req.body.paymentFrequency.numberPerYear;
  var pmt = req.body.payment;
  var interest = req.body.interestRate;
  var interestPerN = req.body.interestRate / req.body.paymentFrequency.numberPerYear;
  var pv = isNaN(req.body.presentValue) ? 0 : req.body.presentValue;

  var futureValueWithoutPayment = pv * Math.pow((1 + interest), years);
  var futureValueOfAnnuity = pmt * (Math.pow((1 + interestPerN), n) - 1) / interestPerN;

  if (isNaN(futureValueWithoutPayment)) futureValueWithoutPayment = 0;
  if (isNaN(futureValueOfAnnuity)) futureValueOfAnnuity = 0;

  // Future value
  var fv = futureValueOfAnnuity + futureValueWithoutPayment;

  // Given inflation, what income (by today's standards) would you be able to draw out of this without dwindling it?
  var inflation = .04;
  var tempFv = fv * (interest - inflation);
  var inflationAdjustedFv = tempFv * Math.pow(1 + (-1*inflation), years);

  var output = {};
  output.futureValue = fv;
  output.inflationAdjustedIncome = inflationAdjustedFv;

  res.json(output);
};

// Deletes a calculator from the DB.
exports.destroy = function(req, res) {
  Calculator.findById(req.params.id, function (err, calculator) {
    if(err) { return handleError(res, err); }
    if(!calculator) { return res.send(404); }
    calculator.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}