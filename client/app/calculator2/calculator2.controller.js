'use strict';

angular.module('financialcalculatorApp')
.controller('Calculator2Ctrl', function ($scope, $http) {
  	// TODO: pull frequencies from server?
  	$scope.frequencies = [
    { name:'Weekly', value: 1, numberPerYear: 52},
    { name:'Bi-weekly', value: 2, numberPerYear: 26},
    { name:'Bi-monthly', value: 3, numberPerYear: 24},
    { name:'Monthly', value: 4, numberPerYear: 12},
    { name:'Annually', value: 5, numberPerYear: 1}];

	// Initial Values (TODO: pull from server?)
  $scope.calculatorInput = {};
  $scope.calculatorOutput = {};
  $scope.calculatorInput.payment = 1500;
  $scope.calculatorInput.paymentFrequency = $scope.frequencies[3];
  $scope.calculatorInput.interestRate = .11;
  $scope.calculatorInput.numberOfYears = 26;
  $scope.calculatorInput.presentValue = 100000;

  $scope.calculateApi = function(form) {
    $http.post('/api/calculators', $scope.calculatorInput).success(function(awesomeThings) {
      $scope.calculatorOutput.futureValue = awesomeThings.futureValue;
      $scope.calculatorOutput.inflationAdjustedIncome = awesomeThings.inflationAdjustedIncome;
    });
  };

  $scope.calculate = function (form) {
   try
   {
    var years = isNaN($scope.calculatorInput.numberOfYears) ? 1 : $scope.calculatorInput.numberOfYears;
    var n = $scope.calculatorInput.numberOfYears * $scope.calculatorInput.paymentFrequency.numberPerYear;
    var pmt = $scope.calculatorInput.payment;
    var interest = $scope.calculatorInput.interestRate;
    var interestPerN = $scope.calculatorInput.interestRate / $scope.calculatorInput.paymentFrequency.numberPerYear;
    var pv = isNaN($scope.calculatorInput.presentValue) ? 0 : $scope.calculatorInput.presentValue;

    		// TODO: move logic to server so various front-ends can use the same formulae
    		var futureValueWithoutPayment = pv * Math.pow((1 + interest), years);
    		var futureValueOfAnnuity = pmt * (Math.pow((1 + interestPerN), n) - 1) / interestPerN;

        if (isNaN(futureValueWithoutPayment)) futureValueWithoutPayment = 0;
        if (isNaN(futureValueOfAnnuity)) futureValueOfAnnuity = 0;

        var fv = futureValueOfAnnuity + futureValueWithoutPayment;
        $scope.calculatorOutput.futureValue = fv;


        // Given inflation, what income (by today's standards) would you be able to draw out of this without dwindling it?
        var inflation = .04;
        var tempFv = fv * (interest - inflation);
        var inflationAdjustedFv = tempFv * Math.pow(1 + (-1*inflation), years);
        $scope.calculatorOutput.inflationAdjustedIncome = inflationAdjustedFv;
      }
      catch (e)
      {
        $scope.calculatorOutput.futureValue = '9999999';
      }
    };
  });